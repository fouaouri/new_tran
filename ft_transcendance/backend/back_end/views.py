from django.shortcuts import render ,redirect
import requests , json, os
from allauth.socialaccount.providers.oauth2.views import OAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from allauth.socialaccount.views import SocialLoginView
from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings
from dj_rest_auth.registration.views import APIView
from rest_framework.response import Response
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.http import JsonResponse , HttpResponse
import json
from django.contrib.auth.decorators import login_required

# def check_login_status(request):
#     print(f"User: {request.user}")
#     print(f"Is authenticated: {request.user.is_authenticated}")
#     if request.user.is_authenticated:
#         return JsonResponse({'is_logged_in': True})
#     else:
#         return JsonResponse({'is_logged_in': False})

class Intra42OAuth2Adapter(OAuth2Adapter):
    provider_id = '42intra'
    access_token_url = 'https://api.intra.42.fr/oauth/token'
    authorize_url = 'https://api.intra.42.fr/oauth/authorize'
    profile_url = 'https://api.intra.42.fr/v2/me'  # To get user info after login


class Intra42Login(SocialLoginView):
    adapter_class = Intra42OAuth2Adapter
    client_class = OAuth2Client
    callback_url = settings.REDIRECT_URI

def sign_up(request):
        return render(request, 'login.html')


# @login_required
class callback_view(APIView):
    settings.REFRESH_TOKEN = None
    def get(self, request):
        code = request.query_params.get('code')
        if not code:
            return Response({"error": "Authorization code not provided"}, status=400)

        token_url = 'https://api.intra.42.fr/oauth/token'
        token_data = {
            'grant_type': 'authorization_code',
            'client_id': settings.FORTY_TWO_CLIENT_ID,
            'client_secret': settings.FORTY_TWO_CLIENT_SECRET,
            'code': code,
            'redirect_uri': settings.REDIRECT_URI,
        }
        token_response = requests.post(token_url, data=token_data)

        if token_response.status_code == 401:
            return Response({"error": "Access token expired or invalid. Please authenticate again."}, status=401)
        if token_response.status_code != 200:
            return Response({"error": "Failed to obtain access token"}, status=token_response.status_code)

        access_token = token_response.json().get('access_token')
        settings.REFRESH_TOKEN = token_response.json().get('access_token')

        # Use the access token to get user data
        headers = {'Authorization': f'Bearer {access_token}'}
        user_response = requests.get(Intra42OAuth2Adapter.profile_url, headers=headers)

        if user_response.status_code != 200:
            return Response({"error": "Failed to fetch user data"}, status=user_response.status_code)


        user_data = user_response.json()
        
        username = user_data.get('login')  # Assume 'login' is the unique field

        user, created = User.objects.get_or_create(username=username)

        if created:
            user.email = user_data.get('email') 
            user.save()

        backend = 'social_core.backends.intra.IntraOAuth2'
        login(request, user, backend=backend)


        json_file_path = os.path.join(settings.BASE_DIR, 'user_data.json')  
        

        if os.path.exists(json_file_path):
            try:
                with open(json_file_path, 'r') as json_file:
                    existing_data = json.load(json_file)
                    if not isinstance(existing_data, list):
                        print("Warning: JSON root is not a list. Resetting to an empty list.")
                        existing_data = []
            except json.JSONDecodeError:
                print("Error decoding JSON. Starting with empty list.")
                existing_data = []
        else:
            existing_data = []

        if not isinstance(user_data, dict):
            print(f"Error: user_data is not a dictionary. Type: {type(user_data)}")
            print(f"Content: {user_data}")
            return 

        user_id = user_data.get('id')
        if user_id is None:
            print("Error: User data does not contain 'id' field.")
            return 

        user_exists = False
        for i, user in enumerate(existing_data):
            if user.get('id') == user_id:
                existing_data[i] = user_data  
                user_exists = True
                break

        if not user_exists:
            existing_data.append(user_data)

        try:
            with open(json_file_path, 'w') as json_file:
                json.dump(existing_data, json_file, indent=2)
            print(f"Successfully updated {json_file_path}")
        except Exception as e:
            print(f"Error writing to JSON file: {str(e)}")
            return

        return JsonResponse({'isLoggedIn': True})

def token(callback_view):
    data = {
        "refresh_token" : 'NSMCscs4UyksUeB3VqyI7qoTjsF9rJn7'
    }
    return JsonResponse(data)

# from django.http import JsonResponse
# from django.contrib.auth.decorators import login_required

# @login_required
# def check_login(request):
#     return JsonResponse({'isLoggedIn': True})

# # For users who are not logged in, return a false response
# def check_login_status(request):
#     if request.user.is_authenticated:
#         return JsonResponse({'isLoggedIn': True})
#     else:
#         return JsonResponse({'isLoggedIn': False})

