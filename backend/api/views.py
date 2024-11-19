from rest_framework import viewsets
from .models import Lounge, Post, Comment, User
from .serializers import LoungeSerializer, PostSerializer, CommentSerializer, UserSerializer

class LoungeViewSet(viewsets.ModelViewSet):
    queryset = Lounge.objects.all()
    serializer_class = LoungeSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
