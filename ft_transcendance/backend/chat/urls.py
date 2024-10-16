from django.urls import path
from . import views
from . import consumers

urlpatterns = [

    path('', views.opening_page, name='opening_page'), 
    path('first/', views.first_page, name='first_page'),  
    path('data/', views.data_page, name='data_page'),  
    path('home/', views.home_page, name='home_page'), 
    path('game/', views.game_page, name='game_page'),
    path('mobile/', views.mobile_page, name='mobile_page'),
    path('tournoi/', views.tournoi_page, name='tournoi_page'),
    path('setting/', views.setting_page, name='setting_page'),
    path('choose_game/', views.choose_game_page, name='choose_game_page'),
    path('choose_ai/', views.choose_ai_page, name='choose_ai_page'),
    path('chat/username=<str:username>/', views.chat, name='chat'),
    path('chat/username=<str:username>/recipient_user=<str:recipient_user>/', views.chat_room, name='chat_room'),
    path("chat/<str:room_name>/username=<str:username>/", views.room, name="room"),
]
