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
    institution = models.ForeignKey(Institution)
    data_type = models.ForeignKey(DataType)
    tissue = models.ForeignKey(Tissue)

class ScRnaSeqStudy(Study):
    read_count_total = models.PositiveIntegerField()
    cell_count = models.PositiveIntegerField()

class ScRnaSeqStudyCDNA(ScRnaSeqStudy):
    read_count_aligned = models.PositiveIntegerField()

class ScRnaSeqStudyBarcoded(ScRnaSeqStudy):
    unique_barcode_count = models.PositiveIntegerField()

class SpatialTranscriptomicStudy(Study):
    genes = models.ManyToManyField(Gene)

class MassCytometryStudy(Study):
    proteins = models.ManyToManyField(Protein)
