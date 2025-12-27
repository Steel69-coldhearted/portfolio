# pages/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # The empty string '' means this is the root path of the app
    path('', views.home_page_view, name='home'),
]