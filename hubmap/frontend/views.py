import matplotlib.cm
import numpy as np
import pandas as pd
from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.views import auth_logout
from django.core.exceptions import PermissionDenied
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views.generic import View


def rgba_float_to_rgb_hex(floats):
    return '#' + ''.join('{:02x}'.format(int(c * 255)) for c in floats[:3])


def tissue_svg(request):
    # These match the Django template fields in `human_body.svg`
    organs = [
        'stomach',
        'liver',
        'lung',
        'small_intestine',
        'heart',
        'bladder',
        'large_intestine',
        'kidney',
    ]

    vec = pd.Series(np.random.random(len(organs)), index=organs)
    hex_values = {
        f'{tissue}_color': rgba_float_to_rgb_hex(matplotlib.cm.viridis(expr))
        for tissue, expr in vec.items()
    }
    return render(
        request,
        'human_body.svg',
        hex_values,
        content_type='image/svg+xml',
    )


class FrontendAppView(View):
    """
    Serves the compiled frontend entry point. In production, the index.html
    template referenced here is the result of the React app build. In development,
    just show a link that says "you probably want to look at the React dev server
    instead."
    """
    def get(self, request):
        return render(request, 'index.html')


def set_user_cookie(request):
    if not hasattr(request, 'user'):
        request.user = AnonymousUser

    elif request.user.is_authenticated:
        response = HttpResponseRedirect(settings.FRONTEND_URL)
        response.set_cookie('first_name', request.user.first_name)
        response.set_cookie('last_name', request.user.last_name)
        response.set_cookie('email', request.user.email)
        return response

    raise PermissionDenied('Must be logged in to set cookies')


def logout(request):
    if request.user.is_authenticated:
        auth_logout(request)
    response = HttpResponseRedirect(settings.LOGOUT_REDIRECT_URL)
    response.delete_cookie('first_name')
    response.delete_cookie('last_name')
    response.delete_cookie('email')
    return response
