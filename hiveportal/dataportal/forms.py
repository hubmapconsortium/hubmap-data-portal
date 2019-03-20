from django.forms import ModelForm

from .models import *

model_form_mapping = {}

for study_type in StudyTypes:
    class StudyTypeForm(ModelForm):
        class Meta:
            model = study_type
            fields = '__all__'

    model_form_mapping[study_type] = StudyTypeForm
