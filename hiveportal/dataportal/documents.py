from django_elasticsearch_dsl import DocType, Index, fields
from .models import Study

# Name of the Elasticsearch index
study = Index('studies')
# See Elasticsearch Indices API reference for available settings
study.settings(
    number_of_shards=1,
    number_of_replicas=0
)


@study.doc_type
class StudyDocument(DocType):
    institution = fields.TextField(attr="__str__")
    tissue = fields.TextField(attr="__str__")
    subclass = fields.TextField(attr="__str__")
    data_type = fields.TextField(attr="__str__")
    samples = fields.TextField(attr="__str__")

    class Meta:
        model = Study # The model associated with this DocType

        # The fields of the model you want to be indexed in Elasticsearch
        fields = [
            'creation_time',
        ]

        # Ignore auto updating of Elasticsearch when a model is saved
        # or deleted:
        # ignore_signals = True
        # Don't perform an index refresh after every update (overrides global setting):
        # auto_refresh = False
        # Paginate the django queryset used to populate the index with the specified size
        # (by default there is no pagination)
        # queryset_pagination = 5000