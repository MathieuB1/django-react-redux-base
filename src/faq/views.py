import os

from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View
from knox.auth import TokenAuthentication
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from faq.models import FaqList
from faq.serializers import FaqListSerializer

class FaqDataView(GenericAPIView):
    """Render main page."""

    def get(self, request):
        """Return html for main application page."""

        queryset = FaqList.objects.all()
        serializer = FaqListSerializer(queryset, many=True)

        data = {
        'data': serializer.data
        }

        return Response(data, status=status.HTTP_200_OK)
