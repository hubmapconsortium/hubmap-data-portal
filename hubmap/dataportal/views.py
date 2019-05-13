from django.core import serializers
from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from .models import *
from .serializers import *


class ListStudy(generics.ListCreateAPIView):
    queryset = Study.objects.select_subclasses()
    serializer_class = StudySerializer

class DetailStudy(generics.RetrieveUpdateDestroyAPIView):
    # JsonSerializer = serializers.get_serializer("json")
    # json_serializer = JsonSerializer()
    queryset = Study.objects.select_subclasses()
    # json_serializer.serialize(queryset)
    # data = json_serializer.getvalue()

    def get_serializer_class(self):
        if isinstance(self.get_object(), ScRnaSeqStudyCDNA):
            return ScRnaSeqStudyCDNASerializer
        if isinstance(self.get_object(), ScRnaSeqStudyBarcoded):
            return ScRnaSeqStudyBarcodedSerializer
        if isinstance(self.get_object(), SpatialTranscriptomicStudy):
            return SpatialTranscriptomicStudySerializer
        if isinstance(self.get_object(), MassCytometryStudy):
            return MassCytometryStudySerializer
        if isinstance(self.get_object(), MicroscopyStudy):
            return MicroscopyStudySerializer
        if isinstance(self.get_object(), SeqFishImagingStudy):
            return SeqFishImagingStudySerializer
