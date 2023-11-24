from typing import Any
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views import View
from django.contrib.auth.decorators import login_required


from .models import User, Post


def index(request):
    posts = Post.objects.all().order_by('-date')
    
    
    return render(request, "network/index.html", 
                  {
                      "post": posts
                  })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


class Create_post(View):
    template_name = "network/index.html"

    @login_required
    def post(self, request):
        post_model = Post()

        post_content = request.POST.get('post_content')
        user = User.objects.filter(username = request.user.username)
        Post.objects.create(user = user, text = post_content)
        return index(request)

class Likes_View(View):
    template_name = 'templates/index.html'
    post = Post.objects.all()
    def post(self, request):
        post = self.post
        post.add()
        


