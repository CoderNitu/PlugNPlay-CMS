from rest_framework import serializers

from .models import Plugin


class PluginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plugin
        fields = ["id", "name", "enabled"]
        model = Plugin
        fields = ["id", "name", "enabled"]
