from django.shortcuts import render
from django.contrib.auth import authenticate
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import update_last_login

# Create your views here.
class GoogleLoginView(SocialLoginView):
    authentication_classes = [] # disable authentication
    adapter_class = GoogleOAuth2Adapter
    callback_url = 'https://localhost:3000' # frontend url
    client_class = OAuth2Client

class LoginView(APIView):
    def post(self, req):
        username = req.data.get('username')
        email = req.data.get('email')
        password = req.data.get('password')

        if not username or not email:
            return Response({"error": "Username and email is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, email=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            update_last_login(None, user)

            return Response({
                "id": user.userId,
                "username": user.username,
                "email": user.email,
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh)
            },
            status=status.HTTP_200_OK
            )

        return Response({
            "error": "Invalid credentials"
        }, status=status.HTTP_401_UNAUTHORIZED)