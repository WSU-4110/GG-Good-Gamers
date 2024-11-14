from django.contrib import admin
from .models import *
    
# Register your models here.

class MessagingAdmin(admin.ModelAdmin):
    list_display = ['sender', 'receiver', 'message']

admin.site.register(Project)
admin.site.register(User)
admin.site.register(Post)
admin.site.register(Messaging, MessagingAdmin)
