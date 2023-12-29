from django.urls import path, include
from django.views.generic import RedirectView, TemplateView
from . import views
from .views import (
     Create_post, Following
    
)





urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('create', Create_post.as_view(), name = "create"),
    path('profile/<str:id>/', views.profile_view, name="profile"),
    path('following/', Following.as_view(), name = "following"),
    # path('follow-profile/<str:id>', Follow_profile.as_view(), name = "profile_follow"),
]
