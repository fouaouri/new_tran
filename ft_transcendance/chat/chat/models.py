from django.db import models
from datetime import datetime
from django.contrib.auth.models import User  # Import the User model

# Create your models here.
class Room(models.Model):
    name = models.CharField(max_length=1000)
class Message(models.Model):
    value = models.CharField(max_length=1000000)
    date = models.DateTimeField(default=datetime.now, blank=True)
    user = models.CharField(max_length=1000000)
    room = models.CharField(max_length=1000000)



class BlockedUser(models.Model):
    blocker = models.ForeignKey(User, related_name='blocking', on_delete=models.CASCADE)
    blocked_user = models.ForeignKey(User, related_name='blocked', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.blocker} has blocked {self.blocked_user}"
