from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import User
from django.core.paginator import Paginator
from django.views.generic import ListView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json






from .models import User, Post

class LoginRequired(LoginRequiredMixin):
    login_url = "/login"
    redirect_field_name = "login"





def index(request):
    posts = Post.objects.all().order_by('-date')
    # limits to 10 posts per page
    paginator = Paginator(posts, 10)
    # gets which links to show pages
    page_number = request.GET.get('page')
    # puts posts into variable but only at a limit
    post_limit = paginator.get_page(page_number)
    
    return render(request, "network/index.html", 
                  {
                      "post": post_limit
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
    template_name = "templates/index.html"

    
    def post(self, request):
        post_model = Post.objects.all()
        user = User.objects.get(username=request.user.username)

        post_content = request.POST.get('post_content')
        
        post_model.create(user = user, text = post_content)
        return HttpResponseRedirect('/')
        
def profile_view(request, id):

    profile_post = Post.objects.all().filter(user = id)
    
    
    return render(request, 'network/profilepage.html', 
                  {
                    'user_profile': User.objects.get(pk = id),
                    'profile_post': profile_post
                  })
class Following(LoginRequiredMixin, ListView):
    model = Post
    template_name = "network/following.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user_model = User.objects.all()
        print(user_model[2].followers)
        # context['following'] = Post.objects.all().filter(user= user_model)
        return context

    
def Follow_profile(request, user_id):
    try:
        user_to_follow = User.objects.get(id = user_id)
    except User.DoesNotExist:
        return JsonResponse({'Error': 'User not found'}, status = 404)
    if request.method == "GET":
        return JsonResponse(user_to_follow.serialize())



        




