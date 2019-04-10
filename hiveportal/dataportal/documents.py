from django.contrib.contenttypes.models import ContentType
from django_elasticsearch_dsl import DocType, Index, fields
from .models import Study, Institution, Tissue, DataType

# Name of the Elasticsearch index
study = Index('studies')
# See Elasticsearch Indices API reference for available settings
study.settings(
    number_of_shards=1,
    number_of_replicas=0
)

@study.doc_type
class StudyDocument(DocType):
    institution = fields.ObjectField(proerties={'name': fields.TextField(),})
    tissue = fields.ObjectField(proerties={'name': fields.TextField(),})
    subclass = fields.ObjectField(properties={"name": fields.TextField()},)
    data_type = fields.ObjectField(proerties={'name': fields.TextField(),})

    class Meta:
        model = Study
        fields = [
            'creation_time',
        ]
        related_models = [Institution,Tissue, DataType, ContentType]

        # Ignore auto updating of Elasticsearch when a model is saved
        # or deleted:
        # ignore_signals = True
        # Don't perform an index refresh after every update (overrides global setting):
        # auto_refresh = False
        # Paginate the django queryset used to populate the index with the specified size
        # (by default there is no pagination)
        # queryset_pagination = 5000

    def get_queryset(self):
        print(self.subclass)
        return super(StudyDocument, self).get_queryset().select_related('subclass')

    def get_instances_from_related(self, related_instance):
        if isinstance(related_instance, Institution):
            return related_instance.study.institution
        elif isinstance(related_instance, Tissue):
            return related_instance.study.tissue
        elif isinstance(related_instance, DataType):
            return related_instance.study.data_type
        elif isinstance(related_instance, ContentType):
            return related_instance.study.subclass
        # otherwise it's a Institution or others
        return related_instance.study_set.all()

@study.doc_type
class InstitutionDocument(DocType):

    class Meta:
        model = Institution
        fields = [
            'name',
        ]

@study.doc_type
class TissueDocument(DocType):

    class Meta:
        model = Tissue
        fields = [
            'name',
        ]

@study.doc_type
class DataTypeDocument(DocType):

    class Meta:
        model = DataType
        fields = [
            'name',
        ]