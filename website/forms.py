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

class ContactForm(forms.Form):
    your_name = forms.CharField(
            required=True,
            min_length=2,
            max_length=75,
            error_messages={
                'invalid':'test',
                'required':'Test',
            },
    )
    your_email = forms.EmailField(
            required=True,
            max_length=75,
    )
    subject = forms.CharField(
            required=True,
            min_length=5,
            max_length=50,
    )
    message = forms.CharField(
            widget=forms.Textarea(
                attrs={'placeholder':"Minimum 100 characters...\n\nWant to connect? Send me a message!"},
            ),
            required=True,
            min_length=100,
            max_length=3000,
    )
