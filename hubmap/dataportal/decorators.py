from django.core.exceptions import PermissionDenied
from django.core.exceptions import *

from dataportal import views
from .models import *
from django.contrib.auth.models import *


def user_has_view_permissions(function):
    def wrap(request, *args, **kwargs):
        print(request)
        if hasattr(request, "user") :
            user = User.objects.get(request.user)
            if user.groups.get(permissions__group__name__exact='dataportal_admin') | \
                    user.groups.get(permissions__group__name__exact='dataportal_db_admin') :#request.user.get_credentials('globus' is None):
                return function(request, *args, **kwargs)
            else:
                print("user exists")
                raise PermissionDenied
        else:
            print("user does not exists", request)
            raise PermissionDenied

    wrap.__doc__ = function.__doc__
    wrap.__name__ = function.__name__
    return wrap


