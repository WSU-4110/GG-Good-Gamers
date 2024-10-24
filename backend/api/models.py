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
    


class UserID(models.Model):
    id = models.IntegerField(unique = True, default = (random.randint(0,9999999)), primary_key = True)
    userEmail = models.EmailField(unique = True, max_length = 99, null = True) 
    class Meta:
        abstract = True
        ordering = ['id']
    def __str__(self):
        return self.id, self.userEmail

class User(UserID):
    #here is where we add attributes for users
    screenName = models.CharField(unique = True, max_length = 20) 
    userName = models.CharField(max_length = 25) 
    userPassword = models.CharField(max_length = 25)
    userGender = models.IntegerField(null = True) # 0 = male, 1 = female
    userDOB = models.DateField(null = True)
    docAcct = models.DateTimeField(auto_now_add = True)
    def __str__(self):
        return self.id, self.screenName
    
class BlacklistedUser(User):
    def __str__(self):
        return self.id, self.userEmail
    
class AdminUser(User):
    def __str__(self):
        return self.id, self.userEmail

class PostInteraction(UserID):
    postID = models.IntegerField(unique = True, default = (random.randint(0,9999999)))
    created = models.DateTimeField(auto_now_add = True)
    comments = models.CharField(max_length = 500, blank = True, null = True)
    likeCount = models.IntegerField(null = True) 
    dislikeCount = models.IntegerField(null = True)
    docPost = models.DateTimeField(auto_now_add = True)
    def __str__(self):
        return self.id, self.postID, self.likeCount, self.dislikeCount
    

#class BlacklistedUser(models.Model):
#    id = models.IntegerField(unique = True) #Primary Key
#    y = models.CharField(max_length = 250)
#    class Meta:
#        ordering = ['id']
#        db_table = "Banned Users"
#    def __str__(self):
#        return self.id, self.y

#class AdminUser(models.Model):
#    id = models.IntegerField(unique = True) #Primary Key
#
#    def __str__(self):
#        return self.id

#class PostInteraction(models.Model):
#    postID = models.IntegerField(unique = True, max_length = 64)
#    created = models.DateTimeField(auto_now_add=True)
#    comments = models.CharField(max_length=500, blank=True, null=True)
#    likeCount = models.IntegerField() 
#    dislikeCount = models.IntegerField()
#    doc = models.DateTimeField(auto_now_add=True)
#
#    def __str__(self):
#        return self.postID, self.likeCount, self.dislikeCount
#    
#    # 7:35 part 5 CBI Analytics