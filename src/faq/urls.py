from django.conf.urls import url

from faq import views as faq_views

urlpatterns = [
    url(r'',
        faq_views.FaqDataView.as_view(),
        name='faq')
]
