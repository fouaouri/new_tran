from django.urls import path
from back_end.api.views import *



from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', getRoute),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('check-authentication/', check_login_status, name='check_login_status'),
    path('user/', user, name='user'),
    path('users/', users, name='users'),
]