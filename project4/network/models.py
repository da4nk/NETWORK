from django.contrib.auth.models import AbstractUser
from django.db import models
import datetime


class User(AbstractUser):
    liked_post = models.ManyToManyField("Post", related_name="liked_users", blank=True)

class Post(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "profile")
    text = models.TextField(max_length=300)
    date = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(User, related_name="post")
    def sort(self):
        return self.Post.order_by("date")

