from django.contrib.contenttypes.models import ContentType
from django.db import models

class Gene(models.Model):
    entrez_id = models.CharField(max_length=50, blank=True, null=True)
    hugo_symbol = models.CharField(max_length=50, blank=True, null=True)
    ensembl_id = models.CharField(max_length=50, blank=True, null=True)
    # TODO: any other

    def __str__(self):
        return self.hugo_symbol or ''

class Protein(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    gene = models.ForeignKey(Gene, on_delete=models.CASCADE)
    pdb_id = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name or ''

class Institution(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name

class DataType(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name

class Tissue(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name

class Study(models.Model):
    creation_time = models.DateTimeField(auto_now_add=True)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    data_type = models.ForeignKey(DataType, on_delete=models.CASCADE)
    tissue = models.ForeignKey(Tissue, on_delete=models.CASCADE)
    subclass = models.ForeignKey(ContentType, on_delete=models.CASCADE)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.subclass = ContentType.objects.get_for_model(type(self))

    def get_subclass_object(self):
        return self.subclass.get_object_for_this_type(study_id=self.id)

    def __init_subclass__(cls):
        className = type(cls)

StudyTypes = []
def study_type(model):
    """
    Used to mark a study type as a "leaf" in the inheritance hierarchy, to fetch
    the most specific metadata available
    """
    StudyTypes.append(model)
    return model

class ScRnaSeqStudy(Study):
    read_count_total = models.PositiveIntegerField()
    cell_count = models.PositiveIntegerField()

@study_type
class ScRnaSeqStudyCDNA(ScRnaSeqStudy):
    read_count_aligned = models.PositiveIntegerField()

@study_type
class ScRnaSeqStudyBarcoded(ScRnaSeqStudy):
    genes = models.ManyToManyField(Gene)
    unique_barcode_count = models.PositiveIntegerField()

@study_type
class SpatialTranscriptomicStudy(Study):
    genes = models.ManyToManyField(Gene)

@study_type
class MassCytometryStudy(Study):
    proteins = models.ManyToManyField(Protein)
    preview_image = models.ImageField(max_length=500, upload_to='thumbnails/%Y/%m/%d', null=True, blank=True)

@study_type
class ImagingStudy(Study):
    image_count = models.PositiveIntegerField()
    preview_image = models.ImageField(max_length=500, upload_to='thumbnails/%Y/%m/%d', null=True, blank=True)
