from django.contrib.contenttypes.models import ContentType
from django_elasticsearch_dsl import DocType, Index, fields
from .models import *
from elasticsearch_dsl import analyzer

#TODO add analyzers
#TODO test mappings

# Name of the Elasticsearch index
study = Index('studies')
# See Elasticsearch Indices API reference for available settings
study.settings(
    number_of_shards=1,
    number_of_replicas=0
)
html_strip = analyzer(
    'html_strip',
    tokenizer="standard",
    filter=["standard", "lowercase", "stop", "snowball"],
    char_filter=["html_strip"]
)

@study.doc_type
class StudyDocument(DocType):
    id = fields.IntegerField(attr='id')
    institution = fields.ObjectField(proerties={'name': fields.TextField(),})
    tissue = fields.ObjectField(proerties={'name': fields.TextField(),})
    data_type = fields.ObjectField(proerties={'name': fields.TextField(),})
    subclass = fields.ObjectField(proerties={'name': fields.TextField(),})

    class Meta:
        model = Study
        fields = [
            'creation_time',
        ]
        related_models = [Institution,Tissue, DataType]

        # Ignore auto updating of Elasticsearch when a model is saved
        # or deleted:
        # ignore_signals = True
        # Don't perform an index refresh after every update (overrides global setting):
        # auto_refresh = False
        # Paginate the django queryset used to populate the index with the specified size
        # (by default there is no pagination)
        # queryset_pagination = 5000

    # def get_queryset(self):
    #     print(self.subclass)
    #     return super(StudyDocument, self).get_queryset().select_related('tissue')
    #
    def get_instances_from_related(self, related_instance):
        if isinstance(related_instance, Institution):
            return related_instance.study.institution
        elif isinstance(related_instance, Tissue):
            return related_instance.study.tissue
        elif isinstance(related_instance, DataType):
            return related_instance.study.data_type
        elif isinstance(related_instance, Gene) :
            return related_instance.study.genes
        elif isinstance(related_instance, Protein):
            return related_instance.study.proteins
        elif isinstance(related_instance, Study):
            return related_instance.study

        # otherwise it's a Institution or others
        return related_instance.study_set.all()

FIELDS_TO_IGNORE = {
    'id',
    'study_ptr',
    'subclass',
    'institution',
    'data_type',
    'tissue',
    'genes',
    'proteins',
    'preview_image',
}

@study.doc_type
class InstitutionDocument(DocType):
    name = fields.TextField(  analyzer=html_strip,
        fields={'raw': fields.KeywordField()})

    class Meta:
        model = Institution
        fields = [

        ]

@study.doc_type
class TissueDocument(DocType):
    name = fields.TextField(  analyzer=html_strip,
        fields={'raw': fields.KeywordField()})

    class Meta:
        model = Tissue
        fields = [

        ]

@study.doc_type
class DataTypeDocument(DocType):
    name = fields.TextField(analyzer=html_strip,
        fields={'raw': fields.KeywordField()})

    class Meta:
        model = DataType
        fields = [

        ]

@study.doc_type
class GenesDocument(DocType):
    hugo_symbol = fields.TextField( analyzer=html_strip,
        fields={'raw': fields.KeywordField()})

    class Meta:
        model = Gene
        fields = [
            'ensembl_id',
            'entrez_id',
        ]


@study.doc_type
class ProteinsDocument(DocType):
    gene = fields.ObjectField(properties={'hugo_symbol':fields.TextField()})
    name = fields.TextField( analyzer=html_strip,
        fields={'raw': fields.KeywordField()})

    class Meta:
        model = Protein
        fields = [
            'pdb_id',
        ]
        related_models = [Gene]


@study.doc_type
class ScRnaSeqStudyDocument(DocType):
    read_count_total = fields.IntegerField()
    cell_count = fields.IntegerField()

    class Meta:
        model = ScRnaSeqStudy
        fields = [

        ]


@study.doc_type
class ScThsSeqStudy(DocType):
    cell_count = fields.IntegerField()
    total_read_count = fields.IntegerField()

    class Meta:
        model = ScThsSeqStudy
        fields = [

        ]


@study.doc_type
class ScAtacSeqStudy(DocType):
    read_count_total = fields.IntegerField()
    cell_count = fields.IntegerField()

    class Meta:
        model = ScAtacSeqStudy
        fields = [

        ]


@study.doc_type
class ScRnaSeqStudyCDNA(DocType):
    read_count_aligned = fields.IntegerField()

    class Meta:
        model = ScRnaSeqStudyCDNA
        fields = [

        ]


@study.doc_type
class ScRnaSeqStudyBarcoded(DocType):
    genes = fields.ObjectField(properties={'hugo_symbol':fields.TextField()})
    unique_barcode_count = fields.IntegerField()

    class Meta:
        model = ScRnaSeqStudyBarcoded
        fields = [

        ]
        related_models = [Gene]

@study.doc_type
class SpatialTranscriptomicStudy(DocType):
    genes = fields.ObjectField(properties={'hugo_symbol':fields.TextField()})

    class Meta:
        model = SpatialTranscriptomicStudy
        fields = [

        ]
        related_models = [Gene]

@study.doc_type
class MassCytometryStudy(DocType):
    proteins = fields.ObjectField(properties={'name':fields.TextField()})
    preview_image = fields.FileField(max_length=500, null=True, blank=True)

    class Meta:
        model = MassCytometryStudy
        fields = [

        ]
        related_models = [Protein]


@study.doc_type
class ImagingStudy(DocType):
    image_count = fields.IntegerField()
    preview_image = fields.FileField(max_length=500, null=True, blank=True)

    class Meta:
        model = ImagingStudy
        fields = [

        ]

@study.doc_type
class MicroscopyStudy(DocType):
    class Meta:
        model = MicroscopyStudy
        fields = [

        ]

