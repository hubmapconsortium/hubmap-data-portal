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
from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from rest_framework.authtoken import views
from rest_framework.documentation import include_docs_urls
from rest_framework.schemas import get_schema_view

from dataportal import views as dataportal_views

schema_view = get_schema_view(title=settings.OPENAPI_TITLE)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('dataportal.urls')),
    path('', include('frontend.urls')),
    path('logout/', dataportal_views.logout, name='logout'),
    path('', include('django.contrib.auth.urls')),
    path('loggedin/', dataportal_views.GlobusUserAuth.as_view(), name='loggedin'),
    path(f'{settings.AUTH_URL_PREFIX}/', include('rest_framework_social_oauth2.urls')),
    path('openapi/', schema_view, name='openapi-schema'),
    path('docs/', include_docs_urls(title=settings.OPENAPI_TITLE,
                                    description=settings.OPENAPI_DESCRIPTION)),
    path(
        'swagger-ui/',
        TemplateView.as_view(
            template_name='swagger-ui.html',
            extra_context={'schema_url': 'openapi-schema'}
        ),
        name='swagger-ui',
    ),
    path('api-token-auth/', views.obtain_auth_token),
]
