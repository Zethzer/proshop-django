from django.urls import path

from ..views import product_views as views

urlpatterns = [
    path('', views.get_products, name='products'),
    path('create/', views.create_product, name='create_product'),
    path('upload/', views.upload_image, name='image_upload'),
    path('top/', views.get_top_products, name='top_products'),
    path('<str:pk>/reviews/', views.create_product_review, name='create_review'),
    path('<str:pk>', views.get_product, name='product'),
    path('update/<str:pk>/', views.update_product, name='update_product'),
    path('delete/<str:pk>/', views.delete_product, name='delete_product'),
]
