import unittest
from urllib import response
from django.test import TestCase, Client
from .models import Post, User
import datetime
# Create your tests here.
class NetworkTestCase(TestCase):
    def setUp(self):
        # Post table
        user = User.objects.create(username="david malan", password="password", following = "admin", followers = 'admin')


  
    def test_index_page(self):
        c = Client()
        user = User.objects.get(password = "password")
        
        c.login(username = "tyrone", password = "password")
        response = c.post("/")
        self.assertEqual(response.status_code, 200)

    
    

if __name__ == "__main__":
    unittest.main()
