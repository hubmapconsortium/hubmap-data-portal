from django.contrib.contenttypes.models import ContentType
from django_elasticsearch_dsl import DocType, Index, fields
from .models import *
from elasticsearch_dsl import analyzer
from elasticsearch import Elasticsearch

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
    institution = fields.ObjectField(attr='institution',properties={'name': fields.TextField(analyzer=html_strip,
        fields={'raw': fields.KeywordField()}),'id':fields.IntegerField(),})
    tissue = fields.ObjectField(attr='tissue',properties={'name': fields.TextField(analyzer=html_strip,
        fields={'raw': fields.KeywordField()}),'id':fields.IntegerField(),})
    data_type = fields.ObjectField(attr='data_type',properties={'name': fields.TextField(analyzer=html_strip,
        fields={'raw': fields.KeywordField()}),'id':fields.IntegerField(),})
    subclass = fields.ObjectField(attr='subclass',properties={'name': fields.TextField(analyzer=html_strip,
        fields={'raw': fields.KeywordField()}),'id':fields.IntegerField(),})
    creation_time = fields.DateField()

    class Meta:
        model = Study
        fields = [

        ]
        related_models = [Institution, Tissue, DataType, ContentType]

        # Ignore auto updating of Elasticsearch when a model is saved
        # or deleted:
        # ignore_signals = True
        # Don't perform an index refresh after every update (overrides global setting):
        # auto_refresh = False
        # Paginate the django queryset used to populate the index with the specified size
        # (by default there is no pagination)
        # queryset_pagination = 5000

    def get_queryset(self):
        """Not mandatory but to improve performance we can select related in one sql request"""
        return super(StudyDocument, self).get_queryset().select_related(
            'institution', 'tissue', 'data_type', 'subclass'
        )

    def get_instances_from_related(self, related_instance):
        return related_instance.study_set.all()

@study.doc_type
class InstitutionDocument(DocType):
    name = fields.TextField(  analyzer=html_strip,
        fields={'raw': fields.KeywordField()})

    class Meta:
        model = Institution
        fields = [

        ]

    def get_instances_from_related(self, related_instance):
        print(related_instance)
        return related_instance.institution_set.all()

@study.doc_type
class TissueDocument(DocType):
    name = fields.TextField(  analyzer=html_strip,
        fields={'raw': fields.KeywordField()})

    class Meta:
        model = Tissue
        fields = [
        ]

    def get_instances_from_related(self, related_instance):
        print(related_instance)
        return related_instance.tissue_set.all()

@study.doc_type
class DataTypeDocument(DocType):
    name = fields.TextField(analyzer=html_strip,
        fields={'raw': fields.KeywordField()})

    class Meta:
        model = DataType
        fields = [

        ]

    def get_instances_from_related(self, related_instance):
        print(related_instance)
        return related_instance.datatype_set.all()

@study.doc_type
class SubclassDocument(DocType):
    name = fields.TextField(  analyzer=html_strip,
        fields={'raw': fields.KeywordField()})
    id = fields.IntegerField()

    class Meta:
        model = ContentType
        fields = [

        ]

    def get_instances_from_related(self, related_instance):
        print(related_instance)
        return related_instance.subclass_set.all()

@study.doc_type
class GenesDocument(DocType):
    hugo_symbol = fields.TextField( analyzer=html_strip,
        fields={'raw': fields.KeywordField()})
    ensembl_id = fields.TextField(analyzer=html_strip,
                                   fields={'raw': fields.KeywordField()})
    entrez_id = fields.TextField(analyzer=html_strip,
                                   fields={'raw': fields.KeywordField()})

    class Meta:
        model = Gene
        fields = [
        ]

    def get_instances_from_related(self, related_instance):
        print(related_instance)
        return related_instance.gene_set.all()

@study.doc_type
class ProteinsDocument(DocType):
    gene = fields.ObjectField(attr='gene',properties={'hugo_symbol': fields.TextField(analyzer=html_strip,
        fields={'raw': fields.KeywordField()}),'id':fields.IntegerField(),})
    name = fields.TextField( analyzer=html_strip,
        fields={'raw': fields.KeywordField()})

    class Meta:
        model = Protein
        fields = [
            'pdb_id',
        ]
        related_models = [Gene]

    def get_queryset(self):
        """Not mandatory but to improve performance we can select related in one sql request"""
        return super(ProteinsDocument, self).get_queryset().select_related(
            'gene',
        )

    def get_instances_from_related(self, related_instance):
        print(related_instance)
        if isinstance(related_instance, Gene):
            return related_instance.protein_set.all()
        return related_instance.protein_set.all()

