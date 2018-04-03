from rest_framework import serializers
from faq.models import FaqList


class FaqListSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaqList
        fields = ('title', 'text','group')
