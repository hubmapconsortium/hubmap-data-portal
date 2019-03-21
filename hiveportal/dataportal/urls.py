from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('study/<int:study_id>', views.study_detail, name='study_detail'),
    path('institution/<int:institution_id>', views.filterby_institution, name='institution'),
    path('gene/<hugo_symbol>', views.gene_detail, name='gene_detail'),
    path('protein/<protein_name>', views.protein_detail, name='protein_detail'),
    path('globus/', views.globus, name='globus'),
]
