#!/usr/bin/env python3
from argparse import ArgumentParser
from typing import List

from docker_util import run_in_django_container

MIGRATE_COMMAND: List[str] = [
    'python3',
    '/opt/hubmap-data-portal/hubmap/manage.py',
    'migrate',
    '--force-color',
]

if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--pretend', action='store_true')
    args = p.parse_args()

    run_in_django_container(MIGRATE_COMMAND, args.pretend)
