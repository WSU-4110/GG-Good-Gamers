from django.db import models
# Create your models here.
class User(models.Model):
    #here is where we add attributes for users
    userEmail = models.CharField(max_length = 64)#Primary Key
    username = models.CharField(max_length = 30)
    screenName = models.CharField(max_length = 20)
    userPassword = models.CharField(max_length=25)
    userGender = models.IntegerField() # 0 = male, 1 = female
    userDOB = models.IntegerField()
    postID = models.IntegerField()

class blacklist(models.Model):
    screenName = models.CharField(max_length = 20)
    userEmail = models.CharField(max_length = 64)#Primary Key

class admin(models.Model):
    userEmail = models.CharField(max_length = 64)#Primary Key
    userName = models.CharField(max_length = 30)
    screenName = models.CharField(max_length = 20)

class postInteraction(models.Model):
    postID = models.IntegerField() #Primary Key
    likeNum = models.IntegerField()
    dislikeNum = models.IntegerField()
    comment = models.CharField(max_length = 120)
