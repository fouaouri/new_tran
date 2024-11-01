from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('chat/username=<str:username>/', views.chat, name='chat'),
    path('chat/username=<str:username>/recipient_user=<str:recipient_user>/', views.chat_room, name='chat_room'),
    path("chat/<str:room_name>/username=<str:username>/", views.room, name="room"),  
]
