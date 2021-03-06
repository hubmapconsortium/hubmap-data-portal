import json
from pathlib import Path
from subprocess import PIPE, run
from typing import List

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

CONTAINER_LABEL_BASE = 'hubmap/data-portal-python'
CONTAINER_SUFFIXES = [
    'base',
    'dev',
    'prod',
]
# For local Docker override config
CONTAINER_LABELS = {'dev-local_django'}
CONTAINER_LABELS.update(f'{CONTAINER_LABEL_BASE}-{suffix}' for suffix in CONTAINER_SUFFIXES)

REPOSITORY_PATH = Path('/opt/hubmap-data-portal')

MANAGE_PY_COMMAND_TEMPLATE: List[str] = [
    'python3',
    str(REPOSITORY_PATH / 'hubmap/manage.py'),
]

def get_running_django_containers() -> List[str]:
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
        if image_base[0] in CONTAINER_LABELS:
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

def run_in_django_container(command: List[str], pretend: bool):
    django_containers = get_running_django_containers()
    if not django_containers:
        label_str = '\n'.join(f'\t{label}' for label in CONTAINER_LABELS)
        message = f'No containers found. Tried labels:\n{label_str}'
        raise EnvironmentError(message)

    if len(django_containers) > 1:
        print('Warning: multiple containers found ({}). Using first.'.format(', '.join(django_containers)))

    docker_migrate_command = [
        piece.format(
            container_id=django_containers[0],
        )
        for piece in DOCKER_MIGRATE_COMMAND_TEMPLATE
    ]
    docker_migrate_command.extend(command)
    print_run(docker_migrate_command, pretend)
