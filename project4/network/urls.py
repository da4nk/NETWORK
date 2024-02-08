from django.urls import path, include
from django.views.generic import RedirectView, TemplateView
from . import views
from .views import (
     Create_post, Following,Follow_profile,Api_Post
    
)





urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('create', Create_post.as_view(), name = "create"),
    path('profile/<str:id>/', views.profile_view, name="profile"),
    path('following/', Following.as_view(), name = "following"),


    # api endpoints __--------
    path('users/<int:user_id>/', Follow_profile.as_view(), name = "profile_follow"),
    path('post/<int:post_id>/', Api_Post.as_view(), name = "api_Post")
]
