from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.http import JsonResponse

from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

def chat(request, username):
    # Check if the user exists; if not, create a new user
    user, created = User.objects.get_or_create(username=username)
    
    # Fetch all usernames for the user list
    users = User.objects.all().values('username')
    
    return JsonResponse({
        'users': list(users),
        'current_user': username,
        'user_created': created  # To inform the frontend if a new user was created
    })




def chat_room(request, username, recipient_user):
    try:
        # Fetch or create the current user
        current_user = get_object_or_404(User, username=username)
        
        # Check if recipient exists, if not, create the recipient user
        recipient, created = User.objects.get_or_create(username=recipient_user)
        
        # Ensure the user is not trying to chat with themselves
        if current_user == recipient:
            return JsonResponse({'error': "You cannot chat with yourself."}, status=400)
        
        # Get other users for the sidebar (excluding current_user)
        users = User.objects.exclude(username=username).values('username')
        
        # Generate room name (sorted alphabetically for consistency between users)
        room_name = ''.join(sorted([username, recipient_user]))

        return JsonResponse({
            'users': list(users),
            'current_user': username,
            'recipient_user': recipient_user,
            'room_name': room_name,
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)




def room(request, room_name, username):
    return JsonResponse({"room_name": room_name, "username": username})
