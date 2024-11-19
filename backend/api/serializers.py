from rest_framework import serializers
from .models import Lounge, Post, Comment, User

class LoungeSerializer(serializers.ModelSerializer):
    sorted_posts = serializers.SerializerMethodField()

    def get_sorted_posts(self, obj):
        sort_by = self.context.get("request").query_params.get("sort_by", "newest")
        return obj.get_sorted_posts(sort_by)

    class Meta:
        model = Lounge
        fields = ['id', 'name', 'description', 'created_at', 'owner', 'sorted_posts']


class PostSerializer(serializers.ModelSerializer):
    sorted_comments = serializers.SerializerMethodField()

    def get_sorted_comments(self, obj):
        sort_by = self.context.get("request").query_params.get("sort_by", "newest")
        return obj.get_sorted_comments(sort_by)

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_at', 'author', 'sorted_comments']


class CommentSerializer(serializers.ModelSerializer):
    sorted_replies = serializers.SerializerMethodField()

    def get_sorted_replies(self, obj):
        sort_by = self.context.get("request").query_params.get("sort_by", "newest")
        return obj.get_sorted_replies(sort_by)

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_at', 'author', 'parent_comment', 'sorted_replies']


class UserSerializer(serializers.ModelSerializer):
    liked_posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    disliked_posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    liked_comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    disliked_comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    created_posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    created_comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    sorted_posts = serializers.SerializerMethodField()
    sorted_comments = serializers.SerializerMethodField()

    def get_sorted_posts(self, obj):
        sort_by = self.context.get("request").query_params.get("sort_by", "newest")
        return obj.get_sorted_posts(sort_by)

    def get_sorted_comments(self, obj):
        sort_by = self.context.get("request").query_params.get("sort_by", "newest")
        return obj.get_sorted_comments(sort_by)

    class Meta:
        model = User
        fields = [
            'id', 'userEmail', 'screenName', 'userName', 'userPassword',
            'liked_posts', 'disliked_posts', 'liked_comments', 'disliked_comments',
            'created_posts', 'created_comments', 'sorted_posts', 'sorted_comments'
        ]
