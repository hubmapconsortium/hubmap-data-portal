from django.contrib import admin

from . import models

# Register your models here.

admin.site.register(models.Institution)
admin.site.register(models.Gene)
admin.site.register(models.Protein)
admin.site.register(models.DataType)
admin.site.register(models.Tissue)

for study_type in models.StudyTypes:
    admin.site.register(study_type)
