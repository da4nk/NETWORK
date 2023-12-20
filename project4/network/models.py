from django.contrib.auth.models import AbstractUser
from django.db import models
import datetime


class User(AbstractUser):
    following = models.ManyToManyField("self", related_name="following_set", symmetrical=False,  blank=True)
    followers = models.ManyToManyField('self', related_name="followers_set", symmetrical=False, blank=True)
    def count_following(self):
        return self.following.count()

    def count_followers(self):
        return self.followers.count()


class Post(models.Model):

    user = models.ForeignKey(User, related_name="user_post", on_delete = models.CASCADE)
    text = models.TextField(max_length=300)
    date = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(User, related_name="post")
    def count_likes(self):
        return self.likes.count()


