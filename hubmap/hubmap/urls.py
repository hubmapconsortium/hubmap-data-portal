"""hubmap URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from django.views.generic import TemplateView
from rest_framework.authtoken import views
from dataportal import views as dataportal_views
# Create a router and register our viewsets with it.
API_TITLE = 'HuBMAP UI-backend API'
API_DESCRIPTION = 'A Web API for viewing HuBMAP Consortium experiments data.'
schema_view = get_schema_view(title=API_TITLE)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('dataportal.urls')),
    path('', dataportal_views.globus, name='globus'),
    path('', include('frontend.urls')),
    url(r'', include('django.contrib.auth.urls')),
    url(r'', include('social_django.urls', namespace='social')),
    url(r'^openapi/$', schema_view,name='openapi-schema'),
    url(r'^docs/', include_docs_urls(title=API_TITLE, description=API_DESCRIPTION)),
    path(
        'swagger-ui/',
        TemplateView.as_view(
            template_name='swagger-ui.html',
            extra_context={'schema_url': 'openapi-schema'}
        ),
        name='swagger-ui',
    ),
    url(r'^api-token-auth/', views.obtain_auth_token)
]