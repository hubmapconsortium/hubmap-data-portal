from django.http import HttpResponse
from django.shortcuts import render

from .forms import model_form_mapping, StudyTypeForm, InstitutionForm
from .models import *

#Developer: Matt Ruffalo
#Developer modifying prototype: Sushma Anand Akoju

#TODO: Modify all views to include StudyType search : W.I.P
#TODO: Implement all views to support FAIR and Restful apis (which it currently is NOT a restful api).
#TODO: find best way to have Authentication framework. (do we use Globus as Authentication api)?
#TODO: Re-model, re-design this prorotype
def index(request):
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

def study_detail(request, study_id: int):
    study = Study.objects.get(id=study_id).get_subclass_object()

    form_type = model_form_mapping[type(study)]
    form = StudyTypeForm(instance=study)

    return render(
        request,
        'study_detail.html',
        {
            'study': study,
            'form': form,
        },
    )

#this is to show institutions page, by default
def filterby_institution(request, institution_id: int):
    institution = Institution.objects.get(id=institution_id)

    form_type = model_form_mapping[institution]
    form = InstitutionForm(instance=institution)

    return render(
        request,
        'institution.html',
        {
            'institution': institution,
            'form': form,
        },
    )


#this is to show tissues page, by default
def filterby_tissue_type(request, tissue_id: int):
    tissue = Tissue.objects.get(id=tissue_id)

    form_type = model_form_mapping[tissue]
    form = TissueForm(instance=tissue)

    return render(
        request,
        'tissue.html',
        {
            'institution': tissue,
            'form': form,
        },
    )


#this is to show data_type page, by default
def filterby_data_type(request, data_type_id: int):
    data_type = DataType.objects.get(id=data_type_id)

    form_type = model_form_mapping[data_type]
    form = DataTypeForm(instance=data_type)

    return render(
        request,
        'datatype.html',
        {
            'institution': data_type,
            'form': form,
        },
    )

def gene_detail(request, hugo_symbol: str):
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
    protein = Protein.objects.get(name=protein_name)

    return render(
        request,
        'protein_detail.html',
        {
            'protein': protein,
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
