from django.db import models


class Page(models.Model):
    """
    Represents a CMS page. Each page can have multiple sections.
    """

    title = models.CharField(max_length=200)
    slug = models.CharField(max_length=200, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Section(models.Model):
    """
    Represents a section (block) on a page. Can be text, image, plugin, etc.
    The 'order' field allows drag-and-drop reordering.
    """

    SECTION_TYPES = [
        ("text", "Text"),
        ("image", "Image"),
        ("plugin", "Plugin"),
    ]
    page = models.ForeignKey(Page, related_name="sections", on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=SECTION_TYPES)
    content = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.type} section on {self.page.title}"
