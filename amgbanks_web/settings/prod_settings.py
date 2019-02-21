from .base_settings import *

DEBUG = False

SECRET_KEY = os.getenv('SECRET_KEY')

ALLOWED_HOSTS = [
        'www.amgbanks.com',
        'amgbanks.herokuapp.com',
]

PROD_APPS = [
        'storages',
]

INSTALLED_APPS += PROD_APPS

AWS_STORAGE_BUCKET_NAME = 'amgbanks-assets'
AWS_S3_CUSTOM_DOMAIN = '{}.s3.amazonaws.com'.format(AWS_STORAGE_BUCKET_NAME)
AWS_S3_OBJECT_PARAMETERS = {
        'CacheControl': 'max-age=86400',
}

AWS_LOCATION = 'static'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATIC_URL = "https://{}/{}/".format(AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION)

DEFAULT_FILE_STORAGE = 'amgbanks_web.storage_backends.MediaStorage'
