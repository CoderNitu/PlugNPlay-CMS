from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PluginViewSet

router = DefaultRouter()
router.register(r'plugins', PluginViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

