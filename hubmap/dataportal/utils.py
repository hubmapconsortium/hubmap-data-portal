from collections import OrderedDict
from itertools import chain
from django.db.models import Q
from .models import *
from .serializers import *

def to_native(this_study):
    obj = this_study.get_subclass_object()
    if isinstance(obj, ScRnaSeqStudyCDNA):
        serializer = ScRnaSeqStudyCDNASerializer(obj)
    elif isinstance(obj, ScRnaSeqStudyBarcoded):
        serializer = ScRnaSeqStudyBarcodedSerializer(obj)
    elif isinstance(obj, SpatialTranscriptomicStudy):
        serializer = SpatialTranscriptomicStudySerializer(obj)
    elif isinstance(obj.get_subclass_object(), MassCytometryStudy):
        serializer = MassCytometryStudySerializer(obj)
    elif isinstance(obj, MicroscopyStudy):
        serializer = MicroscopyStudySerializer(obj)
    elif isinstance(obj, SeqFishImagingStudy):
        serializer = SeqFishImagingStudySerializer(obj)
    elif isinstance(obj, Gene):
        serializer = GeneSerializer(obj)
    elif isinstance(obj, Protein):
        serializer = ProteinSerializer(obj)
    return serializer.data

def get_this_queryset(id):
    this_study = Study.objects.get(id=id).get_subclass_object()
    return this_study

def get_serializer(self, *args, **kwargs):
    studies = Study.objects.all()
    new_studies = list()
    for study in studies:
        new_studies.append(to_native(study))
    serializer = DataportalSearchSerializer(new_studies)
    return serializer


'''in case we have to use recursive gene/gene expressions/new features, use this. for now: keeping this'''
class RecursiveSerializer(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data

class DataportalSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Study
        fields = '__all__'
        depth = 3

def get_serializer_class(this_study):
    obj = this_study.get_subclass_object()
    if isinstance(obj, ScRnaSeqStudyCDNA):
        return ScRnaSeqStudyCDNASerializer
    elif isinstance(obj, ScRnaSeqStudyBarcoded):
        return ScRnaSeqStudyBarcodedSerializer
    elif isinstance(obj, SpatialTranscriptomicStudy):
        return SpatialTranscriptomicStudySerializer
    elif isinstance(obj, MassCytometryStudy):
        return MassCytometryStudySerializer
    elif isinstance(obj, MicroscopyStudy):
        return MicroscopyStudySerializer
    elif isinstance(obj, SeqFishImagingStudy):
        return SeqFishImagingStudySerializer

def process_list_get_request(self, request, format=None):
    scrna_barcorded = ScRnaSeqStudyBarcoded.objects.all()
    scrna_cdna = ScRnaSeqStudyCDNA.objects.all()
    spatial_transcriptomic = SpatialTranscriptomicStudy.objects.all()
    mass_cytometry = MassCytometryStudy.objects.all()
    microscopy = MicroscopyStudy.objects.all()
    scrna_atac = ScAtacSeqStudy.objects.all()
    self.queryset = list(
        chain(scrna_barcorded, scrna_cdna, scrna_atac, microscopy, mass_cytometry, spatial_transcriptomic))
    context = {
        "request": request,
    }
    scrna_barcorded_serializer = ScRnaSeqStudyBarcodedSerializer(scrna_barcorded, many=True, context=context)
    scrna_cdna_serializer = ScRnaSeqStudyCDNASerializer(scrna_cdna, many=True, context=context)
    spatial_transcriptomic_serializer = SpatialTranscriptomicStudySerializer(spatial_transcriptomic, many=True,
                                                                             context=context)
    microscopy_serializer = MicroscopyStudySerializer(microscopy, many=True, context=context)
    mass_cytometry_serializer = MassCytometryStudySerializer(mass_cytometry, many=True, context=context)
    scrna_atac_serializer = ScAtacSeqStudySerializer(scrna_atac, many=True, context=context)
    response = scrna_barcorded_serializer.data + scrna_cdna_serializer.data + scrna_atac_serializer.data + microscopy_serializer.data + mass_cytometry_serializer.data + spatial_transcriptomic_serializer.data
    print(response)
    return response

def process_this_search_query(self, request, format=None):
    query = self.request.query_params.get('search', None)
    scrna_barcorded = ScRnaSeqStudyBarcoded.objects.filter(
        Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query) |
        Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
        | Q(genes__hugo_symbol__icontains=query))
    scrna_cdna = ScRnaSeqStudyCDNA.objects.filter(
        Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query) |
        Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
        | Q(read_count_aligned__icontains=query))
    scrna_atac = ScAtacSeqStudy.objects.filter(Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query) |
                                               Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
                                               | Q(read_count_total__icontains=query) | Q(cell_count__icontains=query))
    spatial_transcriptomic = SpatialTranscriptomicStudy.objects.filter(
        Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query) |
        Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
        | Q(genes__hugo_symbol__icontains=query))
    mass_cytometry = MassCytometryStudy.objects.filter(
        Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query) |
        Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
        | Q(proteins__name__icontains=query) | Q(preview_image__icontains=query))
    microscopy = MicroscopyStudy.objects.filter(Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query) |
                                                Q(institution__name__icontains=query) | Q(
        creation_time__icontains=query)
                                                | Q(image_count__icontains=query) | Q(preview_image__icontains=query))
    genes = Gene.objects.filter(Q(hugo_symbol__icontains=query))
    proteins = Protein.objects.filter(Q(name__icontains=query) | Q(gene__hugo_symbol__icontains=query))
    self.queryset = list(
        chain(scrna_barcorded, scrna_cdna, scrna_atac, microscopy, mass_cytometry, spatial_transcriptomic, genes,
              proteins))
    context = {
        "request": request,
    }
    scrna_barcorded_serializer = ScRnaSeqStudyBarcodedSerializer(scrna_barcorded, many=True, context=context)
    scrna_cdna_serializer = ScRnaSeqStudyCDNASerializer(scrna_cdna, many=True, context=context)
    spatial_transcriptomic_serializer = SpatialTranscriptomicStudySerializer(spatial_transcriptomic, many=True,
                                                                             context=context)
    microscopy_serializer = MicroscopyStudySerializer(microscopy, many=True, context=context)
    mass_cytometry_serializer = MassCytometryStudySerializer(mass_cytometry, many=True, context=context)
    scrna_atac_serializer = ScAtacSeqStudySerializer(scrna_atac, many=True, context=context)
    genes_serializer = GeneSerializer(genes, many=True, context=context)
    proteins_serializer = ProteinSerializer(proteins, many=True, context=context)

    response = scrna_barcorded_serializer.data + scrna_cdna_serializer.data + scrna_atac_serializer.data + \
               microscopy_serializer.data + mass_cytometry_serializer.data + spatial_transcriptomic_serializer.data \
               + genes_serializer.data + proteins_serializer.data
    return response
