from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PageViewSet, SectionViewSet, PageSectionsView

router = DefaultRouter()
router.register(r'pages', PageViewSet)
router.register(r'sections', SectionViewSet)

urlpatterns = [
	path('pages/<int:pk>/sections/', PageSectionsView.as_view(), name='page-sections'),
    path('', include(router.urls)),
]

