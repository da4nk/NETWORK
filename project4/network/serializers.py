from rest_framework import serializers
from .models import Post, User
 

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'following', 'followers']



class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta: 
        model = Post
        fields = '__all__'

