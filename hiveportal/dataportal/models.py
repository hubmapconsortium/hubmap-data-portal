from django.db import models

class Gene(models.Model):
    entrez_id = models.CharField(max_length=50, blank=True, null=True)
    hugo_symbol = models.CharField(max_length=50, blank=True, null=True)
    ensembl_id = models.CharField(max_length=50, blank=True, null=True)
    # TODO: any other

class Protein(models.Model):
    gene = models.ForeignKey(Gene)
    pdb_id = models.CharField(max_length=50, blank=True, null=True)

class Institution(models.Model):
    name = models.CharField(max_length=250)

class DataType(models.Model):
    name = models.CharField(max_length=250)

class Tissue(models.Model):
    name = models.CharField(max_length=250)

class Study(models.Model):
    creation_time = models.DateTimeField(auto_now_add=True)
    institution = models.ForeignKey(Institution)
    data_type = models.ForeignKey(DataType)
    tissue = models.ForeignKey(Tissue)

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
    preview_image = models.ImageField(max_length=500, upload_to='thumbnails/%Y/%m/%d')
