from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('all/', views.listall, name='listall'),
    path('browse/<entity_type>/<int:hubmap_id>', views.details, name='details'),
    path('browse/<entity_type>', views.entities, name='entities'),
    path('help', views.help, name='help')
]
