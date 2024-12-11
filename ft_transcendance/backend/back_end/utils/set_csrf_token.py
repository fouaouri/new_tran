from django.middleware.csrf import get_token
from django.http import JsonResponse

def set_csrf_token(request):
    get_token(request)  # Ensures the CSRF token is set as a cookie
    return JsonResponse({'detail': 'CSRF cookie set'})

