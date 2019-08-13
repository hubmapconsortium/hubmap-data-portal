import logging
from pathlib import Path

import matplotlib.cm
import numpy as np
import pandas as pd
from django.contrib.auth.models import AnonymousUser
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.template import engines
from django.views.generic import View, TemplateView

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
    index_file_path = Path(settings.REACT_APP_DIR, 'build', 'index.html')

    def get(self, request):
        # Might not exist.
        # try:
        #     with open(self.index_file_path) as f:
        #         return  HttpResponse(f.read());
        # except FileNotFoundError:
        #     logging.exception('Production build for React App not found')
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


def catchall_dev(request, upstream=settings.FRONTEND_URL):
    upstream_url = upstream + request.path
    response = request.get(upstream_url)
    content = engines['django'].from_string(response.text).render()
    return HttpResponse(content)


catchall_prod = TemplateView.as_view(template_name='index.html')
#catchall = catchall_dev if settings.DEBUG else catchall_prod
