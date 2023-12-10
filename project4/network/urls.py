from django.urls import path, include
from django.views.generic import RedirectView, TemplateView
from . import api_views
from . import views
from .views import (
     Create_post,
    Profile_view
)
from rest_framework import routers



router = routers.DefaultRouter()
router.register(r'users', api_views.UserViewSet)
router.register(r'api_profile', api_views.ProfileViewSet)
router.register(r'api_post', api_views.PostViewSet)



urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('create', Create_post.as_view(), name = "create"),
    path('profile/<int:id>/', Profile_view.as_view(), name="profile"),
    # path('profile/int<post_id>', )
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))


]
urlpatterns += router.urls
