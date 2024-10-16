from django.shortcuts import render, get_object_or_404
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login
from django.contrib import messages
from django.contrib.auth.models import User


# first pages////////////////////////////////////////////////////////////////////////////
def opening_page(request):
    return render(request, 'openning.html')  


def first_page(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            auth_login(request, user)
            return redirect('data_page')  
        else:
            return render(request, 'first_page.html', {'error': 'Invalid username or password.'})

    return render(request, 'first_page.html')  

def data_page(request):
    # if request.user.is_authenticated:
        username = request.user.username
        # email = request.user.email  
        return render(request, 'data_page.html', {'username': username, 'email': email})
    # else:
    #     return redirect('first_page')  
 

def home_page(request):
    if request.user.is_authenticated:
        username = request.user.username
        return render(request, 'Home_page.html', {'username': username})  
    else:
        return redirect('first_page')

def game_page(request):
    if request.user.is_authenticated:
        username = request.user.username
        return render(request, 'Game_page.html', {'username': username})  

def tournoi_page(request):
    if request.user.is_authenticated:
        username = request.user.username
        return render(request, 'Tournoi_page.html', {'username': username})  

def setting_page(request):
     if request.user.is_authenticated:
        username = request.user.username
        return render(request, 'Setting_page.html', {'username': username})  

def mobile_page(request):
    if request.user.is_authenticated:
        username = request.user.username
        return render(request, 'Mobile.html', {'username': username})

def mobile_page(request):
    if request.user.is_authenticated:
        username = request.user.username
        return render(request, 'Mobile.html', {'username': username})

def choose_game_page(request):
    if request.user.is_authenticated:
        username = request.user.username
        return render(request, 'ChooseGame.html', {'username': username}) 

def choose_ai_page(request):
    if request.user.is_authenticated:
        username = request.user.username
        return render(request, 'Choose_Ai.html', {'username': username})
# ///////////////////////////////////////////////////////////////////////////////////////////////////







# /////////////////////////////CHAT PART/////////////////////////////////////////
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
# ///////////////////////////////////////////////////////////////////////////////////////////////////