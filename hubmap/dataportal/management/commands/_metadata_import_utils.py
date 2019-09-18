#!/usr/bin/env python3
import base64
import json
from binascii import unhexlify
from collections import Mapping, Sequence, defaultdict
from hashlib import sha256
from math import isnan
from pathlib import Path
from pprint import pprint
from typing import Any, Dict, Iterable, List, Union

import networkx as nx
import pandas as pd
from elasticsearch import Elasticsearch
from frozendict import frozendict
from neo4j import Driver as Neo4jDriver
from neo4j import GraphDatabase
from pymongo import MongoClient


def infinite_defaultdict():
    return defaultdict(infinite_defaultdict)


def value_adjust(row: Iterable[Any]) -> Iterable[Any]:
    """
    :param row: Iterable of heterogeneous data, probably a `pd.Series`
      in which missing values are represented as `math.nan`
    :return: Iterable of the same data, with `nan` values replaced
      with `None` (since `nan` values are a pain to work with in this
      context: they don't compare equal to themselves, etc.)
    """
    for item in row:
        if isinstance(item, float) and isnan(item):
            yield None
        else:
            yield item


def freeze(data):
    """
    :param data: Anything serializable as JSON
    :return: An immutable and hashable version of `data`. Mappings are
      replaced by `frozendict` instances, sequences are replaced by tuples,
      and everything else is returned unchanged.
    """
    if isinstance(data, Mapping):
        return frozendict(
            (key, freeze(value))
            for key, value in data.items()
        )
    elif isinstance(data, Sequence) and not isinstance(data, str):
        return tuple(freeze(value) for value in data)
    return data


def unfreeze(data):
    """
    Inverse of `freeze` defined above. In our usage, we don't actually care
    about whether the data is mutable; we just care that this can be serialized
    as JSON. (`frozendict` instances are not.)
    :param data:
    :return:
    """
    if isinstance(data, Mapping):
        return dict(
            (key, unfreeze(value))
            for key, value in data.items()
        )
    elif isinstance(data, Sequence) and not isinstance(data, str):
        return [unfreeze(value) for value in data]
    return data


def dotted_keys_to_nested_dict(mapping: Dict[str, Any]):
    """
    :param mapping: A flat dict with keys as dotted strings, e.g.
      "donor_organism.mouse_specific.strain.text", and arbitrary values
    :return: A nested representation of that dictionary, with dotted
      keys split into sub-dicts.

    >>> d = { \
        'a.b.c': 1, \
        'a.b.d': 'value', \
        'a.b.e': 5, \
        'a.f': 'another', \
        'g.h': None, \
    }
    >>> pprint(dotted_keys_to_nested_dict(d))
    {'a': {'b': {'c': 1, 'd': 'value', 'e': 5}, 'f': 'another'}, 'g': {'h': None}}
    """
    nested = infinite_defaultdict()
    for key_str, value in mapping.items():
        # TODO: probably skip if value is None
        keys = key_str.split('.')
        subdict = nested
        for key in keys[:-1]:
            subdict = subdict[key]
        subdict[keys[-1]] = value

    return unfreeze(freeze(nested))


def read_hca_metadata(metadata_file: Path) -> nx.DiGraph:
    """
    :param metadata_file:
    :return: A unique set of donor metadata
    """
    donor_data = pd.read_table(metadata_file)

    row_data = []
    for i, row in donor_data.iterrows():
        dotted_row_dict = dict(zip(row.index, value_adjust(row)))
        nested_row_dict = dotted_keys_to_nested_dict(dotted_row_dict)
        row_data.append(nested_row_dict)

    # Use "full" nested representation at this stage, so we can pull out
    # the donor and specimen metadata soon
    hashable_row_data = [freeze(v) for v in row_data]

    g = nx.DiGraph()

    for h in hashable_row_data:
        # Since frozen subtrees are hashable, they are usable as nodes in
        # a NetworkX graph, and NetworkX enforces uniqueness of nodes
        donor = h['donor_organism']
        specimen = h['specimen_from_organism']
        g.add_edge(donor, specimen)

        g.nodes[donor]['type'] = 'donor_organism'
        g.nodes[specimen]['type'] = 'specimen_from_organism'

    return g


