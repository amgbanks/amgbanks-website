from django import forms
from .models import Photo

class PhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = (
            'location',
            'full_image',
            'thumb_image',
            'lazy_image',
            'display_size',
        )
