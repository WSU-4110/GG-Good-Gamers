from django.db import models
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
    screenName = models.CharField(unique = True, max_length = 20) 
    userEmail = models.EmailField(unique = True, max_length = 64) 
    userName = models.CharField(max_length = 30) 
    userPassword = models.CharField(max_length=25)
    userGender = models.IntegerField() # 0 = male, 1 = female
    userDOB = models.DateField()
    userID = models.IntegerField(unique = True) #Primary Key

    def __str__(self):
        return self.screenName, self.userID

class BlacklistedUser(models.Model):
    userID = models.IntegerField() #Primary Key

    def __str__(self):
        return self.userID

class AdminUser(models.Model):
    userID = models.IntegerField() #Primary Key

    def __str__(self):
        return self.userID

class PostInteraction(models.Model):
    userID = models.IntegerField() #Primary Key
    postID = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    comments = models.CharField(max_length=500, blank=True, null=True)
    likeCount = models.IntegerField() 
    dislikeCount = models.IntegerField()

    def __str__(self):
        return self.postID, self.likeCount, self.dislikeCount
    
    # 7:35 part 5 CBI Analytics