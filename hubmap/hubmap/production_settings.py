print('Loading production settings')

# TODO: figure out how to store this securely while sharing containers;
#   this doesn't scale when running this app across multiple containers
from django.core.management.utils import get_random_secret_key
SECRET_KEY = get_random_secret_key()

DEBUG = False

ALLOWED_HOSTS = [
    'demo1.hubmapconsortium.org',
]

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
