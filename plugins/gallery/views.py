from rest_framework import viewsets

from .models import GalleryImage
from .serializers import GalleryImageSerializer


class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
