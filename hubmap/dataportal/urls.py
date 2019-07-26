from django.urls import path
from django.conf.urls import *
from rest_framework.documentation import include_docs_urls
from rest_framework.schemas import get_schema_view
from django.contrib.auth.models import User, Group
from django.contrib import admin
admin.autodiscover()
from . import views

from rest_framework import generics, permissions, serializers

from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope

# first we define the serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', "first_name", "last_name")

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("name", )

# Create the API views
class UserList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetails(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GroupList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['groups']
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
# Create a router and register our viewsets with it.
API_TITLE = 'HuBMAP UI-backend API'
API_DESCRIPTION = 'A Web API for viewing HuBMAP Consortium experiments data.'
schema_view = get_schema_view(title=API_TITLE)
urlpatterns = [
    path('', views.StudyListView.as_view()),
    path(r'experiments/', views.StudyListPageView.as_view()),
    path(r'<int:pk>/', views.StudyDetailView.as_view()),
    url(r'^search/$', views.GlobalSearch.as_view(), name="search"),
    url(r'^colors/', views.Tissue_svg_colors.as_view(), name="colors"),
    url(r'^genes/$', views.GeneListView.as_view(), name="genes"),
    path('globus/', views.globus, name='globus'),
    url(r'^openapi/$', schema_view),
    url(r'^docs/', include_docs_urls(title=API_TITLE, description=API_DESCRIPTION)),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('users/', UserList.as_view()),
    path('users/<pk>/', UserDetails.as_view()),
    path('groups/', GroupList.as_view()),
]
