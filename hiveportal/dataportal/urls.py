from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^study/$', views.index, name='index'),
    url(r'^globus$', views.globus, name='globus'),
]
