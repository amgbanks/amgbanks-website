from django.db import models
from django.utils import timezone

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
