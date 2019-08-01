import csv
import os
from dataportal.models import *
"""Studies Export as CSV"""
from django.core.management.base import BaseCommand, CommandError
import sys
from dataportal.models import Study

# TODO: Delete this file, or make it useful.
# https://github.com/hubmapconsortium/hubmap-data-portal/issues/53


class Command(BaseCommand):
    help = ("Output given model to CSV")
    args = ''

    def handle(self, *args, **options):
        from django.apps import apps
        appname = 'dataportal'
        model = apps.get_model(appname, model_name)  # noqa: F841 TODO!
        if model_name == 'Study':
            path = "../"
            os.chdir(path)
            with open('test.csv') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:  # noqa: F841 TODO!
                    p = ""  # noqa: F841 TODO!
