from collections import OrderedDict
from copy import deepcopy
from operator import attrgetter
from deep_collector.core import DeepCollector
from django.forms import IntegerField
from django.shortcuts import render

from .documents import *
from .forms import model_form_mapping, StudyTypeForm
from .models import *

#Developer: Matt Ruffalo
#Developer modifying prototype: Sushma Anand Akoju

#TODO: Modify all views to include StudyType search : W.I.P
#TODO: Implement all views to support FAIR and Restful apis (which it currently is NOT a restful api).
#TODO: find best way to have Authentication framework. (do we use Globus as Authentication api)?
#TODO: Re-model, re-design this prorotype
FIELDS_TO_IGNORE = {
    'id',
    'study_ptr',
    'subclass',
    'institution',
    'data_type',
    'tissue',
    'genes',
    'proteins',
    'preview_image',
}

#study.create()
search = study.search()

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
    sorted_studies = sorted(study_list, key=attrgetter('id'))

    return render(
        request,
        'study_index.html',
        {
            'study_list': sorted_studies,
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
    if request.get_full_path().__contains__('institution'):
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

def filterby_gene(request, id:int):
    """
    This method lists study/study_types based on base_types from Study model: groups by
    Genes, Proteins. We filter by name, for now, since prototype.
    """
    study_list = []
    gene = Gene.objects.get(id=id)
    if request.get_full_path().__contains__('genes'):
        for s in Study.objects.all():
            s =s.get_subclass_object()
            if hasattr(s, "genes"):
                if gene in s.genes.all():
                        study_list.append(s)
    return render(
        request,
        'study_index.html',
        {
            'study_list': study_list,
        },
    )

def filterby_protein(request, id: int):
    study_list=[]
    protein = Protein.objects.get(id=id)
    if request.get_full_path().__contains__('proteins'):
        for s in Study.objects.all():
            s = s.get_subclass_object()
            if hasattr(s, "proteins"):
                if protein in s.proteins.all():
                        study_list.append(s)
    return render(
        request,
        'study_index.html',
        {
            'study_list': study_list,
        },
    )

def study_detail(request, study_id: int):
    """
    This method provides details of Study type by details.
    """
    study = Study.objects.get(id=study_id).get_subclass_object()
    form_type = model_form_mapping[type(study)]
    form = form_type(instance=study)
    remaining_fields = sorted(
        set(f.name for f in study._meta.get_fields()) -
        FIELDS_TO_IGNORE)
    return render(
        request,
        'study_detail.html',
        {
            'study': study,
            'form': form,
            'fields': remaining_fields,
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

def list_projects(request):
    """
    This is default projects list page.
    """
    return render(request, 'projects.html')

def get_analysis(request):
    """
    This is default analysis page.
    """
    return render(request, 'analysis.html')

def show_data(request):
    """
    This is default data repository page.
    """
    return render(request, 'datarepository.html')

def support(request):
    """
    This is default support page.
    """
    return render(request, 'support.html')

def contactus(request):
    """
    This is default contactus page.
    """
    return render(request, 'contactus.html')

def show_image(request, study_id:int):
    """
    This is default preview_image page.
    """
    study = Study.objects.get(id=study_id).get_subclass_object()

    url_path =""
    form_type = model_form_mapping[type(study)]
    form = form_type(instance=study)
    url_path = study.preview_image.url
    print(url_path)
    return render(
        request,
        'show_image.html',
        {
            'url_path': url_path,
        },
    )

def protein_index(request):
        """
        This is default protein index page.
        """
        proteins = Protein.objects.all()
        return render(
            request,
            'protein_index.html',
            {
                'proteins': proteins,
            },
        )

def gene_index(request):
    """
    This is default gene index page
    :param request:
    :return:
    """
    genes = Gene.objects.all()
    return render(
        request,
        'gene_index.html',
        {
            'genes': genes,
        },
    )

def search(request, search_str:str):
    """
    This method lists study/study_types: Default page.
    """
    s = study.search().filter("match", name=search_str)
    for hit in s:
        print(hit)
        print("Study name : {}".format(hit))
    return render(
        request,
        'search.html',
        {
            'results': s,
        },
    )

def squares(request, id:int):
    results = Square.objects.filter(id=id)
    print(results)
    return render(
        request,
        'search.html',
        {
            'results': results,
        },
    )

def polygons(request):
    results = Polygon.objects.all()
    #polygons = deepcopy(Polygon)

    print(results)
    for r in results:
        print(r)
    return render(
        request,
        'search.html',
        {
            'results': results,
        },
    )