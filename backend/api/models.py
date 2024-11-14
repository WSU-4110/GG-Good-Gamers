from django.db import models
import random

# Create your models here.

class Project(models.Model):
    name = models.CharField(unique=True, max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    comments = models.CharField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class User(models.Model):
    #here is where we add attributes for users
    id = models.IntegerField(unique = True, default = (random.randint(0,9999999999)), primary_key = True)
    userEmail = models.EmailField(max_length = 99, null = True, unique = True)
    screenName = models.CharField(unique = True, max_length = 20, default = (random.randint(0,9999999))) 
    userName = models.CharField(max_length = 25, null = True) 
    userPassword = models.CharField(max_length = 25, null = True)
    userGender = models.IntegerField(null = True) # 0 = male, 1 = female
    userDOB = models.DateField(null = True)
    docAcct = models.DateTimeField(auto_now_add = True)
    isAdmin = models.BooleanField(default = False)
    isBanned = models.BooleanField(default = False)
    followList = models.CharField(max_length = 999, null = True, unique = True)
    class Meta:
        ordering = ['docAcct']

    def __str__(self):
        return self.userEmail
    
class Post(models.Model):
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   postID = models.IntegerField(unique = True, primary_key = True, default = (random.randint(0,9999999999)))
   created = models.DateTimeField(auto_now_add=True)
   comments = models.CharField(max_length=500, blank=True, null=True)
   likeCount = models.IntegerField(default = 0) 
   dislikeCount = models.IntegerField(default = 0)
   postURL = models.ImageField(upload_to = "uploads/", default = 'uploads/default.jpg')
   class Meta:
        ordering = ['user']

   def __str__(self):
       return str(self.postID)
   
   # 7:35 part 5 CBI Analytics

class Messaging(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "user")
    sender = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "sender")
    receiver = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "receiver")

    message = models.CharField(max_length = 250, null = True, blank = True )
    dtSent = models.DateTimeField(auto_now_add = True)

    class Meta:
        ordering = ['dtSent']
        verbose_name_plural = "Message"
    def __str__(self):
        return f"{self.sender} - {self.receiver}"
    
    @property
    def sender_profile(self):
        sender_profile = Post.objects.get(user = self.sender)
        return sender_profile
    @property
    def receiver_profile(self):
        receiver_profile = Post.objects.get(user = self.receiver)

