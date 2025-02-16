from django.urls import path, include
from .views import GoogleLoginView, LoginView

urlpatterns = [
    path("google/", GoogleLoginView.as_view(), name = "google"),
    path("", LoginView.as_view(), name="custom_login")
]