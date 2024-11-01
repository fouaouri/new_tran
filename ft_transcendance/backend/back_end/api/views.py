from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User


@api_view(['GET'])
def getRoute(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes)

def check_login_status(request):
    if request.user.is_authenticated:
        return JsonResponse({'isLoggedIn': True})
    return JsonResponse({'isLoggedIn': False})

def user(request):
    if request.user.is_authenticated:
        return JsonResponse({'username': request.user.username,
                            'email':request.user.email})
    return JsonResponse({'username': '',
                         'email': ''})
    # user = User.objects.get(username=request.user)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print(user.username)
        token['username'] = user.username
        print('--------------')
        print(token['username'])

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer