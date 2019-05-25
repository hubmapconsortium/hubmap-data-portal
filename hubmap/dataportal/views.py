from itertools import chain

from django.core import serializers
from django.db.models import Q
from django.shortcuts import render

# Create your views here.
from django_filters import OrderingFilter, FilterSet, CharFilter
from rest_framework import generics
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework import status

from .models import *
from .serializers import *

#TODO: Add OpenApi -> Swagger to rest framework
#TODO: Build frontend -> more tutorials

class ListStudy(generics.GenericAPIView):
    serializer_class = StudyListSerializer

    def get(self, request, format=None):
        scrna_barcorded = ScRnaSeqStudyBarcoded.objects.all()
        scrna_cdna = ScRnaSeqStudyCDNA.objects.all()
        spatial_transcriptomic = SpatialTranscriptomicStudy.objects.all()
        mass_cytometry = MassCytometryStudy.objects.all()
        microscopy = MicroscopyStudy.objects.all()
        scrna_atac= ScAtacSeqStudy.objects.all()
        self.queryset =  list(chain(scrna_barcorded, scrna_cdna, scrna_atac, microscopy, mass_cytometry, spatial_transcriptomic))
        context = {
            "request": request,
        }
        scrna_barcorded_serializer = ScRnaSeqStudyBarcodedSerializer(scrna_barcorded, many=True, context=context)
        scrna_cdna_serializer = ScRnaSeqStudyCDNASerializer(scrna_cdna, many=True, context=context)
        spatial_transcriptomic_serializer = SpatialTranscriptomicStudySerializer(spatial_transcriptomic, many=True, context=context)
        microscopy_serializer = MicroscopyStudySerializer(microscopy, many=True, context=context)
        mass_cytometry_serializer = MassCytometryStudySerializer(mass_cytometry, many=True, context=context)
        scrna_atac_serializer = ScAtacSeqStudySerializer(scrna_atac, many=True, context=context)
        response = scrna_barcorded_serializer.data + scrna_cdna_serializer.data + scrna_atac_serializer.data +microscopy_serializer.data + mass_cytometry_serializer.data + spatial_transcriptomic_serializer.data
        print(response)
        return Response(response)

#TODO : deifne what fields are modifiable and what can be created
    def post(self, request, format=None):
        serializer = StudySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GlobalSearchListStudy(generics.ListAPIView):
    serializer_class = StudyListSerializer

    def get(self, request, format=None):
        query = self.request.query_params.get('search', None)
        scrna_barcorded = ScRnaSeqStudyBarcoded.objects.filter(Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query) |
                                       Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
                                       | Q(genes__hugo_symbol__icontains=query))
        scrna_cdna = ScRnaSeqStudyCDNA.objects.filter(Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query) |
                                       Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
                                       | Q(read_count_aligned__icontains=query))
        scrna_atac = ScAtacSeqStudy.objects.filter(Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query) |
                                       Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
                                       | Q(read_count_total__icontains=query) | Q(cell_count__icontains=query))
        spatial_transcriptomic = SpatialTranscriptomicStudy.objects.filter(Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query) |
                                       Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
                                       | Q(genes__hugo_symbol__icontains=query))
        mass_cytometry = MassCytometryStudy.objects.filter(Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query) |
                                       Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
                                       | Q(proteins__name__icontains=query) | Q(preview_image__icontains=query))
        microscopy = MicroscopyStudy.objects.filter(Q(tissue__name__icontains=query) | Q(data_type__name__icontains=query) |
                                       Q(institution__name__icontains=query) | Q(creation_time__icontains=query)
                                       | Q(image_count__icontains=query) | Q(preview_image__icontains=query))
        genes = Gene.objects.filter(Q(hugo_symbol__icontains=query) )
        proteins = Protein.objects.filter(Q(name__icontains=query) | Q(gene__hugo_symbol__icontains=query) )
        self.queryset =  list(chain(scrna_barcorded, scrna_cdna, scrna_atac, microscopy, mass_cytometry, spatial_transcriptomic, genes, proteins))
        context = {
            "request": request,
        }
        scrna_barcorded_serializer = ScRnaSeqStudyBarcodedSerializer(scrna_barcorded, many=True, context=context)
        scrna_cdna_serializer = ScRnaSeqStudyCDNASerializer(scrna_cdna, many=True, context=context)
        spatial_transcriptomic_serializer = SpatialTranscriptomicStudySerializer(spatial_transcriptomic, many=True, context=context)
        microscopy_serializer = MicroscopyStudySerializer(microscopy, many=True, context=context)
        mass_cytometry_serializer = MassCytometryStudySerializer(mass_cytometry, many=True, context=context)
        scrna_atac_serializer = ScAtacSeqStudySerializer(scrna_atac, many=True, context=context)
        genes_serializer = GeneSerializer(genes, many=True, context=context)
        proteins_serializer = ProteinSerializer(proteins, many=True, context=context)

        response = scrna_barcorded_serializer.data + scrna_cdna_serializer.data + scrna_atac_serializer.data + \
                   microscopy_serializer.data + mass_cytometry_serializer.data + spatial_transcriptomic_serializer.data\
                    + genes_serializer.data + proteins_serializer.data
        print(response)
        return Response(response)


class DetailStudy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Study.objects.select_subclasses()

    def get_serializer_class(self):
        if isinstance(self.get_object(), ScRnaSeqStudyCDNA):
            return ScRnaSeqStudyCDNASerializer
        elif isinstance(self.get_object(), ScRnaSeqStudyBarcoded):
            return ScRnaSeqStudyBarcodedSerializer
        elif isinstance(self.get_object(), SpatialTranscriptomicStudy):
            return SpatialTranscriptomicStudySerializer
        elif isinstance(self.get_object(), MassCytometryStudy):
            return MassCytometryStudySerializer
        elif isinstance(self.get_object(), MicroscopyStudy):
            return MicroscopyStudySerializer
        elif isinstance(self.get_object(), SeqFishImagingStudy):
            return SeqFishImagingStudySerializer
