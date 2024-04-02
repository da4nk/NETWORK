from django.contrib.auth.models import AbstractUser
from django.db import models
import datetime
from django.core import serializers


class User(AbstractUser):
    following = models.ManyToManyField("self", related_name="followers", symmetrical=False,  blank=True)
    def count_following(self):
        return self.following.count()

    def count_followers(self):
        return self.followers.count()
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'following': [followers.username for followers in self.following.all()],
            'following_id': [followers.id for followers in self.following.all()],
            'followers': [following.username for following in self.followers.all()],
            'follower_count': self.count_followers()      
            }


class Post(models.Model):
    user = models.ForeignKey(User, related_name="user_post", on_delete = models.CASCADE)
    text = models.TextField(max_length=300)
    date = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(User, related_name="post")
    def count_likes(self):
        return self.likes.count()
    def serialize(self):
        return {
            'postid': self.id,
            'user': self.user.username,
            'text': self.text,
            'date': self.date,
            'likes': [post.username for post in self.likes.all()],
            'user_id': self.user.id,
            'like_count': self.count_likes()
        }

