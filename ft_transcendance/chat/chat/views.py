from django.shortcuts import render, get_object_or_404
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login
from django.contrib import messages
from django.contrib.auth.models import User

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            auth_login(request, user)
            return redirect(f'/chat/username={username}/')  # Redirect with the username in the URL
        else:
            messages.error(request, 'Invalid username or password')
            return redirect('login')
    return render(request, 'login.html')

def chat(request, username):
    users = User.objects.all()  # Get all users
    return render(request, 'chat.html', {'users': users, 'current_user': username})



def chat_room(request, username, recipient_user):
    # Validate users
    current_user = get_object_or_404(User, username=username)
    recipient = get_object_or_404(User, username=recipient_user)

    if current_user == recipient:
        return render(request, 'error.html', {'error': "You cannot chat with yourself."})

    # Get other users for the sidebar
    users = User.objects.exclude(username=username)

    # Generate room name
    room_name = ''.join(sorted([username, recipient_user]))

    context = {
        'users': users,
        'current_user': username,
        'recipient_user': recipient_user,
        'roomname': room_name,
    }

    return render(request, 'chat.html', context)

def room(request, room_name, username):
    return render(request, "chat.html", {"room_name": room_name, "username": username})
