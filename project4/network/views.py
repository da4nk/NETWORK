from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, HttpResponse
from django.urls import reverse
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import User
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
import json
from django.utils.decorators import method_decorator

from django.views.generic import TemplateView

from .models import User, Post
import json




class LoginRequired(LoginRequiredMixin):
    login_url = "/login"
    redirect_field_name = "login"





def index(request):
    posts = Post.objects.all().order_by('-date')


    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    post_limit = paginator.get_page(page_number)
    
    
    return render(request, "network/index.html", 
                  {
                      "post": post_limit,
                      "posts": posts
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
    user_followers = []
    user_model = User.objects.get(id = id).followers.all()
    for i in user_model:
        user_followers.append(i)
    if user_followers:
            return render(request, 'network/profilepage.html', 
                                {
                                    'user_profile': User.objects.get(pk = id),
                                    'profile_post': profile_post,
                                    'user_to_follow_followers': user_followers
                                })
    else:
        return render(request, 'network/profilepage.html', 
                                {
                                    'user_profile': User.objects.get(pk = id),
                                    'profile_post': profile_post,
                                    'user_to_follow_followers': []
                                })


class Following(LoginRequiredMixin, TemplateView):
    template_name = "network/following.html"
    def get_context_data(self, **kwargs):
        
        context = super().get_context_data(**kwargs)
        user_model = User.objects.all().get(id = self.request.user.id).following.all()

        following = []

        for user in user_model:
            following.append(Post.objects.all().filter(user = user))
     
        context['following'] = following
        return context







@method_decorator(csrf_exempt, name='dispatch')
class Follow_profile(View):
       
    def get(self, request, user_id):

        try:
            self.user_to_follow = User.objects.get(id=user_id)

        except User.DoesNotExist:
            return JsonResponse({'Error': 'User not found'}, status=404)
        
        return JsonResponse(self.user_to_follow.serialize())

    
    def put(self, request, user_id):
        self.get(request, user_id)

        current_user = User.objects.get(id = request.user.id)
        data = json.loads(request.body)
        # checks if user is in followers list
        if data.get('followers') is not None and current_user.username in data.get('followers'):
          
            self.user_to_follow.followers.add(current_user)
            self.user_to_follow.save()
            # checks if user is not in followers list
        elif current_user.username not in data.get('followers'):
            self.user_to_follow.followers.remove(current_user)
            self.user_to_follow.save()

        return HttpResponse(status=204)



@method_decorator(csrf_exempt, name='dispatch')
class Api_Post(View):
    
    def get(self, request, post_id):
        post = Post.objects.all().get(id = post_id)
        self.post = post
        if post is None:
            return JsonResponse({"error": "Post not found."}, status=404)

        return JsonResponse(self.post.serialize())
        
    def put(self, request, post_id):
        try:
            self.get(request, post_id)
        except Post.DoesNotExist:
            return JsonResponse({"error": "Post not found."}, status=404)
        
        data = json.loads(request.body)
        
        user = User.objects.get(username = request.user.username)

        if data.get('likes') != None and user.username not in data.get('likes'):
            self.post.likes.remove(user)
            self.post.save()
            return HttpResponse(status=204)
            
                

        else:
            self.post.likes.add(user)
            self.post.save()
        return JsonResponse(self.post.serialize())

        
            

class All_api_post(View):
    def get(self, request):
        try:
            posts = Post.objects.all()
        except Post.DoesNotExist:
            return JsonResponse({'Error': 'Post not found'}, status = 404)

        serialized_posts = [post.serialize() for post in posts]
        return JsonResponse(serialized_posts, safe=False)