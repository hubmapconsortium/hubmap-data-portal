from django.core.management.utils import get_random_secret_key
from pathlib import Path

print('Loading production settings')

# TODO: figure out how to store this securely while sharing containers;
#   this doesn't scale when running this app across multiple containers
SECRET_KEY = get_random_secret_key()

DEBUG = False

ALLOWED_HOSTS = [
    'data.dev.hubmapconsortium.org',
    'data.test.hubmapconsortium.org',
    'demo1.hubmapconsortium.org',
]
AUTH_URL_PREFIX = 'auth'
DEFAULT_SOCIAL_AUTH_PROVIDER = 'globus'
LOGIN_URL = f'/{AUTH_URL_PREFIX}/login/{DEFAULT_SOCIAL_AUTH_PROVIDER}/'
LOGIN_REDIRECT_URL = f'/'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'hubmap_db',
        'USER': 'hubmap_login',
        'PASSWORD': 'SFz0C96otU0i6Cgy3BP3tE7n5SEgt2Dj',
        'HOST': 'postgres',
        'PORT': '',
    }
}

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

STATIC_ROOT = Path('/opt/hubmap-data-portal/static')

# change the following keys/client_id, from Globus App configuration
# Configure here: https://developers.globus.org
SOCIAL_AUTH_GLOBUS_KEY = '12518f0d-4594-4632-8c4c-a6839024d238'
SOCIAL_AUTH_GLOBUS_SECRET = 'gEfGGE09nMMjwZxWafL+2/M3UqcGl9czSL72H+O1xuU='
SOCIAL_AUTH_GLOBUS_AUTH_EXTRA_ARGUMENTS = {
    'access_type': 'offline',
}
