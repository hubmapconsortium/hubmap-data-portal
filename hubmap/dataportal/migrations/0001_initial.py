# Generated by Django 2.2 on 2019-06-25 15:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='DataType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='Gene',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('entrez_id', models.CharField(blank=True, max_length=50, null=True)),
                ('hugo_symbol', models.CharField(blank=True, max_length=50, null=True)),
                ('ensembl_id', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Institution',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='Study',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('data_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dataportal.DataType')),
                ('institution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dataportal.Institution')),
                ('subclass', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType')),
            ],
            options={
                'verbose_name': 'Study Parent class',
            },
        ),
        migrations.CreateModel(
            name='Tissue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='TissueExpressionHeatmap',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kidney_color', models.CharField(max_length=7)),
                ('lung_color', models.CharField(max_length=7)),
                ('heart_color', models.CharField(max_length=7)),
                ('pancreas_color', models.CharField(max_length=7)),
                ('abdomen_color', models.CharField(max_length=7)),
                ('liver_color', models.CharField(max_length=7)),
                ('smallIntestine_color', models.CharField(max_length=7)),
                ('bladder_color', models.CharField(max_length=7)),
                ('largeIntestine_color', models.CharField(max_length=7)),
                ('spleen_color', models.CharField(max_length=7)),
            ],
        ),
        migrations.CreateModel(
            name='ImagingStudy',
            fields=[
                ('study_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dataportal.Study')),
                ('image_count', models.PositiveIntegerField()),
                ('preview_image', models.ImageField(blank=True, max_length=500, null=True, upload_to='gallery/%Y/%m/%d')),
            ],
            bases=('dataportal.study',),
        ),
        migrations.CreateModel(
            name='ScAtacSeqStudy',
            fields=[
                ('study_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dataportal.Study')),
                ('read_count_total', models.PositiveIntegerField()),
                ('cell_count', models.PositiveIntegerField()),
            ],
            bases=('dataportal.study',),
        ),
        migrations.CreateModel(
            name='ScRnaSeqStudy',
            fields=[
                ('study_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dataportal.Study')),
                ('read_count_total', models.PositiveIntegerField()),
                ('cell_count', models.PositiveIntegerField()),
            ],
            bases=('dataportal.study',),
        ),
        migrations.CreateModel(
            name='ScThsSeqStudy',
            fields=[
                ('study_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dataportal.Study')),
                ('cell_count', models.PositiveIntegerField()),
                ('total_read_count', models.PositiveIntegerField()),
            ],
            options={
                'verbose_name': 'scTHS-seq',
            },
            bases=('dataportal.study',),
        ),
        migrations.AddField(
            model_name='study',
            name='tissue',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dataportal.Tissue'),
        ),
        migrations.CreateModel(
            name='Protein',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('pdb_id', models.CharField(blank=True, max_length=50, null=True)),
                ('gene', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dataportal.Gene')),
            ],
        ),
        migrations.AddField(
            model_name='gene',
            name='tissue_expression_heatmap',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='dataportal.TissueExpressionHeatmap'),
        ),
        migrations.CreateModel(
            name='MicroscopyStudy',
            fields=[
                ('imagingstudy_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dataportal.ImagingStudy')),
            ],
            options={
                'verbose_name': 'Microscopy',
            },
            bases=('dataportal.imagingstudy',),
        ),
        migrations.CreateModel(
            name='ScRnaSeqStudyCDNA',
            fields=[
                ('scrnaseqstudy_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dataportal.ScRnaSeqStudy')),
                ('read_count_aligned', models.PositiveIntegerField()),
            ],
            bases=('dataportal.scrnaseqstudy',),
        ),
        migrations.CreateModel(
            name='SeqFishImagingStudy',
            fields=[
                ('imagingstudy_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dataportal.ImagingStudy')),
            ],
            bases=('dataportal.imagingstudy',),
        ),
        migrations.CreateModel(
            name='SpatialTranscriptomicStudy',
            fields=[
                ('study_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dataportal.Study')),
                ('genes', models.ManyToManyField(to='dataportal.Gene')),
            ],
            bases=('dataportal.study',),
        ),
        migrations.CreateModel(
            name='ScRnaSeqStudyBarcoded',
            fields=[
                ('scrnaseqstudy_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dataportal.ScRnaSeqStudy')),
                ('unique_barcode_count', models.PositiveIntegerField()),
                ('genes', models.ManyToManyField(to='dataportal.Gene')),
            ],
            bases=('dataportal.scrnaseqstudy',),
        ),
        migrations.CreateModel(
            name='MassCytometryStudy',
            fields=[
                ('imagingstudy_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dataportal.ImagingStudy')),
                ('proteins', models.ManyToManyField(to='dataportal.Protein')),
            ],
            options={
                'verbose_name': 'Mass Cytometry',
            },
            bases=('dataportal.imagingstudy',),
        ),
    ]
