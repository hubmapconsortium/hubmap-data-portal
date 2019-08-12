import matplotlib.cm
import numpy as np
import pandas as pd
from django.contrib.auth.models import AnonymousUser
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views.generic import View

from hubmap import settings


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
    Serves the compiled frontend entry point. Not intended to be reachable
    except in production
    """

    def get(self, request):
        # Might not exist.
        return render(request, 'index.html')


def globus(request):
    uuid = None
    access_token = None
    refresh_token = None
    if not hasattr(request, 'user'):
        request.user = AnonymousUser

    elif request.user.is_authenticated:
        response = HttpResponseRedirect(settings.FRONTEND_URL)
        uuid = request.user.social_auth.get(provider='globus').uid
        social = request.user.social_auth
        access_token = social.get(provider='globus').extra_data['access_token']
        refresh_token = social.get(provider='globus').extra_data['refresh_token']
        response.set_cookie('first_name', request.user.first_name)
        response.set_cookie('last_name', request.user.last_name)
        response.set_cookie('email', request.user.email)
        return response
    return render(
        request,
        'globus.html',
        {
            'uuid': uuid,
            'access_token': access_token,
            'refresh_token': refresh_token,
        },
    )
