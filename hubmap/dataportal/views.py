from rest_framework import generics, views
from rest_framework.response import Response
from rest_framework import status
from .utils import *
from django.forms.models import model_to_dict
from .serializers import *
import matplotlib.cm
import numpy as np
import pandas as pd
from django.shortcuts import render
from rest_framework.pagination import PageNumberPagination

#TODO: Add OpenApi -> Swagger to rest framework
#TODO: Build frontend -> more tutorials
#TODO: Add post request implementations
#TODO: remove blank models from Get requests in default rest api HTML form


class StudyListView(generics.GenericAPIView):
    serializer_class = StudyListSerializer
    
    def get(self, request, format=None):
        response = get_response_for_request(self, request, format)
        page = self.paginate_queryset(response)
        paginated_response  = self.get_paginated_response(response)
        print(paginated_response)
        return paginated_response

#TODO : deifne what fields are modifiable and what can be created
    def post(self, request, format=None):
        serializer = StudySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GlobalSearch(generics.ListAPIView):
    serializer_class = StudyListSerializer

    def get(self, request, format=None):
        response = get_response_for_request(self, request, format)
        return Response(response)

class StudyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Study.objects.all()

    def get_serializer_class(self):
        return get_serializer_class(self.get_object())

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object().get_subclass_object())
        return Response(serializer.data)

def tissue_svg(request):
    # These match the Django template fields in `human_body.svg`
    organs = [
        'stomach',
        'liver',
        'lung',
        'small_intestine',
        'heart',
        'bladder',
        'large_intestine',
        'kidney',
    ]
def rgba_float_to_rgb_hex(floats):
    return '#' + ''.join('{:02x}'.format(int(c * 255)) for c in floats[:3])

class Tissue_svg_colors(views.APIView):

    def get(self, request):
        # These match the Django template fields in `human_body.svg`
        organs = [
            'pancreas',
            'abdomen',
            'liver',
            'lungs',
            'small_intestine',
            'heart',
            'bladder',
            'large_intestine',
            'kidney',
            'spleen',
        ]
        vec = pd.Series(np.random.random(len(organs)), index=organs)
        values = [
            {"tissue": tissue, "color" : rgba_float_to_rgb_hex(matplotlib.cm.viridis(expr))}
            for tissue, expr in vec.items()
        ]
        print(values)
        results = TissueColorSerializer(values, many=True).data
        return Response(
            results
        )
