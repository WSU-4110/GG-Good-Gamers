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
    class Meta:
        ordering = ['docAcct']

    def __str__(self):
        return self.userEmail
    
class Post(models.Model):
   user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
   postID = models.BigAutoField(primary_key = True)
   userName = models.CharField(max_length= 25, null = True)
   postDescription = models.CharField(max_length=2000, null=True)
   postContent = models.CharField(max_length=500, null=True)
   created = models.DateTimeField(auto_now_add=True)
   comments = models.CharField(max_length=500, blank=True, null=True)
   likeCount = models.IntegerField(default = 0) 
   userPfp = models.CharField(max_length=500, null=True)
   #postURL = models.ImageField(upload_to = "uploads/")
   class Meta:
        ordering = ['user']

   def __str__(self):
       return str(self.postID)
   
   # 7:35 part 5 CBI Analytics