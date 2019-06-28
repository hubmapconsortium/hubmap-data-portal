from os import fspath
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
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': fspath(BASE_DIR / 'db.sqlite3'),
    }
}

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
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
]

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
}

ROOT_URLCONF = 'hubmap.urls'

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
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

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
    git_version = '[unknown version]'

    path = Path(__file__).parent

    try:
        proc = run(GIT_VERSION_COMMAND, cwd=str(path), stdout=PIPE, check=True)
        git_version = proc.stdout.decode('utf-8').strip()
    except Exception as e:
        # don't care too much; this is best-effort
        pass

    return git_version

GIT_VERSION = get_git_version()

# Keep this as the last section of this file!
try:
    from .local_settings import *
except ImportError:
    pass
# This must be run after loading local_settings
CORS_ORIGIN_WHITELIST.extend(f'https://{host}' for host in ALLOWED_HOSTS)
# Do not add anything after this
