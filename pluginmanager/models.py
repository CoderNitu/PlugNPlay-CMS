from django.db import models


class Plugin(models.Model):
    name = models.CharField(max_length=100, unique=True)
    enabled = models.BooleanField(default=True)

    def __str__(self):
        return self.name

