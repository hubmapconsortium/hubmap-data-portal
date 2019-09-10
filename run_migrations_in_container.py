#!/usr/bin/env python3
from argparse import ArgumentParser
from typing import List

from docker_util import MANAGE_PY_COMMAND_TEMPLATE, run_in_django_container

MIGRATE_COMMAND: List[str] = MANAGE_PY_COMMAND_TEMPLATE + [
    'migrate',
    '--force-color',
]

if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--pretend', action='store_true')
    args = p.parse_args()

    run_in_django_container(MIGRATE_COMMAND, args.pretend)
