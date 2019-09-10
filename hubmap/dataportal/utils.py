from collections import OrderedDict
from itertools import chain

from django.db.models import Q
from rest_framework import serializers

from .models import (
    Gene,
    MassCytometryStudy,
    MicroscopyStudy,
    Protein,
    ScAtacSeqStudy,
    ScRnaSeqStudyBarcoded,
    ScRnaSeqStudyCDNA,
    SeqFishImagingStudy,
    SpatialTranscriptomicStudy,
)
from .serializers import (
    GeneSerializer,
    MassCytometryStudySerializer,
    MicroscopyStudySerializer,
    ProteinSerializer,
    ScAtacSeqStudySerializer,
    ScRnaSeqStudyBarcodedSerializer,
    ScRnaSeqStudyCDNASerializer,
    SeqFishImagingStudySerializer,
    SpatialTranscriptomicStudySerializer,
)

# In case we have to use recursive gene/gene expressions/new features, use this.
# For now: keeping this.


class RecursiveSerializer(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


def get_serializer_class(this_study):
    this_study = this_study.get_subclass_object()
    if isinstance(this_study, ScRnaSeqStudyCDNA):
        return ScRnaSeqStudyCDNASerializer
    elif isinstance(this_study, ScRnaSeqStudyBarcoded):
        return ScRnaSeqStudyBarcodedSerializer
    elif isinstance(this_study, SpatialTranscriptomicStudy):
        return SpatialTranscriptomicStudySerializer
    elif isinstance(this_study, MassCytometryStudy):
        return MassCytometryStudySerializer
    elif isinstance(this_study, MicroscopyStudy):
        return MicroscopyStudySerializer
    elif isinstance(this_study, SeqFishImagingStudy):
        return SeqFishImagingStudySerializer


def get_response_for_request(self, request, format=None):
    query = self.request.query_params.get('search', None)
    # Get all individual study lists
    scrna_barcorded = get_scrna_barcorded_list(query)
    scrna_cdna = get_scrna_cdna_list(query)
    spatial_transcriptomic = get_spatial_transcriptomic_list(query)
    mass_cytometry = get_masscytometry_list(query)
    microscopy = get_microscopy_list(query)
    scrna_atac = get_scrna_atac_list(query)
    seq_fish_imaging = get_seq_fish_imaging_list(query)
    if query is not None:
        genes = get_genes_list(query)
        proteins = get_proteins_list(query)
        self.queryset = list(
            chain(scrna_barcorded, scrna_cdna, scrna_atac, microscopy,
                  mass_cytometry, spatial_transcriptomic, genes, proteins))
    else:
        # First set query set
        self.queryset = list(
            chain(scrna_barcorded, scrna_cdna, scrna_atac, microscopy,
                  mass_cytometry, spatial_transcriptomic))
    self.queryset.sort(key=lambda x: x.id)
    # Set context
    context = {
        "request": request,
    }
    # Get serializers lists
    scrna_barcorded_serializer = ScRnaSeqStudyBarcodedSerializer(
        scrna_barcorded, many=True, context=context)
    scrna_cdna_serializer = ScRnaSeqStudyCDNASerializer(
        scrna_cdna, many=True, context=context)
    spatial_transcriptomic_serializer = SpatialTranscriptomicStudySerializer(
        spatial_transcriptomic, many=True, context=context)
    microscopy_serializer = MicroscopyStudySerializer(
        microscopy, many=True, context=context)
    mass_cytometry_serializer = MassCytometryStudySerializer(
        mass_cytometry, many=True, context=context)
    scrna_atac_serializer = ScAtacSeqStudySerializer(
        scrna_atac, many=True, context=context)
    seq_fish_imaging_serializer = SeqFishImagingStudySerializer(
        seq_fish_imaging, many=True, context=context)
    response = (
        scrna_barcorded_serializer.data + scrna_cdna_serializer.data
        + scrna_atac_serializer.data + microscopy_serializer.data + mass_cytometry_serializer.data
        + spatial_transcriptomic_serializer.data + seq_fish_imaging_serializer.data)
    response.sort(key=lambda x: x['id'])
    if query is not None:
        genes_serializer = GeneSerializer(genes, many=True, context=context)
        proteins_serializer = ProteinSerializer(proteins, many=True, context=context)
        response += genes_serializer.data + proteins_serializer.data
    return response


def get_masscytometry_list(query):
    if query is None:
        mass_cytometry = MassCytometryStudy.objects.all()
    else:
        mass_cytometry = MassCytometryStudy.objects.filter(
            Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query)
            | Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
            | Q(proteins__name__icontains=query) | Q(preview_image__icontains=query)
            | Q(image_count__icontains=query))
    return mass_cytometry


