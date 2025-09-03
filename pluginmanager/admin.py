from django.contrib import admin

from .models import Plugin


@admin.register(Plugin)
class PluginAdmin(admin.ModelAdmin):
    list_display = ("name", "enabled")
    list_editable = ("enabled",)
    list_display = ("name", "enabled")
    list_editable = ("enabled",)
