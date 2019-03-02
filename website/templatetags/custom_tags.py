from django import template
register = template.Library()

from django.http import HttpResponseRedirect

from ..forms import ContactForm

@register.inclusion_tag('website/contact.html')
def contact(request):
    contact_form = ContactForm()

    d = {
            'contact':contact_form,
    }
    return d
