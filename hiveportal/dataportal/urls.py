from django.conf import settings
from django.urls import path

from . import views
from django.conf.urls.static import static
"""
Add all url patterns here. This is a default setting: for prototype only.
"""
urlpatterns = [
    path('', views.landing, name='landing'),
    path('index', views.index, name='index'),
    path('study/<int:study_id>', views.study_detail, name='study_detail'),
    path('query/institution/<int:id>', views.index_by_group, name='group'),
    path('query/datatype/<int:id>', views.index_by_group, name='group'),
    path('query/tissue/<int:id>', views.index_by_group, name='group'),
    path('query/subclass/<int:id>', views.index_by_group, name='group'),
    path('gene/<hugo_symbol>', views.gene_detail, name='gene_detail'),
    path('protein/<protein_name>', views.protein_detail, name='protein_detail'),
    path('globus/', views.globus, name='globus'),
]+static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
