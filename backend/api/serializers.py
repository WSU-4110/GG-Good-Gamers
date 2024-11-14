from rest_framework import serializers
from .models import *

class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('name', 'start_date', 'end_date', 'comments', 'status')

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'userEmail', 'userName', 'screenName', 'userPassword', 'userGender', 'userDOB', 'docAcct', 'isAdmin', 'isBanned')

class PostSerializer(serializers.ModelSerializer):
    user_serial = serializers.RelatedField(source = 'user', read_only = True)
    class Meta:
        model = Post
        fields = ('user_serial', 'userName', 'postDescription', 'postContent', 'postID', 'created', 'comments', 'likeCount', 'userPfp') 



