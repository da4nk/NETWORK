from django.contrib.auth.models import AbstractUser
from django.db import models
import datetime


class User(AbstractUser):
    liked_post = models.ManyToManyField('Post', related_name="liked_users", blank=True)
    posts = models.ForeignKey('Post', related_name="user_posts", blank = True)
    following = models.ManyToManyField("self", related_name="followers", symmetrical=False, blank=True)
    


class Post(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    text = models.TextField(max_length=300)
    date = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(User, related_name="post")
    def count_likes(self):
        return self.likes.count()



