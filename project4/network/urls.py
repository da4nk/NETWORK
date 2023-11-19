
from django.urls import path, include
from django.views.generic import RedirectView, TemplateView

from . import views
from .views import (
    Likes_View, Create_post
)

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('liked/str<post_id>', Likes_View.as_view(), name = "likes" ),
    path('create', Create_post.as_view(), name = "create")
]
