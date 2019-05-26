from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .utils import *

from .serializers import *

#TODO: Add OpenApi -> Swagger to rest framework
#TODO: Build frontend -> more tutorials
#TODO: Add post request implementations
#TODO: remove blank models from Get requests in default rest api HTML form

class ListStudy(generics.GenericAPIView):
    serializer_class = StudyListSerializer

    def get(self, request, format=None):
        response = get_response_for_request(self, request, format)
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
        response = get_response_for_request(self, request, format)
        return Response(response)

class DetailStudy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Study.objects.all()

    def get_serializer_class(self):
        return get_serializer_class(self.get_object())

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object().get_subclass_object())
        return Response(serializer.data)





