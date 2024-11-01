
from allauth.socialaccount.providers.oauth2.views import OAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings
from dj_rest_auth.registration.views import APIView
from rest_framework.response import Response
from django.http import HttpResponseRedirect
import json, requests
from django.contrib.auth.decorators import login_required
from back_end.utils.login_logout import save_and_login_user

class Intra42OAuth2Adapter(OAuth2Adapter):
    provider_id = '42intra'
    access_token_url = 'https://api.intra.42.fr/oauth/token'
    authorize_url = 'https://api.intra.42.fr/oauth/authorize'
    profile_url = 'https://api.intra.42.fr/v2/me'  # To get user info after login


class Intra42Login(SocialLoginView):
    adapter_class = Intra42OAuth2Adapter
    client_class = OAuth2Client
    callback_url = settings.REDIRECT_URI

class callback_view(APIView):

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

        headers = {'Authorization': f'Bearer {access_token}'}
        user_response = requests.get(Intra42OAuth2Adapter.profile_url, headers=headers)

        if user_response.status_code != 200:
            return Response({"error": "Failed to fetch user data"}, status=user_response.status_code)


        user_data = user_response.json()

        save_and_login_user(request, user_data)
        return HttpResponseRedirect(f'{settings.FRONTEND_URL}/?login_success=True')


# @login_required
