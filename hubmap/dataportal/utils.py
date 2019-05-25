from itertools import chain

from .models import *
from .serializers import *

def to_native(self, obj):
    if isinstance(obj, ScRnaSeqStudyCDNA):
        serializer = ScRnaSeqStudyCDNASerializer(obj)
    elif isinstance(obj, ScRnaSeqStudyBarcoded):
        serializer = ScRnaSeqStudyBarcodedSerializer(obj)
    elif isinstance(obj, SpatialTranscriptomicStudy):
        serializer = SpatialTranscriptomicStudySerializer(obj)
    elif isinstance(obj, MassCytometryStudy):
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

def get_queryset(self):
    scrna_barcorded = ScRnaSeqStudyBarcoded.objects.all()
    scrna_cdna = ScRnaSeqStudyCDNA.objects.all()
    spatial_transcriptomic = SpatialTranscriptomicStudy.objects.all()
    mass_cytometry = MassCytometryStudy.objects.all()
    microscopy = MicroscopyStudy.objects.all()
    all_results = list(chain( scrna_barcorded, scrna_cdna, spatial_transcriptomic,
                             mass_cytometry, microscopy))
    all_results.sort(key=lambda x: x.pk)
    return all_results

def get_serializer(self, *args, **kwargs):
    studies = Study.objects.all().select_subclasses()
    new_studies = list()
    for study in studies:
        new_studies.append(DataportalSearchSerializer.to_native(self, study))
    serializer = DataportalSearchSerializer(new_studies)
    return serializer

#def get_serialized_data(**kwargs):


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