from django.urls import path
from ..views import user_views as views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.get_users, name='users'),
    path('profile/', views.get_user_profile, name='user_profile'),
    path('profile/update', views.update_user_profile, name='user_profile_update'),
]
