from django.contrib import admin

from . import models

# Register your models here.

admin.site.register(models.Institution)
admin.site.register(models.Gene)
admin.site.register(models.Protein)
admin.site.register(models.DataType)
admin.site.register(models.Tissue)
fields = ['image_tag']
readonly_fields = ['image_tag']

for study_type in models.StudyTypes:
    admin.site.register(study_type)
