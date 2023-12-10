from rest_framework import serializers
from .models import Profile, Post, User
 

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email']

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta: 
        model = Post
        fields = '__all__'

