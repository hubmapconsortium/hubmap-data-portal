import json
from pathlib import Path

print('Loading production settings')

SECRET_PATH = Path('/opt/secret')

DEBUG = False

# Static secret key is required
with open(SECRET_PATH / 'django_secret_key.txt') as f:
    SECRET_KEY = f.read().strip()

SOCIAL_AUTH_GLOBUS_KEY = ''
SOCIAL_AUTH_GLOBUS_SECRET = ''

try:
    with open(SECRET_PATH / 'globus.json') as f:
        globus_secrets = json.load(f)
        SOCIAL_AUTH_GLOBUS_KEY = globus_secrets['key']
        SOCIAL_AUTH_GLOBUS_SECRET = globus_secrets['secret']
except FileNotFoundError:
    # TODO: decide how critical this should be, and log this instead of printing
    print('No Globus secret data found')

ALLOWED_HOSTS = [
    'data.dev.hubmapconsortium.org',
    'data.test.hubmapconsortium.org',
    'demo1.hubmapconsortium.org',
]

FRONTEND_URL = '/'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'hubmap_db',
        'USER': 'hubmap_login',
        'PASSWORD': 'SFz0C96otU0i6Cgy3BP3tE7n5SEgt2Dj',
        'HOST': 'postgres',
        'PORT': '',
    },
}

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

STATIC_ROOT = Path('/opt/hubmap-data-portal/static')
