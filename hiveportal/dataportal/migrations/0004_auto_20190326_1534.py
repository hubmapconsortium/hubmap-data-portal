# Generated by Django 2.1.7 on 2019-03-26 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dataportal', '0003_microscopystudy_scthsseqstudy'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagingstudy',
            name='preview_image',
            field=models.ImageField(blank=True, max_length=500, null=True, upload_to='gallery/%Y/%m/%d'),
        ),
        migrations.AlterField(
            model_name='masscytometrystudy',
            name='preview_image',
            field=models.ImageField(blank=True, max_length=500, null=True, upload_to='gallery/%Y/%m/%d'),
        ),
    ]
