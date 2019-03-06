from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('study/<int:study_type_id>/<int:study_id>', views.index, name='study_detail'),
    path('globus/', views.globus, name='globus'),
]
