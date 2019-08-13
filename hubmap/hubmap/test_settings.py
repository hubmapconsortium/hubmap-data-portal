"""
Settings for testing under Travis CI. Notably, connect to a local database
instead of one provided by `docker-compose`.
"""

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'hubmap_db',
        'USER': 'postgres',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    },
}
