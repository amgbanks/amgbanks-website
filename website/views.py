from django.shortcuts import render, redirect
from .models import Post, Photo
from .forms import PhotoForm
from django.contrib.auth.decorators import login_required

# Create your views here.

def home_page(request):

    welcome_post = Post.objects.filter(page_location='HM').order_by('-date_created').first()

    d = {
        'welcome' : welcome_post,
    }
    return render(request, 'website/home.html', d)

def gallery(request):
    photos = Photo.objects.order_by('?')

    d = {
        'photos' : photos
    }
    return render(request, 'website/gallery.html', d)

@login_required
def photo_upload(request):
    if request.method == 'POST':
        form = PhotoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('gallery')
    else:
            form = PhotoForm()
    return render(request, 'website/photo_upload.html', {'form':form})
