"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path , include
from back_end.views import *
# from back_end.views import check_login_status
from chat.views import *
# from back_end.views import Home, check_login_status


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', sign_up),

    # path('', include('chat.urls')),
    # path('json/', jsonn),
    path('token/', token),
    path('api/', include('back_end.api.urls')),
    # path('check-authentication/', check_login_status, name='check_login_status'),
    path('accounts/', include('allauth.urls')),  # Include all allauth URLs
    path('accounts/42intra/login/', Intra42Login.as_view(), name='intra42_login'),
    path('accounts/42intra/login/callback/', callback_view.as_view(), name='intra42_callback'),  # Add this line
    # path('login/', check_login_status),
    # path('/accounts/42intra/users', call)
    # path

    # path('auth/social/42intra/register/', RegisterTokenView.as_view(), name='intra42_register'),
    # path('auth/social/42intra/redirect/', RedirectToIntra42.as_view(), name='intra42_redirect'),
]
