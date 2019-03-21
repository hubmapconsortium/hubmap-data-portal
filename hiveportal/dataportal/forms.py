import django
from django import forms
from django.forms import ModelForm
from django.forms import models

from .models import *
#Developer: Matt Ruffalo
#Developer modifying prototype: Sushma Anand Akoju
model_form_mapping = {}

for study_type in StudyTypes:
    class StudyTypeForm(ModelForm):
        class Meta:
            print(study_type)
            model = study_type
            fields = '__all__'
            print(forms.fields_for_model(model,fields))

        def __init__(self, *args, **kwargs):
            super(StudyTypeForm, self).__init__(*args, **kwargs)
            choiceField = self.fields['data_type']
            #TODO: Add a new form instead of default ModelForm : values/options are not getting oevrriden and sometimes
            #throwing runtime exceptions

    model_form_mapping[study_type] = StudyTypeForm

#institution page by default shows all institutions
for institution in Institution.objects.all():
    class InstitutionForm(ModelForm):
        class Meta:
            model = institution
            fields = '__all__'

        def __init__(self, *args, **kwargs):
            super(InstitutionForm, self).__init__(*args, **kwargs)


    model_form_mapping[institution] = InstitutionForm