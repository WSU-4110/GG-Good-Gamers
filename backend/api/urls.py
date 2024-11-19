from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('project', ProjectViewset, basename='project')
router.register('user', UserViewset, basename='user')
router.register('post', PostViewset, basename = 'post')

urlpatterns = [
     path('', include(router.urls)),
     path('upload/', views.upload_image, name = "upload_image")
]
