from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListStudy.as_view()),
    path('<int:pk>/', views.DetailStudy.as_view()),
]