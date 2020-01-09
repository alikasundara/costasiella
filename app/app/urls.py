"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from graphene_django.views import GraphQLView
from graphql_jwt.decorators import jwt_cookie

## Development only
from django.conf import settings
from django.conf.urls.static import static

from costasiella.views import *


urlpatterns = [
    # path('', login_required(TemplateView.as_view(template_name="backend.html")), name="home"),
    # path('', TemplateView.as_view(template_name="backend.html"), name="home"),
    path('accounts/', include('allauth.urls')),
    path('email/verified/', TemplateView.as_view(template_name="email_verfied.html"), name="email_verified"),
    path('document/terms-and-conditions', terms_and_conditions, name="terms_and_conditions"),
    path('document/privacy-policy', privacy_policy, name="privacy_policy"),
    path('export/invoice/pdf/<str:node_id>', invoice_pdf, name="export_invoice_pdf"),
    path('export/invoice/pdf/preview/<str:node_id>', invoice_pdf_preview, name="export_invoice_pdf_preview"),
    path('admin/', admin.site.urls),
    path('graphql/', csrf_exempt(jwt_cookie(GraphQLView.as_view(graphiql=True))), name="graphql"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # Development only
