from django.urls import path
from django.conf.urls import *

from . import views

urlpatterns = [
    path('', views.StudyListView.as_view()),
    path(r'studies/', views.StudyListPageView.as_view()),
    path(r'<int:pk>/', views.StudyDetailView.as_view()),
    url(r'^search/$', views.GlobalSearch.as_view(), name="search"),
    url(r'^colors/', views.Tissue_svg_colors.as_view(), name="colors"),
    url(r'^genes/$', views.GeneListView.as_view(), name="genes"),
    url(r'^browse', views.FrontendAppView.as_view()),
]