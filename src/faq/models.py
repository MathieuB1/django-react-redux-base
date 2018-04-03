from django.db import models


class FaqList(models.Model):
    # Attributes Class
    created = models.DateTimeField(auto_now_add=True)
    group = models.CharField(max_length=250, blank=True)
    title = models.CharField(max_length=250, blank=True)
    text = models.TextField(default='')

    class Meta:
        ordering = ('created',)

    def save(self, *args, **kwargs):
        # Create and save the validated object
        super(FaqList, self).save(*args, **kwargs)