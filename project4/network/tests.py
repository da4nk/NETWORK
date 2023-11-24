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

        post1 = Post.objects.create(user=user, text="i like watermelon and waffles")

    def test_validpost_page(self):
        c = Client()
        response = c.post("/create")
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, ('/'), status_code=302)
    def test_index_page(self):
        c = Client()
        user = User.objects.get(password = "password")
        if user:
            c.login(username = "tyrone", password = "password")
            post1 = Post.objects.get(user = user)
            response = c.post("/", data= {"post": f"{post1}"})
            self.assertEqual(response.status_code, 200)


if __name__ == "__main__":
    unittest.main()
