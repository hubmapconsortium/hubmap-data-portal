"""Studies Export as CSV"""
import csv
from django.core.management.base import BaseCommand, CommandError
import sys
from dataportal.models import Study


class Command(BaseCommand):
    help = ("Output given model to CSV")
    args= ''
    def handle(self, *args, **options):
        from django.apps import apps
        #appname = args[0]
        #model = apps.get_model(appname, model_name)

        model = Study
        field_names = [field.name for field in model._meta.fields]
        field_names.remove("id")
        # other_fields = ['genes', 'proteins', 'preview_image', 'read_count_total', 'cell_count',
        #                 'total_read_count', 'read_count_aligned', 'unique_barcode_count', ]
        # for field in other_fields:
        #     field_names.append(field)

        writer = csv.writer(sys.stdout, quoting=csv.QUOTE_ALL)
        writer.writerow(field_names)
        for study in model.objects.all().select_subclasses():
            row = writer.writerow([get_attribute(study, field) for field in field_names])

def get_attribute(study,field):
    if field is "genes" and getattr(study, field,"NA")!="NA" :
        genes = [gene.hugo_symbol for gene in study.genes.all()]
        return genes
    elif field is "proteins" and getattr(study, field,"NA")!="NA":
        proteins = [protein.name for protein in study.proteins.all()]
        return proteins
    elif field is "id":
        pass
    else:
        return getattr(study, field, "")
