import django
from django import forms
from django.forms import ModelForm
from django.forms import models

from .models import *
#Developer: Matt Ruffalo
#Developer modifying prototype: Sushma Anand Akoju
model_form_mapping = {}
"""
Lists all study types:
"""
for study_type in StudyTypes:
    class StudyTypeForm(ModelForm):
        class Meta:
            model = study_type
            fields = '__all__'

        #def __init__(self, *args, **kwargs):
            #super(StudyTypeForm, self).__init__(*args, **kwargs)
            #TODO: Add a new form instead of default ModelForm : values/options are not getting oevrriden and sometimes
            #throwing runtime exceptions

    model_form_mapping[study_type] = StudyTypeForm
