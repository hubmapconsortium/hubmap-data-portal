from django.urls import path
from django.conf.urls import *

from . import views

urlpatterns = [
    path('', views.StudyListView.as_view()),
    path(r'<int:pk>/', views.StudyDetailView.as_view()),
    url(r'^search/$', views.GlobalSearch.as_view(), name="search"),
]