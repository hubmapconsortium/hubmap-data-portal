from django.http import HttpResponse
from django.shortcuts import render

from .models import *

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

    fields = study._meta.fields

    return render(
        request,
        'study_detail.html',
        {
            'study': study,
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
