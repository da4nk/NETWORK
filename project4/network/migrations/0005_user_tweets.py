# Generated by Django 4.2.4 on 2023-12-20 05:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0004_user_followers_user_following_delete_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='tweets',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_tweets', to='network.post'),
        ),
    ]