from collections import defaultdict

from django.shortcuts import render
from rest_framework import generics, views, versioning
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from fixtures.add_tissuegene_heatmaps2db import setcolorheatmap
from .utils import *
from .serializers import *
import matplotlib.cm
import pandas as pd
import numpy as np
from json import loads, dumps
import xarray as xr
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
import os
import logging
from .decorators import   user_has_view_permissions
from django.contrib.auth.decorators import login_required
#TODO: Add OpenApi -> Swagger to rest framework
#TODO: Add post request implementations
from rest_framework.authtoken.models import Token

#token = Token.objects.create(user='admin')
#print(token.key)

class PaginationClass(PageNumberPagination):
    page_size =  10
    max_page_size = 10

class StudyListView(generics.GenericAPIView):
    serializer_class = StudyListSerializer
    parser_classes = [JSONParser]
    versioning_class = versioning.QueryParameterVersioning

    @user_has_view_permissions
    def get(self, request, format=None):
        response = get_response_for_request(self, request, format)
        cell_count_summary = serialize_multi_dim_counts(compute_multi_dim_counts(self.queryset, "cell_count"))
        image_count_summary = serialize_multi_dim_counts(compute_multi_dim_counts(self.queryset, "image_count"))
        response.append({"summary" : [{ "cell_count" : cell_count_summary},{"image_count": image_count_summary}]})
        return Response(response)

    @user_has_view_permissions
    def list(self, request):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset, request)
        serializer_context = {'request': request}
        serializer = self.serializer_class(page, context=serializer_context, many=True)
        print(serializer.data)
        return self.get_paginated_response(serializer.data)

#TODO : deifne what fields are modifiable and what can be created
    @user_has_view_permissions
    def post(self, request, format=None):
        serializer = StudySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudyListPageView(generics.GenericAPIView):
    serializer_class = StudyListSerializer
    pagination_class = PaginationClass
    parser_classes = [JSONParser]
    versioning_class = versioning.QueryParameterVersioning

    @user_has_view_permissions
    def get(self, request, format=None):
        response = get_response_for_request(self, request, format)
        paginated_queryset = self.paginate_queryset(response)
        paginated_response = self.get_paginated_response(paginated_queryset)
        return paginated_response

class GeneListView(generics.GenericAPIView):
    serializer_class = GeneSerializer
    parser_classes = [JSONParser]
    versioning_class = versioning.QueryParameterVersioning

    @user_has_view_permissions
    def get(self, request, format=None):
        response = get_genes(self, request)
        return Response(response)

class GlobalSearch(generics.ListAPIView):
    serializer_class = StudyListSerializer
    parser_classes = [JSONParser]
    versioning_class = versioning.QueryParameterVersioning

    def get(self, request, format=None):
        response = get_response_for_request(self, request, format)
        return Response(response)

class StudyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Study.objects.all()
    parser_classes = [JSONParser]
    versioning_class = versioning.QueryParameterVersioning

    def get_serializer_class(self):
        """
        :return: If given a study PK, return a serializer class for that Study
          subclass. Otherwise return the base Study serializer.
        """
        if self.lookup_field not in self.kwargs:
            return StudySerializer
        return get_serializer_class(self.get_object())

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object().get_subclass_object())
        return Response(serializer.data)

def rgba_float_to_rgb_hex(floats):
    return '#' + ''.join('{:02x}'.format(int(c * 255)) for c in floats[:3])

class Tissue_svg_colors(views.APIView):

    def get(self, request):
        # These match the Django template fields in `human_body.svg`

        organs = [
            'pancreas',
            'abdomen',
            'liver',
            'lung',
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

# Each label (element 0 in tuples) has multiple meanings/functions.
# 1. it will be a dimension of the `xr.DataArray` returned by
#    `compute_multi_dim_counts`.
# 2. it must be an attribute on the base Study class, which is a
#    foreign key to element 1 in the tuples
MULTI_DIM_CLASSES = [
    ('tissue', Tissue),
    ('institution', Institution),
    ('data_type', DataType),
]

def compute_multi_dim_counts(queryset, field_name: str) -> xr.DataArray:
    """
    :param field_name: A field on Study subclasses which holds numeric data.
      All Study objects will be queried; if this field is missing from a
      certain subclass, it will be treated as 0.
    :return: A `xr.DataArray` with aggregated counts
    """
    dims = []
    coords = []
    for label, model in MULTI_DIM_CLASSES:
        dims.append(label)
        coords.append([obj.name for obj in model.objects.all()])

    shape = tuple(len(c) for c in coords)
    zeros = np.zeros(shape).astype(int)

    data = xr.DataArray(
        zeros,
        dims=dims,
        coords=coords,
    )

    for study_obj in queryset:
        sel_dict = {label: getattr(study_obj, label).name for label, _ in MULTI_DIM_CLASSES}
        data.loc[sel_dict] += getattr(study_obj, field_name, 0)

    return data

def serialize_multi_dim_counts(data: xr.DataArray):
    list_for_frontend = []
    try:
        dims_to_stack = ['tissue', 'institution']
        stacked = data.stack(gridcell=dims_to_stack)
        grouped = stacked.groupby('gridcell', squeeze=False).sum().unstack('gridcell')
        df = grouped.to_dataframe('temp')
        df.index.names = dims_to_stack

        columns_list = ["Tissue"]
        columns_list.append(data['institution'].sortby(data['institution']).values.tolist())
        list_for_frontend.append(columns_list)
        for tissue in df.index.levels[0]:
            list_for_frontend.append([
                tissue,
                (df.loc[tissue, :].iloc[:, 0]).values.tolist()
            ])
    except ValueError:
        # `data.stack` throws a ValueError if `data` is empty.
        # Correctly return an empty list to the frontend instead of exploding.
        pass

    return list_for_frontend

def globus(request):
    uuid = None
    access_token = None
    refresh_token = None
    if request.user.is_authenticated:
        uuid = request.user.social_auth.get(provider='globus').uid
        social = request.user.social_auth
        access_token = social.get(provider='globus').extra_data['access_token']
        refresh_token = social.get(provider='globus').extra_data['refresh_token']
    return render(
        request,
        'globus.html',
        {       'uuid': uuid,
                  'access_token': access_token,
                  'refresh_token': refresh_token},
    )
