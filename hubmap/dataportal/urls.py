from django.urls import path
from django.conf.urls import *

from . import views

urlpatterns = [
    path('', views.ListStudy.as_view()),
    path('<int:pk>/', views.DetailStudy.as_view()),
    url(r'^search/$', views.GlobalSearchListStudy.as_view(), name="search"),
]