from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoungeViewSet, PostViewSet, CommentViewSet, UserViewSet

router = DefaultRouter()
router.register(r'lounges', LoungeViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