def get_scrna_barcorded_list(query):
    if query is None:
        scrna_barcorded = ScRnaSeqStudyBarcoded.objects.all()
    else:
        scrna_barcorded = ScRnaSeqStudyBarcoded.objects.filter(
            Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query)
            | Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
            | Q(genes__hugo_symbol__icontains=query) | Q(cell_count__icontains=query))
    return scrna_barcorded


def get_scrna_cdna_list(query):
    if query is None:
        scrna_cdna = ScRnaSeqStudyCDNA.objects.all()
    else:
        scrna_cdna = ScRnaSeqStudyCDNA.objects.filter(
            Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query)
            | Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
            | Q(read_count_aligned__icontains=query) | Q(cell_count__icontains=query))
    return scrna_cdna


def get_scrna_atac_list(query):
    if query is None:
        scrna_atac = ScAtacSeqStudy.objects.all()
    else:
        scrna_atac = ScAtacSeqStudy.objects.filter(
            Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query)
            | Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
            | Q(read_count_total__icontains=query) | Q(cell_count__icontains=query))
    return scrna_atac


def get_spatial_transcriptomic_list(query):
    if query is None:
        spatial_transcriptomic = SpatialTranscriptomicStudy.objects.all()
    else:
        spatial_transcriptomic = SpatialTranscriptomicStudy.objects.filter(
            Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query)
            | Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
            | Q(genes__hugo_symbol__icontains=query))
    return spatial_transcriptomic


def get_microscopy_list(query):
    if query is None:
        microscopy = MicroscopyStudy.objects.all()
    else:
        microscopy = MicroscopyStudy.objects.filter(
            Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query)
            | Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
            | Q(image_count__icontains=query) | Q(preview_image__icontains=query))
    return microscopy


def get_genes_list(query):
    if query is None:
        genes = Gene.objects.all()
    else:
        genes = Gene.objects.filter(Q(hugo_symbol__icontains=query))
    return genes


def get_genes(self, request):
    query = self.request.query_params.get('gene', None)

    genes = get_genes_list(query)
    self.queryset = genes
    # Set context
    context = {
        "request": request,
    }
    print(genes)
    print(GeneSerializer(genes, many=True, context=context))
    # Get serializers lists
    response = GeneSerializer(genes, many=True, context=context).data
    return response


def get_proteins_list(query):
    if query is None:
        proteins = Protein.objects.all()
    else:
        proteins = Protein.objects.filter(
            Q(name__icontains=query) | Q(gene__hugo_symbol__icontains=query))
    return proteins


def get_seq_fish_imaging_list(query):
    if query is None:
        seq_fish_imaging = SeqFishImagingStudy.objects.all()
    else:
        seq_fish_imaging = SeqFishImagingStudy.objects.filter(
            Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query)
            | Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
            | Q(image_count__icontains=query) | Q(preview_image__icontains=query))
    return seq_fish_imaging


def flatten(orderedDict):
    result = list()
    for item in orderedDict:
        if isinstance(item, (OrderedDict, list)):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result

# TODO: figure out if there's a better place for this
def normalize_whitespace(string: str) -> str:
    """
    :param string: Text input
    :return: A version of `string` with all consecutive runs of whitespace
     (tabs, newlines, multiple spaces in a row, etc.) replaced by single spaces.

    >>> s = '\\n    A string containing\\n    \\tnewlines and more\\t\\n'
    >>> normalize_whitespace(s)
    'A string containing newlines and more'
    """
    return ' '.join(string.split())
