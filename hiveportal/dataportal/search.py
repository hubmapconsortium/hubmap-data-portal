from elasticsearch_dsl.connections import connections
from elasticsearch_dsl import DocType, Text, Date
from elasticsearch import Elasticsearch
from . import models
from elasticsearch.helpers import bulk

from elasticsearch_dsl import connections

connections.create_connection(hosts=['localhost'], timeout=20)

class StudyTypeIndex(DocType):
    creation_time = Date()
    institution = Text()
    data_type = Text()
    tissue = Text()
    subclass=Text()
    samples = Text()

    class Meta:
        name = 'studytype_index'

def bulk_indexing():
    StudyTypeIndex.init()
    es = Elasticsearch()
    bulk(client=es, actions=(b.indexing() for b in models.Study.objects.all().iterator()))