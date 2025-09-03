from rest_framework import serializers

from .models import Page, Section


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ["id", "type", "content", "order", "created_at", "updated_at"]


class PageSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = Page
        fields = ["id", "title", "slug", "created_at", "updated_at", "sections"]
        model = Page
        fields = ["id", "title", "slug", "created_at", "updated_at", "sections"]
