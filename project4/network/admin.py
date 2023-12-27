from django.contrib import admin
from .models import User, Post


class userAdmin(admin.ModelAdmin):
    list_display = ('id', 'username')

    filter_horizontal = ['following']


# Register your models here.
admin.site.register(User, userAdmin)
admin.site.register(Post)

