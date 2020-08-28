from django.urls import path
from auth_api.api import LoginView, LogoutView

urlpatterns = [
  path(
    'login',
    LoginView.as_view(),
    name = 'auth_api_login'
  ),

  path(
    'logout',
    LogoutView.as_view(),
    name = 'auth_api_logout'
  )
]
