from django.contrib.auth import login, logout, authenticate
# from django.contrib.auth.models import User
from back_end.models import User

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
    image_link = user_data.get('url')
    city = user_data.get('city')
    full_name = user_data.get('usual_full_name')
    city = user_data.get('campus')[0].get('city')
    user, created = User.objects.get_or_create(username=username)

    if created:
        user.email = email
        user.image_link = image_link
        user.city = city
        user.full_name = full_name
        user.save()
    # Ensure that the email is updated if the user already exists and it is not set
    if not user.email:
        user.email = email
    if not user.image_link:
        user.image_link = image_link
    if not user.city:
        user.city = city
    if not user.full_name:
        user.full_name = full_name
    user.save()
    login(request, user, settings.BACKEND)
    return


# def user_api_view(request):
    # if request.method == 'POST':
        # Handle your POST request
        # return JsonResponse({'message': 'Success'})

# @csrf_exempt
# def my_view(request):
#     print("Reached my_view!")  # Debugging
#     if request.method == 'POST':
#         return JsonResponse({'message': 'CSRF bypassed!'}, status=200)
#     return JsonResponse({'error': 'Only POST allowed'}, status=400)
# def update_user(request):
#     if request.method == "POST" or "PUT":
#         print("hello")