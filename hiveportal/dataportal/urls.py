from django.urls import path

from . import views
"""
Add all url patterns here. This is a default setting: for prototype only.
"""
urlpatterns = [
    path('', views.landing, name='landing'),
    path('index', views.index, name='index'),
    path('study/<int:study_id>', views.study_detail, name='study_detail'),
    path('study/<str:name>', views.indexByGroup, name='group'),
    path('gene/<hugo_symbol>', views.gene_detail, name='gene_detail'),
    path('protein/<protein_name>', views.protein_detail, name='protein_detail'),
    path('globus/', views.globus, name='globus'),
]
