from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Plugin
from .serializers import PluginSerializer


class PluginViewSet(viewsets.ModelViewSet):
    queryset = Plugin.objects.all()
    serializer_class = PluginSerializer

    @action(detail=True, methods=["post"])
    def enable(self, request, pk=None):
        plugin = self.get_object()
        plugin.enabled = True
        plugin.save()
        return Response({"status": "enabled"})

    @action(detail=True, methods=["post"])
    def disable(self, request, pk=None):
        plugin = self.get_object()
        plugin.enabled = False
        plugin.save()
        return Response({"status": "disabled"})
        plugin.save()
        return Response({"status": "disabled"})
