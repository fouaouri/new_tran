from django.urls import path
from . import views

urlpatterns = [
    path('chat/<str:username>/', views.chat, name='chat'),
    path('chat/<str:username>/<str:recipient_user>/', views.chat_room, name='chat_room'),
    path('chat/<str:room_name>/<str:username>/', views.room, name='room'),
]
