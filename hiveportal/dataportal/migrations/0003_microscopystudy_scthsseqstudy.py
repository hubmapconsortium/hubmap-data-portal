# Generated by Django 2.1.7 on 2019-03-19 17:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dataportal', '0002_masscytometrystudy_sample_count'),
    ]

    operations = [
        migrations.CreateModel(
            name='MicroscopyStudy',
            fields=[
                ('imagingstudy_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dataportal.ImagingStudy')),
            ],
            bases=('dataportal.imagingstudy',),
        ),
        migrations.CreateModel(
            name='ScThsSeqStudy',
            fields=[
                ('study_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dataportal.Study')),
                ('cell_count', models.PositiveIntegerField()),
                ('total_read_count', models.PositiveIntegerField()),
            ],
            bases=('dataportal.study',),
        ),
    ]
