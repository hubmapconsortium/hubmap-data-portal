from django.urls import path
from django.conf.urls import *
from django.contrib import admin
admin.autodiscover()
from django.contrib.auth.models import User, Group
from django.contrib import admin
from . import views

from rest_framework import generics, permissions, serializers
from rest_framework.authtoken import views as authtoken_views
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

urlpatterns = [
    path('', views.StudyListView.as_view()),
    path(r'experiments/', views.StudyListPageView.as_view()),
    path(r'<int:pk>/', views.StudyDetailView.as_view()),
    url(r'^search/$', views.GlobalSearch.as_view(), name="search"),
    url(r'^colors/', views.Tissue_svg_colors.as_view(), name="colors"),
    url(r'^genes/$', views.GeneListView.as_view(), name="genes"),
    #path('users/', UserList.as_view()),
    #path('users/<pk>/', UserDetails.as_view()),
    #path('groups/', GroupList.as_view()),
    #url(r'^api-token-auth/', views.CustomAuthToken.as_view()),
]
