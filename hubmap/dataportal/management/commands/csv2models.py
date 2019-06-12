import csv
import os
from dataportal.models import *
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
        appname = 'dataportal'
        model = apps.get_model(appname, model_name)
        if model_name == 'Study':
            path = "../"
            os.chdir(path)
            with open('test.csv') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    p = ""