def get_node_id(serialized: str):
    return sha256(serialized.encode('utf-8')).hexdigest()


def hash_to_accn_number(hash_str: str) -> str:
    b = unhexlify(hash_str)
    encoded = base64.b32encode(b).rstrip(b'=').decode('utf-8')
    return encoded[:9]


def hash_to_accn(hash_str: str) -> str:
    return 'HBM0' + hash_to_accn_number(hash_str)


def get_node_accn(serialized: str):
    h = get_node_id(serialized)
    return hash_to_accn(h)


def add_node(tx, node):
    tx.run(
        """
        CREATE (
            e1:Entity {id: $id, type: $type, name: $name}
        )-[r1:METADATA]->(
            m1:Metadata {metadata: $metadata}
        )
        """,
        name=node['name'],
        metadata=node['metadata'],
        id=node['id'],
        type=node['type'],
    )


def add_edge(tx, n1, n2):
    tx.run(
        """
        MATCH (e1:Entity {id: $id1, type: $type1, name: $name1})
        MATCH (e2:Entity {id: $id2, type: $type2, name: $name2})
        CREATE (e1)-[r1:ACTION]->(a1:Action)-[r2:ACTION]->(e2)
        """,
        id1=n1['id'],
        id2=n2['id'],
        name1=n1['name'],
        name2=n2['name'],
        type1=n1['type'],
        type2=n2['type'],
    )


def neo4j_import(driver, graph: nx.DiGraph):
    serialized_nodes = {}
    for node in graph:
        serialized = json.dumps(unfreeze(node))
        node_id = get_node_id(serialized)
        node_accn = hash_to_accn(node_id)
        serialized_nodes[node] = {
            'metadata': serialized,
            'id': node_id,
            'name': node_accn,
            'type': graph.nodes[node]['type'],
        }

    with driver.session() as session:
        for node in serialized_nodes.values():
            session.write_transaction(add_node, node)
        for n1, n2 in graph.edges:
            session.write_transaction(add_edge, serialized_nodes[n1], serialized_nodes[n2])


def index_from_graph(
        neo4j_driver: Neo4jDriver,
        mongo_client: MongoClient,
        elasticsearch_client: Elasticsearch,
):
    """
    Get all metadata; import into MongoDB and Elasticsearch
    """
    db = mongo_client['hubmap']
    with neo4j_driver.session() as session:
        results = session.run(
            """
            MATCH (e:Entity)-->(m:Metadata)
            RETURN e.id, e.type, m.metadata
            """,
        )
        for record in results:
            # deserialize value, add ID for Mongo
            entity_id = record['e.id']
            entity_type = record['e.type']
            metadata = json.loads(record['m.metadata'])

            # Elasticsearch
            elasticsearch_client.index(
                index=entity_type,
                doc_type=entity_type,
                id=entity_id,
                body=metadata,
            )

            # MongoDB
            # Add ID to document; Elasticsearch doesn't like this so do it now
            metadata['_id'] = entity_id
            collection = db[entity_type]
            # Can't quite use `insert_many` yet, since we need to dispatch to a
            #  different collection for each item
            collection.insert_one(metadata)


def metadata_import(
        metadata_file: Path,
        neo4j_url: str,
        mongo_host: str,
        elasticsearch_hosts: List[Dict[str, Union[int, str]]],
):
    neo4j_driver = GraphDatabase.driver(neo4j_url)
    mongo_client = MongoClient(mongo_host)
    elasticsearch_client = Elasticsearch(elasticsearch_hosts)

    graph = read_hca_metadata(metadata_file)

    neo4j_import(neo4j_driver, graph)
    index_from_graph(neo4j_driver, mongo_client, elasticsearch_client)
