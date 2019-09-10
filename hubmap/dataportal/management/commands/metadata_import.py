from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand

from ...utils import normalize_whitespace
from ._metadata_import import metadata_import


class Command(BaseCommand):
    help = normalize_whitespace('''
        Import a metadata file from the Human Cell Atlas project (e.g.
        the "Project Metadata" download from
        https://data.humancellatlas.org/explore/projects/8c3c290d-dfff-4553-8868-54ce45f4ba7f
    ''')

    def add_arguments(self, parser):
        parser.add_argument('metadata_file', type=Path)

    def handle(self, *args, **options):
        metadata_file: Path = options['metadata_file']
        self.stdout.write(f'Loading metadata from {metadata_file} ... ', ending='')
        metadata_import(
            metadata_file,
            settings.NEO4J_URL,
            settings.MONGODB_HOST,
            settings.ELASTICSEARCH_HOSTS,
        )
        self.stdout.write(self.style.SUCCESS('OK'))
