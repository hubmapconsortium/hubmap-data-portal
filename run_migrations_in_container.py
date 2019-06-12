#!/usr/bin/env python3
from argparse import ArgumentParser
from datetime import datetime
import json
from pathlib import Path
from subprocess import PIPE, run
from typing import List, Tuple

MIGRATE_COMMAND: List[str] = [
    'python3',
    '/opt/hubmap-data-portal/hubmap/manage.py',
    'migrate',
]

DOCKER = 'docker'
DOCKER_LIST_CONTAINER_COMMAND: List[str] = [
    DOCKER,
    'container',
    'ls',
    '--format',
    '{{json .}}'
]
DOCKER_MIGRATE_COMMAND_TEMPLATE: List[str] = [
    DOCKER,
    'exec',
    '{container_id}',
]

CONTAINER_LABEL = 'mruffalo/hubmap-data-portal-python'

def get_running_containers() -> List[str]:
    # Want to return a list instead of this being a generator function,
    # because we care quite a bit about the length of the resulting list
    containers = []
    list_container_output = run(
        DOCKER_LIST_CONTAINER_COMMAND,
        stdout=PIPE,
        check=True,
    ).stdout.decode().splitlines()

    for line in list_container_output:
        data = json.loads(line)
        image_base = data['Image'].split(':')
        if image_base[0] == CONTAINER_LABEL:
            containers.append(data['ID'])

    return containers

def print_run(command: List[str], pretend: bool, return_stdout: bool=False):
    print('Running "{}"'.format(' '.join(command)))
    if pretend:
        return '<pretend>'
    else:
        kwargs = {}
        if return_stdout:
            kwargs['stdout'] = PIPE
        proc = run(command, check=True, **kwargs)
        if return_stdout:
            return proc.stdout.strip().decode('utf-8')

def main(pretend: bool):
    containers = get_running_containers()
    if not containers:
        message = f'No containers with label "{CONTAINER_LABEL}" found.'
        raise EnvironmentError(message)

    if len(containers) > 1:
        print('Warning: multiple containers found ({}). Using first.'.format(', '.join(containers)))

    docker_migrate_command = [
        piece.format(
            container_id=containers[0],
        )
        for piece in DOCKER_MIGRATE_COMMAND_TEMPLATE
    ]
    docker_migrate_command.extend(MIGRATE_COMMAND)
    print_run(docker_migrate_command, pretend)

if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--pretend', action='store_true')
    args = p.parse_args()

    main(args.pretend)
