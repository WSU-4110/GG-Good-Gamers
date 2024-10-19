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
<<<<<<< HEAD
    userEmail = models.CharField(max_length = 64)#Primary Key
    username = models.CharField(max_length = 30)
    screenName = models.CharField(max_length = 20)
    userPassword = models.CharField(max_length=25)
    userGender = models.IntegerField() # 0 = male, 1 = female
    userDOB = models.IntegerField()
    postID = models.IntegerField()
=======
    screenName = models.CharField(unique=True, max_length = 20)
    userEmail = models.EmailField(max_length = 64)
    userName = models.CharField(max_length = 30)
    userPassword = models.CharField(max_length=25)
    userGender = models.IntegerField() # 0 = male, 1 = female
    userDOB = models.DateField()
>>>>>>> 9fcb783c1fa17af71d4ec086f2dcbe63495055c8

class BlacklistedUser(models.Model):
    screenName = models.CharField(max_length = 20)
    userEmail = models.CharField(max_length = 64)#Primary Key

<<<<<<< HEAD
class admin(models.Model):
    userEmail = models.CharField(max_length = 64)#Primary Key
=======
class AdminUser(models.Model):
    userEmail = models.CharField(max_length = 64)
>>>>>>> 9fcb783c1fa17af71d4ec086f2dcbe63495055c8
    userName = models.CharField(max_length = 30)
    screenName = models.CharField(max_length = 20)

class postInteraction(models.Model):
    postID = models.IntegerField() #Primary Key
    likeNum = models.IntegerField()
    dislikeNum = models.IntegerField()
    comment = models.CharField(max_length = 120)
