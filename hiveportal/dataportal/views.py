from collections import OrderedDict

from django.forms import ModelChoiceField, ModelMultipleChoiceField
from django.shortcuts import render

from .forms import model_form_mapping, StudyTypeForm
from .models import *

#Developer: Matt Ruffalo
#Developer modifying prototype: Sushma Anand Akoju

#TODO: Modify all views to include StudyType search : W.I.P
#TODO: Implement all views to support FAIR and Restful apis (which it currently is NOT a restful api).
#TODO: find best way to have Authentication framework. (do we use Globus as Authentication api)?
#TODO: Re-model, re-design this prorotype

def landing(request):
    """
    This is default landing page.
    """
    return render(request, 'landing.html')

def index(request):
    """
    This method lists study/study_types: Default page.
    """
    study_list = []
    for model in StudyTypes:
        study_list.extend(model.objects.all())

    return render(
        request,
        'study_index.html',
        {
            'study_list': study_list,
        },
    )

def index_by_group(request, id:int):
    """
    This method lists study/study_types based on base_types from Study model: groups by
    Institution, Tissue, Datatype Models. We filter by name, for now, since prototype.
    """
    study_list = []
    study = []
    templateLink = ""

    if request.get_full_path().__contains__('institution') :
        study = Study.objects.filter(institution_id=id)
        templateLink='institution.html'
    elif request.get_full_path().__contains__('tissue'):
        study = Study.objects.filter(tissue_id=id)
        templateLink='tissue.html'
    elif request.get_full_path().__contains__('datatype'):
        study = Study.objects.filter(data_type_id=id)
        templateLink='datatype.html'
    for model in study:
        study_list.append(model.get_subclass_object())

    return render(
        request,
        templateLink,
        {
            'study_list': study_list,
        },
    )

def study_detail(request, study_id: int):
    """
    This method provides details of Study type by details.
    """
    study = Study.objects.get(id=study_id).get_subclass_object()

    fields =OrderedDict()
    form_type = model_form_mapping[type(study)]
    form = form_type(instance=study)
    field_values= study.derived_class_fields
    for field in field_values.split(' ,'):
        string_fields = field.strip().split(':')
        fields.__setitem__(string_fields[0].strip(), string_fields[1].strip())
    print(fields)
    return render(
        request,
        'study_detail.html',
        {
            'study': study,
            'form': form,
            'fields':fields,
        },
    )

def gene_detail(request, hugo_symbol: str):
    """
    This method lists all gene-details.
    """
    gene = Gene.objects.get(hugo_symbol=hugo_symbol)
    proteins = gene.protein_set.all()

    return render(
        request,
        'gene_detail.html',
        {
            'gene': gene,
            'proteins': proteins,
        },
    )

def protein_detail(request, protein_name: str):
    """
    This method lists all protein-details.
    """
    gene= []
    proteins = Protein.objects.filter(name=protein_name)
    for protein in proteins:
        gene = Gene.objects.get(hugo_symbol=protein.gene.hugo_symbol)
    return render(
        request,
        'protein_detail.html',
        {
            'proteins': proteins,
            'gene': gene,
        },
    )

def globus(request):
    uuid = None
    access_token = None
    refresh_token = None
    if request.user.is_authenticated:
        uuid = request.user.social_auth.get(provider='globus').uid
        social = request.user.social_auth
        access_token = social.get(provider='globus').extra_data['access_token']
        refresh_token = social.get(provider='globus').extra_data['refresh_token']
    return render(
        request,
        'globus.html',
        {
            'uuid': uuid,
            'access_token': access_token,
            'refresh_token': refresh_token,
        },
    )
