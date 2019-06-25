import json
from pathlib import Path
from subprocess import PIPE, run

from django.core.management.base import BaseCommand, CommandError

command = ['git', 'describe']

class Command(BaseCommand):
    help = 'Writes the Git version to a file in JSON format'

    def handle(self, *args, **options):
        # fallback
        git_version = '[unknown version]'

        path = Path(__file__).parent.parent.parent
        file_to_write = path / 'src/git-version.json'

        try:
            proc = run(command, cwd=str(path), stdout=PIPE, check=True)
            git_version = proc.stdout.decode('utf-8').strip()
        except Exception:
            # don't care too much; this is best-effort
            return

        print('Writing Git revision to', file_to_write)
        with open(file_to_write, 'w') as f:
            json.dump({'version': git_version}, f)
