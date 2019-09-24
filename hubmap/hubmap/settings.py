import json
from pathlib import Path
from subprocess import PIPE, run

# Build paths inside the project like this: BASE_DIR / ...
BASE_DIR = Path(__file__).absolute().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# !!! for development, overridden in `production_settings.py` by Docker container build

SECRET_KEY = '**53v-%94cnsh08+l(@+)^5$@*u=xsrps!o4k4_r+lnfhjwsh5'

DEBUG = True

ALLOWED_HOSTS = []

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'hubmap_db',
        'USER': 'hubmap_login',
        'PASSWORD': 'dev_password',
        'HOST': 'postgres',
        'PORT': '',
    },
}

NEO4J_URL = 'bolt://neo4j:7687'
MONGODB_HOST = 'mongodb'
ELASTICSEARCH_HOSTS = [{'host': 'elasticsearch', 'port': 9200}]

# Location of the React app. Overriden to '/' for production
FRONTEND_URL = 'http://localhost:3000/'

# for test globus app configuration
SOCIAL_AUTH_GLOBUS_KEY = '12518f0d-4594-4632-8c4c-a6839024d238'
SOCIAL_AUTH_GLOBUS_SECRET = 'gEfGGE09nMMjwZxWafL+2/M3UqcGl9czSL72H+O1xuU='

# /!!! for development, overridden in `production_settings.py` by Docker container build

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'dataportal',
    'frontend',
    'django_filters',
    'rest_framework.authtoken',
    'social_django',
    'oauth2_provider',
    'rest_framework_social_oauth2',
]

MIDDLEWARE = [
    'django.middleware.gzip.GZipMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware',
]

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
]

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.NamespaceVersioning',
    'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.AllowAny',),
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'rest_framework_social_oauth2.authentication.SocialAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
}

ROOT_URLCONF = 'hubmap.urls'
REACT_APP_DIR = BASE_DIR / 'frontend'
AUTH_URL_PREFIX = 'auth'
DEFAULT_SOCIAL_AUTH_PROVIDER = 'globus'
LOGIN_URL = f'/{AUTH_URL_PREFIX}/login/{DEFAULT_SOCIAL_AUTH_PROVIDER}/'
LOGIN_REDIRECT_URL = '/loggedin/'

OPENAPI_TITLE = 'HuBMAP UI-backend API'
OPENAPI_DESCRIPTION = 'A Web API for viewing HuBMAP Consortium experiments data.'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Authentication, including Globus SSO
AUTHENTICATION_BACKENDS = [
    'social_core.backends.globus.GlobusOpenIdConnect',
    'django.contrib.auth.backends.ModelBackend',
    'rest_framework_social_oauth2.backends.DjangoOAuth2',
]

SOCIAL_AUTH_POSTGRES_JSONFIELD = True
SOCIAL_AUTH_GLOBUS_AUTH_EXTRA_ARGUMENTS = {
    'access_type': 'offline',
}

WSGI_APPLICATION = 'hubmap.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static/'

# TODO: deduplicate between this and `build_docker_container.py`. That script intended
#  to be very barebones and only use things in the Python standard library.
GIT_VERSION_COMMAND = [
    'git',
    'describe',
    '--dirty',
]


def get_git_version() -> str:
    """
    Obtains the Git version of the application. Actual output from `git describe`
    is preferred, but this will not be available in production since we're not
    including Git in the Docker container.

    Try to read the file generated by `build_docker_container.py`, then try to
    run `git describe`. If both fail, return a fallback version.
    :return:
    """

    git_version = '[unknown version]'

    path = Path(__file__).parent.parent

    git_version_file = path / 'frontend/src/git-version.json'
    try:
        with open(git_version_file) as f:
            git_version = json.load(f)['version']
    except Exception:
        # Development version, maybe
        pass

    try:
        proc = run(GIT_VERSION_COMMAND, cwd=str(path), stdout=PIPE, check=True)
        git_version = proc.stdout.decode('utf-8').strip()
    except Exception:
        # maybe running in production; don't care
        pass

    return git_version


GIT_VERSION = get_git_version()

# Keep this as the last section of this file!
try:
    from .local_settings import *  # noqa F401 ("imported but unused")
except ImportError:
    pass
# Sometimes we do need to define settings in terms of other settings, so
# this is a good place to do so, after override settings are loaded.
# Shouldn't define any constants after this though
CORS_ORIGIN_WHITELIST.extend(f'https://{host}' for host in ALLOWED_HOSTS)
LOGOUT_REDIRECT_URL = FRONTEND_URL
# Do not add anything after this
