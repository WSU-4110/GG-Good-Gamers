from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('project', ProjectViewset, basename='project')
router.register('user', UserViewset, basename='user')
router.register('post', PostViewset, basename = 'post')
urlpatterns = router.urls

urlpatterns = [
    path('', include(router.urls))
]