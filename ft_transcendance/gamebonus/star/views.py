from django.shortcuts import render

# Create your views here.

def game_view(request):
    return render(request, 'star/index.html')
