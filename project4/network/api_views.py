from .models import Post, User
from .serializers import UserSerializer,  PostSerializer
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer  

