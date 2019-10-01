from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import AnonymousUser, Group
from django.utils.decorators import method_decorator
from rest_framework import generics, permissions, status, versioning, views
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from .serializers import (
    GroupSerializer,
    LoggedInUserSerializer,
    User,
    UserSerializer,
)
from .utils import get_genes, get_response_for_request, get_serializer_class

# TODO: Add OpenApi -> Swagger to rest framework
# TODO: Add post request implementations


class GlobusUserAuth(generics.GenericAPIView):
    serializer_class = UserSerializer
    parser_classes = [JSONParser]
    versioning_class = versioning.QueryParameterVersioning
    queryset = User.objects.all()

    def get(self, request, format=None):
        if not hasattr(request, 'user'):
            request.user = AnonymousUser
        if request.user.is_authenticated:
            response = LoggedInUserSerializer(request.user).data
        return Response(response)


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
