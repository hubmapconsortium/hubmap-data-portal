import matplotlib.cm
import numpy as np
import pandas as pd
import xarray as xr
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import AnonymousUser
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.utils.decorators import method_decorator
from rest_framework import generics, status, versioning, views
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import permissions

from hubmap import settings
from .models import Study, Institution, Tissue, DataType
from django.contrib.auth.models import Group
from django.contrib.auth.views import auth_logout
from .serializers import (
    GeneSerializer,
    StudyListSerializer,
    StudySerializer,
    TissueColorSerializer,
    LoggedInUserSerializer,
    UserSerializer,
    GroupSerializer,
    User
)
from .utils import get_genes, get_response_for_request, get_serializer_class


# TODO: Add OpenApi -> Swagger to rest framework
# TODO: Add post request implementations

class PaginationClass(PageNumberPagination):
    page_size = 10
    max_page_size = 10


class StudyListView(generics.GenericAPIView):
    serializer_class = StudyListSerializer
    parser_classes = [JSONParser]
    versioning_class = versioning.QueryParameterVersioning

    def get(self, request, format=None):
        response = get_response_for_request(self, request, format)
        cell_count_summary = serialize_multi_dim_counts(
            compute_multi_dim_counts(self.queryset, "cell_count"))
        image_count_summary = serialize_multi_dim_counts(
            compute_multi_dim_counts(self.queryset, "image_count"))
        response.append({"summary": [
            {"cell_count": cell_count_summary}, {"image_count": image_count_summary}
        ]})
        return Response(response)

    def list(self, request):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset, request)
        serializer_context = {'request': request}
        serializer = self.serializer_class(page, context=serializer_context, many=True)
        print(serializer.data)
        return self.get_paginated_response(serializer.data)

    # TODO : define what fields are modifiable and what can be created
    @method_decorator(login_required)
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

    def get(self, request, format=None):
        response = get_response_for_request(self, request, format)
        paginated_queryset = self.paginate_queryset(response)
        paginated_response = self.get_paginated_response(paginated_queryset)
        return paginated_response


class GeneListView(generics.GenericAPIView):
    serializer_class = GeneSerializer
    parser_classes = [JSONParser]
    versioning_class = versioning.QueryParameterVersioning

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
            {"tissue": tissue, "color": rgba_float_to_rgb_hex(matplotlib.cm.viridis(expr))}
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
    if not hasattr(request, 'user'):
        request.user = AnonymousUser

    elif request.user.is_authenticated:
        response = HttpResponseRedirect('http://localhost:3000/')
        uuid = request.user.social_auth.get(provider='globus').uid
        social = request.user.social_auth
        access_token = social.get(provider='globus').extra_data['access_token']
        refresh_token = social.get(provider='globus').extra_data['refresh_token']
        response.set_cookie('first_name', request.user.first_name)
        response.set_cookie('last_name', request.user.last_name)
        response.set_cookie('email', request.user.email)
        return response
    return render(
        request,
        'globus.html',
        {
            'uuid': uuid,
            'access_token': access_token,
            'refresh_token': refresh_token,
        },
    )


class GlobusUserAuth(generics.GenericAPIView):
    serializer_class = UserSerializer
    parser_classes = [JSONParser]
    versioning_class = versioning.QueryParameterVersioning
    queryset = User.objects.all()

    def get(self, request, format=None):
        if not hasattr(request, 'user'):
            request.user = AnonymousUser
        if request.user.is_authenticated:
            # uuid = request.user.social_auth.get(provider='globus').uid
            # social = request.user.social_auth
            # access_token = social.get(provider='globus').extra_data['access_token']
            # refresh_token = social.get(provider='globus').extra_data['refresh_token']
            response = LoggedInUserSerializer(request.user).data
        return Response(response)


def logout(request):
    if request.user.is_authenticated:
        auth_logout(request)
    response = HttpResponseRedirect(settings.LOGOUT_REDIRECT_URL)
    response.delete_cookie('first_name')
    response.delete_cookie('last_name')
    response.delete_cookie('email')
    print('logout')
    return response


# Create the API views
class UserList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetails(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    required_scopes = ['groups']
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
