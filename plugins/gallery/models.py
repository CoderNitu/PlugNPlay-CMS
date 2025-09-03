from django.db import models


class GalleryImage(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to="gallery/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
