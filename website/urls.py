from django.urls import path, re_path
from . import views

urlpatterns = [
        path('', views.home_page, name='home'),
        path('gallery/', views.gallery, name='gallery'),
        path('photo_upload/', views.photo_upload, name='photo_upload'),
        path('contact/', views.contact_submission, name='contact'),
        
]
