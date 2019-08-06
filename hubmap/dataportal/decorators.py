from django.core.exceptions import PermissionDenied
from .models import *
from django.contrib.auth.models import *


def user_has_experiment_view_permissions(function):
    def wrap(request, *args, **kwargs):
        experiments = Study.objects.all()
        user = User.objects.get(request.user)
        if user.groups.get(permissions__group__name__exact='dataportal_admin') 
        for experiment in experiments:
            if experiment.creation_time == request.user:
                return function(request, *args, **kwargs)
            else:
                raise PermissionDenied

    wrap.__doc__ = function.__doc__
    wrap.__name__ = function.__name__
    return wrap
