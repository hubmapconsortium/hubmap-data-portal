from django.contrib.contenttypes.models import ContentType
from django.db import models


class TissueExpressionHeatmap(models.Model):
    """
    Instances of this class provide all of the data to render a heatmap
    of gene expression across the human body.
    """
    kidney_color = models.CharField(max_length=7)
    lung_color = models.CharField(max_length=7)
    heart_color = models.CharField(max_length=7)
    pancreas_color = models.CharField(max_length=7)
    abdomen_color = models.CharField(max_length=7)
    liver_color = models.CharField(max_length=7)
    smallIntestine_color = models.CharField(max_length=7)
    bladder_color = models.CharField(max_length=7)
    largeIntestine_color = models.CharField(max_length=7)
    spleen_color = models.CharField(max_length=7)

    def __str__(self):
        return str(self.id)


class Gene(models.Model):
    entrez_id = models.CharField(max_length=50, blank=True, null=True)
    hugo_symbol = models.CharField(max_length=50, blank=True, null=True)
    ensembl_id = models.CharField(max_length=50, blank=True, null=True)
    tissue_expression_heatmap = models.ForeignKey(
        TissueExpressionHeatmap, on_delete=models.CASCADE, null=True)

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

    class Meta:
        verbose_name = 'Study Parent class'

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


# class Sample(models.Model):
#     study = models.ForeignKey(Study, on_delete=models.CASCADE)
#     name = models.CharField(max_length=150, default='default')
#     # TODO


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
class ScThsSeqStudy(Study):
    class Meta:
        verbose_name = 'scTHS-seq'

    cell_count = models.PositiveIntegerField()
    total_read_count = models.PositiveIntegerField()


@study_type
class ScAtacSeqStudy(Study):
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


class ImagingStudy(Study):
    image_count = models.PositiveIntegerField()
    preview_image = models.ImageField(
        max_length=500, upload_to='gallery/%Y/%m/%d', null=True, blank=True)


@study_type
class MassCytometryStudy(ImagingStudy):
    class Meta:
        verbose_name = 'Mass Cytometry'

    proteins = models.ManyToManyField(Protein)


@study_type
class SeqFishImagingStudy(ImagingStudy):
    pass


@study_type
class MicroscopyStudy(ImagingStudy):
    class Meta:
        verbose_name = 'Microscopy'
