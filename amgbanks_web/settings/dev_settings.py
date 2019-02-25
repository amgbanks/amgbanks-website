from .base_settings import *

DEBUG = True

SECRET_KEY = os.getenv('SECRET_KEY')

ROOT_URLCONF = 'amgbanks_web.urls.dev_urls'

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = (
        os.path.join(BASE_DIR, 'static'),
)

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
