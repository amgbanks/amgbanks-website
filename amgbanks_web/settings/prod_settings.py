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

ROOT_URLCONF = 'amgbanks_web.urls.prod_urls'

STATICFILES_DIRS = [
        os.path.join('static'),
]

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_DEFAULT_ACL = None
AWS_STORAGE_BUCKET_NAME = 'amgbanks-assets'
AWS_S3_REGION_NAME = 'us-east-2'
AWS_S3_CUSTOM_DOMAIN = 's3.{}.amazonaws.com/{}'.format(AWS_S3_REGION_NAME,AWS_STORAGE_BUCKET_NAME)

AWS_S3_OBJECT_PARAMETERS = {
        'CacheControl': 'max-age=86400',
}

AWS_LOCATION = 'static'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATIC_URL = "https://{}/{}/".format(AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION)

DEFAULT_FILE_STORAGE = 'amgbanks_web.settings.storage_backends.MediaStorage'

EMAIL_HOST = os.getenv('EMAIL_HOST')
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
EMAIL_PORT = os.getenv('EMAIL_PORT')
EMAIL_USE_TLS = True
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_RECIPIENT = os.getenv('EMAIL_RECIPIENT')
