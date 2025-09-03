from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import GalleryImageViewSet

router = DefaultRouter()
router.register(r'images', GalleryImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

