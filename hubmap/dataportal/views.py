from django.core import serializers
from django.shortcuts import render

# Create your views here.
from django_filters import OrderingFilter
from rest_framework import generics

from .models import *
from .serializers import *


class ListStudy(generics.ListCreateAPIView):
    queryset = Study.objects.select_subclasses()
    serializer_class = StudySerializer

class FilterListStudy(generics.ListAPIView):
    serializer_class = StudySerializer
    filterset_fields = ('tissue',)
    def get_queryset(self):
        id = self.kwargs['id']
        return Study.objects.filter(tissue_id=id).select_subclasses()

class DetailStudy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Study.objects.select_subclasses()

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
