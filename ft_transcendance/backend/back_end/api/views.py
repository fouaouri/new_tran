from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# from django.contrib.auth.models import User
from back_end.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login

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

# @permission_classes([AllowAny])

# @api_view(['GET', 'POST'])
def user(request):
    if request.user.is_authenticated:
        return JsonResponse({'username': request.user.username,
                            'email':request.user.email,
                            'image_link':'https://cdn.intra.42.fr/users/4426c2b633387be161ba254ca7025f46/fouaouri.JPG',
                            'city':request.user.city,
                            'full_name':request.user.full_name})
    return JsonResponse({'username': '',
                        'email': '',
                        'image_link':'',
                        'city':'',
                        'full_name':''})

@csrf_exempt
def update_user(request):
    if request.method == "POST":
        new_username = request.POST['username']
        if new_username and new_username != request.user.username:
            if User.objects.filter(username=new_username).exists():
                return JsonResponse({'error': 'Username already taken'}, status=404)
    else:
        new_username = request.user.username
    if request.user.is_authenticated:
        print(new_username)
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User not authenticated'}, status = 404)
    request.user.username = new_username
    request.user.save()
    return JsonResponse({'message': 'User updated successfully', 'username': request.user.username})


def users(request):
    users = User.objects.order_by('id').values('id', 'username', 'email')
    # users = User.objects.all().values( 'username', 'email')
    users_list = list(users)  # Convert queryset to a list of dictionaries
    return JsonResponse(users_list, safe=False) 

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