@study.doc_type
class ScThsSeqStudyDocument(StudyDocument):
    cell_count = fields.IntegerField()
    total_read_count = fields.IntegerField()

    class Meta:
        model = ScThsSeqStudy
        fields = [

        ]

    def get_instances_from_related(self, related_instance):
        # otherwise these are others
        return related_instance.study_set.all()

@study.doc_type
class ScRnaSeqStudyDocument(StudyDocument):
    cell_count = fields.LongField()
    read_count_total = fields.LongField()

    class Meta:
        model = ScThsSeqStudy
        fields = [

        ]

    def get_instances_from_related(self, related_instance):
        # otherwise these are others
        return related_instance.study_set.all()

@study.doc_type
class ScAtacSeqStudyDocument(StudyDocument):
    read_count_total = fields.LongField()
    cell_count = fields.LongField()

    class Meta:
        model = ScAtacSeqStudy
        fields = [

        ]

    def get_instances_from_related(self, related_instance):
        # otherwise these are others
        return related_instance.study_set.all()

@study.doc_type
class ScRnaSeqStudyCDNADocument(ScRnaSeqStudyDocument):
    read_count_aligned = fields.LongField()

    class Meta:
        model = ScRnaSeqStudyCDNA
        fields = [

        ]

    def get_instances_from_related(self, related_instance):
        # otherwise these are others
        return related_instance.study_set.all()

@study.doc_type
class ScRnaSeqStudyBarcodedDocument(ScRnaSeqStudyDocument):
    genes = fields.ObjectField(attr='genes', properties={'hugo_symbol': fields.TextField(analyzer=html_strip,
        fields={'raw': fields.KeywordField()}),'id':fields.IntegerField(),})
    unique_barcode_count = fields.LongField()

    class Meta:
        model = ScRnaSeqStudyBarcoded
        fields = [

        ]
        related_models = [Gene]

    def get_instances_from_related(self, related_instance):
        print(related_instance)

        # otherwise these are others
        return related_instance.scrnaseqstudybarcoded_set.all()

@study.doc_type
class SpatialTranscriptomicStudyDocument(StudyDocument):
    genes = fields.ObjectField(attr='genes',properties={'hugo_symbol': fields.TextField(analyzer=html_strip,
        fields={'raw': fields.KeywordField()}),'id':fields.IntegerField(),})

    class Meta:
        model = SpatialTranscriptomicStudy
        fields = [

        ]
        related_models = [Gene]

    def get_instances_from_related(self, related_instance):

        # otherwise these are others
        return related_instance.spatialtranscriptomic_set.all()

@study.doc_type
class MassCytometryStudyDocument(StudyDocument):
    proteins = fields.ObjectField(attr='proteins',properties={
        'name': fields.TextField(analyzer=html_strip),
        'pdb_id': fields.TextField(analyzer=html_strip),
        'pk': fields.IntegerField(),
    })
    preview_image = fields.FileField()

    class Meta:
        model = MassCytometryStudy
        fields = [

        ]
        related_models = [Protein]

    def get_instances_from_related(self, related_instance):
        if isinstance(related_instance, Protein):
            return related_instance.masscytometrystudy_set.all()

        # otherwise these are others
        return related_instance.study_set.all()

@study.doc_type
class MicroscopyStudyDocument(StudyDocument):
    image_count = fields.IntegerField()
    preview_image = fields.FileField()

    class Meta:
        model = MicroscopyStudy
        fields = [

        ]
    def get_instances_from_related(self, related_instance):
        if isinstance(related_instance, Protein):
            return related_instance.microscopy_set.all()

        # otherwise these are others
        return related_instance.study_set.all()

client = Elasticsearch()
#StudyDocument.init(index=study,using=client)
#TODO update views and html for displaying filtered details for Study : sushma 4/12/2019 for next week

