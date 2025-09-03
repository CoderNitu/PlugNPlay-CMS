from rest_framework import viewsets

from .models import BlogPost
from .serializers import BlogPostSerializer


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by("-published_at")
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.all().order_by("-published_at")
    serializer_class = BlogPostSerializer
