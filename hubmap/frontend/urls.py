from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.FrontendAppView.as_view(), name='index'),
    path('login/', views.globus, name='globus'),
    #re_path(r'', views.catchall)

]
