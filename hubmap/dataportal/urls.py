from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import path

from . import views

admin.autodiscover()
# first we define the serializers


urlpatterns = [
    path('', views.StudyListView.as_view()),
    path('experiments/', views.StudyListPageView.as_view()),
    path('<int:pk>/', views.StudyDetailView.as_view()),
    path('search/', views.GlobalSearch.as_view(), name="search"),
    path('colors/', views.Tissue_svg_colors.as_view(), name="colors"),
    path('genes/', views.GeneListView.as_view(), name="genes"),
    path('protected/', login_required(views.StudyListView.as_view())),
]
