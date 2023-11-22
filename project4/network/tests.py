import unittest
from urllib import response
from django.test import TestCase, Client
from .models import Post, User
import datetime
# Create your tests here.
class NetworkTestCase(TestCase):
    def setUp(self):
        # Post table
        user = User.objects.create(username="tyrone", password="password")

        post1 = Post.objects.create(user = user, text = "i like watermelon and waffles", date = datetime.date )
    def test_validpost_page(self):
        c = Client()
        user = User.objects.get(password = "password")
        post1 = Post.objects.get(user = user)
        c.post("/create", data=f"{post1.pk}")
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, ('/'), status_code=302)

