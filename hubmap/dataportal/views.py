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
import pandas as pd
import numpy as np
from json import loads, dumps

#TODO: Add OpenApi -> Swagger to rest framework
#TODO: Build frontend -> more tutorials
#TODO: Add post request implementations
#TODO: remove blank models from Get requests in default rest api HTML form


class PaginationClass(PageNumberPagination):
    page_size =  10
    max_page_size = 10

class StudyListView(generics.GenericAPIView):
    serializer_class = StudyListSerializer

    def get(self, request, format=None):
        response = get_response_for_request(self, request, format)
        result = loads(dumps(response))
        values = [
            {"tissue": r['tissue']['name'], "institution" : r['institution']['name'],
               "image_count": r['image_count'] } if (r.get( 'image_count', '')) else
            {"tissue": r['tissue']['name'], "institution": r['institution']['name'],
             "cell_count": r['cell_count'] if (r.get( 'cell_count', '')) else '' } for r in result
        ]
        print(values)
        data = pd.DataFrame.from_records(summary["all"]).fillna('').groupby(['tissue', 'institution']).first()
        response.append({"cell_count":data['cell_count'].items()})
        response.append({"image_count":data['image_count'].items()})
        return Response(response)

    def list(self, request):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset, request)
        serializer_context = {'request': request}
        serializer = self.serializer_class(page, context=serializer_context, many=True)
        print(serializer.data)
        return self.get_paginated_response(serializer.data)

#TODO : deifne what fields are modifiable and what can be created
    def post(self, request, format=None):
        serializer = StudySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudyListPageView(generics.GenericAPIView):
    serializer_class = StudyListSerializer
    pagination_class = PaginationClass

    def get(self, request, format=None):
        response = get_response_for_request(self, request, format)
        paginated_queryset = self.paginate_queryset(response)
        paginated_response = self.get_paginated_response(paginated_queryset)
        return paginated_response

class GeneListView(generics.GenericAPIView):
    serializer_class = GeneSerializer

    def get(self, request, format=None):
        response = get_genes(self, request)
        return Response(response)

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
