from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.conf import settings

def logout_user(request):
    if request.method == "POST":
        logout(request)
        return JsonResponse({"message": "Successfully logged out"}, status=200)
    return JsonResponse({"error": "Invalid request method"}, status=400)

def login_user(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
    if user is not None:
        return JsonResponse({'isLoggedIn': True})
    return JsonResponse({'isLoggedIn': False})


def save_and_login_user(request, user_data):
    username = user_data.get('login')
    email = user_data.get('email')
    user, created = User.objects.get_or_create(username=username)

    if created:
        user.email = email
        user.save()
    # Ensure that the email is updated if the user already exists and it is not set
    if not user.email:
        user.email = email
        user.save()
    login(request, user, settings.BACKEND)
    return
