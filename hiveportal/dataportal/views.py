from operator import attrgetter
from django.shortcuts import render
from django.views.decorators.csrf import requires_csrf_token

from .studies2csv import *
from .search import StudySearch
from .documents import *
from .forms import model_form_mapping, StudyTypeForm
from .models import *
from elasticsearch_dsl import Search, Q, AttrDict
'''bokeh imports'''
from bokeh.plotting import figure, output_file, show
from bokeh.embed import components
from bokeh.models import ColumnDataSource, FactorRange, HoverTool
from bokeh.palettes import Category10
import pandas as pd
import calendar
from bokeh.transform import factor_cmap
from django.forms import IntegerField
"""Developer: Matt Ruffalo
   Developer modifying prototype: Sushma Anand Akoju"""

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

def year_month_to_date_label(year: int, month: int) -> str:
    # I don't really like using complicated expressions in f-strings
    return '{}, {}.'.format(year, calendar.month_abbr[month])

def row_to_year_month_label(row: pd.Series) -> str:
    """
    :param df: Must have numeric values 'year' and 'month'
    :return: String composed of concatenating the year and month abbreviation
    """
    return year_month_to_date_label(row.year, row.month)

def index(request):
    """
    This method lists study/study_types: Default page.
    """
    study_list = []
    for model in StudyTypes:
        study_list.extend(model.objects.all())
    sorted_studies = sorted(study_list, key=attrgetter('id'))

    dts = [study.creation_time for study in sorted_studies]
    tissues = [study.tissue.name for study in sorted_studies]
    types = [study.subclass.model_class().__name__ for study in sorted_studies]

    df = pd.DataFrame(
        {
            'creation_time': dts,
            'tissue': tissues,
            'data_type': types,
        },
        index=[study.id for study in sorted_studies],
    )

    # TODO: clean up all of this, it's horrible,
    #   and precompute/store results instead of recalculating every time

    counts_for_range = df['creation_time'].groupby(
        [
            df.creation_time.dt.year.rename('year'),
            df.creation_time.dt.month.rename('month'),
        ],
    ).agg('count')

    # Get first and last valid index
    new_counts = pd.Series(index=pd.MultiIndex.from_product(counts_for_range.index.levels), dtype=float)
    new_counts.loc[counts_for_range.index] = counts_for_range
    first_idx = new_counts.first_valid_index()
    last_idx = new_counts.last_valid_index()

    # Now redo by tissue
    counts = df['creation_time'].groupby(
        [
            df.creation_time.dt.year.rename('year'),
            df.creation_time.dt.month.rename('month'),
            df.tissue,
        ],
    ).agg('count')

    unstacked = counts.unstack()

    new_counts = pd.DataFrame(
        index=pd.MultiIndex.from_product(unstacked.index.levels),
        columns=unstacked.columns,
        dtype=float,
    )
    new_counts.loc[unstacked.index] = unstacked
    new_counts.index.names = unstacked.index.names
    # With leading and trailing NaNs gone, coerce missing values to 0, convert to int
    new_counts = new_counts.loc[first_idx:last_idx].fillna(0).astype(int)

    # Bokeh wants data to be in columns, not the index
    year_month_df = new_counts.index.to_frame()
    new_counts.loc[:, 'date'] = year_month_df.apply(row_to_year_month_label, axis=1)

    source = ColumnDataSource(new_counts)
    hubmap_hover  = HoverTool(
        tooltips='$name: @$name',
        point_policy="follow_mouse")

    p = figure(
        x_range=FactorRange(factors=new_counts.loc[:, 'date']),
        plot_height=250,
        title="Study Counts by Month",
        toolbar_location=None,
        tools="hover",
        tooltips='$name: @$name',
    )

    unique_tissues = sorted(set(tissues))
    tissue_count = len(unique_tissues)
    if tissue_count < 3:
        tissue_count=3
    tissue_colors = Category10[tissue_count]

    p.vbar_stack(
        unique_tissues,
        x='date',
        width=0.1,
        source=source,
        line_color="white",
        # use the palette to colormap based on the the x[1:2] values
        color=tissue_colors,
        legend=[x for x in unique_tissues]
    )

    p.y_range.start = 0
    p.x_range.range_padding = 0.1
    p.xaxis.major_label_orientation = 1
    p.xgrid.grid_line_color = None
    p.legend.location = "top_left"
    p.legend.orientation = "horizontal"
    bokeh_script, bokeh_div = components(p)

    return render(
        request,
        'study_index.html',
        {
            'study_list': sorted_studies,
            'bokeh_div': bokeh_div,
            'bokeh_script': bokeh_script,
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

@requires_csrf_token
def search(request):
    """
    This method lists study/study_types: Default page.
    """
    if request.method== 'POST':
        query = request.POST.get("index-search")
        s = elastic_search(query)

        return render(
            request,
            'search.html',
            {
                'results': s,
                'query': query,
            },
        )
    else:
        return render(
            request,
            'search.html',
            {
                'results': "",
            },
        )

def elastic_search(name=""):

    q = Q("bool", should = [ Q("match", name=name)], minimum_should_match=1)
    s = Search(using=client, index="studies").query(q)[0:20]
    response = s.execute()
    search = get_hits(response)

    return search

def elastic_search(query_str=""):

    q1 = Q("multi_match", query=query_str)
    q2 = Q("match", query=query_str)
    q3 = Q("term", query=query_str)
    q4 = Q("term", name=query_str)
    q5 = Q("term", hugo_symbol="studies with "+query_str)
    s = Search(using=client, index="studies").query(q1|q2|q3|q4|q5)[0:20]
    response = s.execute()
    search = get_hits(response)
    # print(search_response)
    # get_agg_response(search_response)
    return search

# def get_agg_response(serach_response=""):
#     for aggresponse in search_response.aggregations:
#        print(aggresponse)

def get_hits(response):
    hits = []
    for hit in response:
        print(hit)
        p = []
        if getattr(hit, "id", "NONE") != "NONE":
            hit_tuple = StudyDocument.get(hit.id, using=client, index="studies")
                #Study.objects.get(id=hit.id).get_subclass_object()
        elif getattr(hit, "meta", "NONE") != "NONE":
            hit_tuple = StudyDocument.get(hit.meta.id, using=client, index="studies")
        hits.append(hit_tuple)
        print(p)
    return hits

def getcsv(request):
    return export_to_csv(request)

def dash(request):
    """
    This is default landing page.
    """
    return render(request, 'dash.html')

def raphael(request):
    """
    This is default landing page.
    """
    return render(request, 'raphael.html')

def d3(request):
    """
    This is default landing page.
    """
    return render(request, 'd3.html')