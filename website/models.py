from django.db import models
from django.utils import timezone

from PIL import Image

# Create your models here.

class Post(models.Model):

    title = models.CharField(max_length=200)
    text = models.TextField()
    date_created = models.DateTimeField(default=timezone.now)

    HOME = 'HM'
    ABOUT = 'AB'
    RESUME = 'RE'
    PHOTOGRAPHY = 'PH'
    CONTACT = 'CN'

    PAGE_LOCATIONS = (
            (HOME, 'Home'),
            (ABOUT, 'About'),
            (RESUME, 'Resume'),
            (PHOTOGRAPHY, 'Photography'),
            (CONTACT, 'Contact'),
    )
    page_location = models.CharField(
            max_length=2,
            choices=PAGE_LOCATIONS,
            default=ABOUT
    )

    def __str__(self):
        return self.page_location + "_" + self.date_created.strftime("%Y%m%d-%H%M%S")



def upload_path(instance, filename):
    return 'gallery/{}/{}'.format(instance.location,filename)

class Photo(models.Model):
    location = models.CharField(max_length=255, blank=True)
    full_image = models.ImageField(upload_to=upload_path)
    thumb_image = models.ImageField(upload_to=upload_path)
    lazy_image = models.ImageField(upload_to=upload_path)
    date_uploaded = models.DateTimeField(default=timezone.now)

    SMALL = 'small'
    MEDIUM = 'medium'
    LARGE = 'large'
    FULL = 'full'
    DISPLAY_SIZES = (
        (SMALL, 'Small'),
        (MEDIUM, 'Medium'),
        (LARGE, 'Large'),
        (FULL, 'Full'),
    )
    display_size = models.CharField(
        max_length=6,
        choices=DISPLAY_SIZES,
        default=MEDIUM,
    )

    def __str__(self):
        return self.location
