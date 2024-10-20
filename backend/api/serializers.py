from rest_framework import serializers
from .models import *

class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('name', 'start_date', 'end_date', 'comments', 'status')

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('userEmail', 'userName', 'screenName', 'userPassword', 'userGender', 'userDOB')