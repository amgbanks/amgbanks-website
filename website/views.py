from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.core.mail import send_mail, BadHeaderError

from .models import Post, Photo
from .forms import PhotoForm, ContactForm

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

def contact_submission(request):
    if request.POST:
        form = ContactForm(request.POST)
        if form.is_valid():

            name = form.cleaned_data['your_name']
            from_email = form.cleaned_data['your_email']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']

            try:
                send_mail(
                        subject,
                        'From: {}\nSender\'s Email: {}\n\n\n{}'.format(
                            name,
                            from_email,
                            message
                        ),
                        settings.EMAIL_HOST_USER,
                        [settings.EMAIL_RECIPIENT],
                        fail_silently = False
                )
            except BadHeaderError:
                err_mes = 'Bad header found.'
                d = {'submission-error':err_mes}
                return JsonResponse(d)
            except:
                err_mes = 'Something went wrong! Please check your connection and try again.'
                d = {'submission-error':err_mes}
                return JsonResponse(d)
            return JsonResponse({'success':True})
        else:
            return JsonResponse({'validation-error':form.errors})
    return HttpResponse("Hello from feedback!")
