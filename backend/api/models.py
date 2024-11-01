from django.db import models
from django.db.models import Count


# Define Sorting Decorators as Internal Classes for sorting functionality
class BaseSorter:
    def __init__(self, queryset):
        self.queryset = queryset

    def sort(self):
        return self.queryset


class MostLovedSorter(BaseSorter):
    def sort(self):
        return self.queryset.annotate(num_likes=Count('liked_users')).order_by('-num_likes')


class MostHatedSorter(BaseSorter):
    def sort(self):
        return self.queryset.annotate(num_dislikes=Count('disliked_users')).order_by('-num_dislikes')


class NewestSorter(BaseSorter):
    def sort(self):
        return self.queryset.order_by('-created_at')


class OldestSorter(BaseSorter):
    def sort(self):
        return self.queryset.order_by('created_at')


class MostInteractedSorter(BaseSorter):
    def sort(self):
        return self.queryset.annotate(interaction_count=Count('liked_users') + Count('disliked_users')).order_by('-interaction_count')


class LovedSorter(BaseSorter):
    def sort(self):
        return self.queryset.annotate(love_score=Count('liked_users') - Count('disliked_users')).order_by('-love_score')


class HatedSorter(BaseSorter):
    def sort(self):
        return self.queryset.annotate(hate_score=Count('disliked_users') - Count('liked_users')).order_by('-hate_score')


# Updated User Model with Liked/Disliked Arrays and Sorting Functions for Posts and Comments
class User(models.Model):
    id = models.IntegerField(unique=True, primary_key=True)
    userEmail = models.EmailField(max_length=99, null=True, unique=True)
    screenName = models.CharField(unique=True, max_length=20)
    userName = models.CharField(max_length=25, null=True)
    userPassword = models.CharField(max_length=25, null=True)

    # Arrays for liked/disliked posts and comments
    liked_posts = models.ManyToManyField('Post', related_name='liked_by_users', blank=True)
    disliked_posts = models.ManyToManyField('Post', related_name='disliked_by_users', blank=True)
    liked_comments = models.ManyToManyField('Comment', related_name='liked_by_users', blank=True)
    disliked_comments = models.ManyToManyField('Comment', related_name='disliked_by_users', blank=True)

    # Arrays for posts and comments created by the user
    created_posts = models.ManyToManyField('Post', related_name='created_by_user', blank=True)
    created_comments = models.ManyToManyField('Comment', related_name='created_by_user', blank=True)

    # Sorting functions for posts created by the user
    def get_sorted_posts(self, sort_by="newest"):
        queryset = self.created_posts.all()
        sorter_map = {
            "most_loved": MostLovedSorter,
            "most_hated": MostHatedSorter,
            "newest": NewestSorter,
            "oldest": OldestSorter,
            "most_interacted": MostInteractedSorter,
            "loved": LovedSorter,
            "hated": HatedSorter
        }
        sorter = sorter_map.get(sort_by, NewestSorter)(queryset)
        return sorter.sort().values_list('id', flat=True)

    # Sorting functions for comments created by the user
    def get_sorted_comments(self, sort_by="newest"):
        queryset = self.created_comments.all()
        sorter_map = {
            "most_loved": MostLovedSorter,
            "most_hated": MostHatedSorter,
            "newest": NewestSorter,
            "oldest": OldestSorter,
            "most_interacted": MostInteractedSorter,
            "loved": LovedSorter,
            "hated": HatedSorter
        }
        sorter = sorter_map.get(sort_by, NewestSorter)(queryset)
        return sorter.sort().values_list('id', flat=True)

    def __str__(self):
        return self.screenName


class Lounge(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lounges')
    posts = models.ManyToManyField('Post', related_name='posted_in_lounges', blank=True)

    def get_sorted_posts(self, sort_by="newest"):
        queryset = self.posts.all()
        sorter_map = {
            "most_loved": MostLovedSorter,
            "most_hated": MostHatedSorter,
            "newest": NewestSorter,
            "oldest": OldestSorter,
            "most_interacted": MostInteractedSorter,
            "loved": LovedSorter,
            "hated": HatedSorter
        }
        sorter = sorter_map.get(sort_by, NewestSorter)(queryset)
        return sorter.sort().values_list('id', flat=True)

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    comments = models.ManyToManyField('Comment', related_name='post_comments', blank=True)
    liked_users = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    disliked_users = models.ManyToManyField(User, related_name='disliked_posts', blank=True)

    def get_sorted_comments(self, sort_by="newest"):
        queryset = self.comments.all()
        sorter_map = {
            "most_loved": MostLovedSorter,
            "most_hated": MostHatedSorter,
            "newest": NewestSorter,
            "oldest": OldestSorter,
            "most_interacted": MostInteractedSorter,
            "loved": LovedSorter,
            "hated": HatedSorter
        }
        sorter = sorter_map.get(sort_by, NewestSorter)(queryset)
        return sorter.sort().values_list('id', flat=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    lounge = models.ForeignKey(Lounge, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    liked_users = models.ManyToManyField(User, related_name='liked_comments', blank=True)
    disliked_users = models.ManyToManyField(User, related_name='disliked_comments', blank=True)

    def get_sorted_replies(self, sort_by="newest"):
        queryset = self.replies.all()
        sorter_map = {
            "most_loved": MostLovedSorter,
            "most_hated": MostHatedSorter,
            "newest": NewestSorter,
            "oldest": OldestSorter,
            "most_interacted": MostInteractedSorter,
            "loved": LovedSorter,
            "hated": HatedSorter
        }
        sorter = sorter_map.get(sort_by, NewestSorter)(queryset)
        return sorter.sort().values_list('id', flat=True)

    def __str__(self):
        return f"Comment by {self.author} on {self.lounge or 'Post'}"
