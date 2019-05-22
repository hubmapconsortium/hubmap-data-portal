from django.urls import path
from django.conf.urls import *

from . import views

urlpatterns = [
    path('', views.ListStudy.as_view()),
    path('<int:pk>/', views.DetailStudy.as_view()),
    path('tissue/<str:id>/', views.FilterListStudy.as_view()),
]