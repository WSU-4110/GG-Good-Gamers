from django.db import models
import random
# Create your models here.

class UserFactory:
    def create_user(email = None, screen_name = None, user_name = None, password = None, gender = None, dob = None, is_admin = False, is_banned = False):
        return User(
            UserEmail = email,
            screenName = screen_name or str(random.randint(0,9999999)),
            userName = user_name,
            userPassword = password,
            userGender = gender,
            userDOB = dob,
            isAdmin = is_admin,
            isBanned = is_banned
        )
class PostFactory:
    def create_post(user, comments = None, time_created = None, post_id = None):
        return Post(
            user = user,
            comments = comments,
            likeCount = 0,
            dislikeCount = 0,
            postID = post_id or str(random.randint(0,999999999)),
            created = time_created
        )

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
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   postID = models.IntegerField(unique = True, primary_key = True, default = (random.randint(0,9999999999)))
   created = models.DateTimeField(auto_now_add=True)
   comments = models.CharField(max_length=500, blank=True, null=True)
   likeCount = models.IntegerField(default = 0) 
   dislikeCount = models.IntegerField(default = 0)
   #postURL = models.ImageField(upload_to = "uploads/")
   class Meta:
        ordering = ['user']

   def __str__(self):
       return str(self.postID)
   
   # 7:35 part 5 CBI Analytics