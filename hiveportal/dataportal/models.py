from django.contrib.contenttypes.models import ContentType
from django.db import models

#Developer: Matt Ruffalo
#developer: Sushma Anand Akoju
from django.utils.safestring import mark_safe


class Gene(models.Model):
    entrez_id = models.CharField(max_length=50, blank=True, null=True)
    hugo_symbol = models.CharField(max_length=50, blank=True, null=True)
    ensembl_id = models.CharField(max_length=50, blank=True, null=True)
    # TODO: any other

    def __str__(self):
        return self.hugo_symbol or ''

    @property
    def derived_class_fields(self):
        return ''.join(
            ['hugo_symbol'+self.hugo_symbol])

class Protein(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    gene = models.ForeignKey(Gene, on_delete=models.CASCADE)
    pdb_id = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name or ''

    @property
    def derived_class_fields(self):
        return ''.join(
            ['name: '+self.name,' ,'+'gene: '+self.gene])

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
        # Can't check 'self.subclass is None' -- this throws an exception for
        # new objects that aren't saved to the database
        if not hasattr(self, 'subclass'):
            self.subclass = ContentType.objects.get_for_model(type(self))

    def get_subclass_object(self):
        return self.subclass.get_object_for_this_type(study_ptr=self)

    def get_class_name(self):
        return self.subclass.name

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

    @property
    def derived_class_fields(self):
        return ''.join(
            ['read_count_total: '+str(self.read_count_total), ' ,', 'cell_count: '+str(self.cell_count)])

@study_type
class ScThsSeqStudy(Study):
    cell_count = models.PositiveIntegerField()
    total_read_count = models.PositiveIntegerField()

    @property
    def derived_class_fields(self):
        return ''.join(
            ['total_read_count: '+str(self.total_read_count), ' ,', 'cell_count: '+str(self.cell_count)])

@study_type
class ScAtacSeqStudy(Study):
    read_count_total = models.PositiveIntegerField()
    cell_count = models.PositiveIntegerField()

    @property
    def derived_class_fields(self):
        return ''.join(
            ['read_count_total: '+str(self.read_count_total), ' ,', 'cell_count: '+str(self.cell_count)])

@study_type
class ScRnaSeqStudyCDNA(ScRnaSeqStudy):
    read_count_aligned = models.PositiveIntegerField()

    @property
    def derived_class_fields(self):
        return ''.join(
            ['read_count_aligned: '+str(self.read_count_aligned)])

@study_type
class ScRnaSeqStudyBarcoded(ScRnaSeqStudy):
    genes = models.ManyToManyField(Gene)
    unique_barcode_count = models.PositiveIntegerField()

    @property
    def derived_class_fields(self):
        gene_values=''
        for gene in self.genes.all():
            gene_values += (gene.hugo_symbol) + ' '
        return ''.join(
            ['genes: '+gene_values, ' ,', 'unique_barcode_count: '+str(self.unique_barcode_count)])

@study_type
class SpatialTranscriptomicStudy(Study):
    genes = models.ManyToManyField(Gene)

    @property
    def derived_class_fields(self):
        gene_values = ''
        for gene in self.genes.all():
            gene_values+=(gene.hugo_symbol)+' '
        return ''.join(
            ['genes: '+gene_values])


@study_type
class MassCytometryStudy(Study):
    sample_count = models.PositiveIntegerField()
    proteins = models.ManyToManyField(Protein)
    preview_image = models.ImageField(max_length=500, upload_to='gallery/%Y/%m/%d', null=True, blank=True)

    @property
    def derived_class_fields(self):
        protein_values = ''
        for protein in self.proteins.all():
            protein_values+=protein.name+ ' '
        if len(self.preview_image.name)!=0:
            print(" image: is " + self.preview_image.name)
            preview_image_url = self.preview_image.url
            return ''.join(
                ['sample_count: '+str(self.sample_count), ' ,', 'proteins: '+protein_values,' ,',
                 'preview_image: '+str(preview_image_url)])
        else:
            return ''.join(
                ['sample_count: '+str(self.sample_count), ' ,', 'proteins: '+protein_values])


class ImagingStudy(Study):
    image_count = models.PositiveIntegerField()
    preview_image = models.ImageField(max_length=500, upload_to='gallery/%Y/%m/%d', null=True, blank=True)

    @property
    def derived_class_fields(self):
        if len(self.preview_image.name)!=0:
            print(" image: is " + self.preview_image.name)
            preview_image_url = self.preview_image.url
            return ''.join(
                ['image_count: '+str(self.image_count), ' ,', 'preview_image: '+str(preview_image_url)])
        else:
            return ''.join(
                ['image_count: ' + str(self.image_count)])

@study_type
class SeqFishImagingStudy(ImagingStudy):
    pass

@study_type
class MicroscopyStudy(ImagingStudy):
    pass
