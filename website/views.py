from django.shortcuts import render
from .models import Post

# Create your views here.

def home_page(request):

    welcome_post = Post.objects.filter(page_location='HM').order_by('-date_created').first()

    d = {
        'welcome' : welcome_post,
        }
    return render(request, 'website/home.html', d)
