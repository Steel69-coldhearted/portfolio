from django.shortcuts import render


def home_page_view(request):
    # This tells Django to look for the consolidated index.html template
    return render(request, 'pages/index.html')
