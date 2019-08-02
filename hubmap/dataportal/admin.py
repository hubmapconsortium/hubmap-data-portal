from django.contrib import admin

# Register your models here.
from . import models
from rest_framework.authtoken.admin import TokenAdmin

TokenAdmin.raw_id_fields = ['user']
admin.site.register(models.Institution)
admin.site.register(models.Gene)
admin.site.register(models.Protein)
admin.site.register(models.DataType)
admin.site.register(models.Tissue)
admin.site.register(models.TissueExpressionHeatmap)

fields = ['image_tag']
readonly_fields = ['image_tag']

for study_type in models.StudyTypes:
    admin.site.register(study_type)