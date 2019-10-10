from django.conf import settings
from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.FrontendAppView.as_view(), name='index'),
    path(settings.LOGIN_REDIRECT_URL.lstrip('/'), views.set_user_cookie, name='set-user-cookie'),
    path('logout/', views.logout, name='logout'),
    path('portal/', include('portal.urls')),
]
