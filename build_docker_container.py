#!/usr/bin/env python3
from argparse import ArgumentParser
from datetime import datetime
import json
from pathlib import Path
from subprocess import PIPE, run
from typing import List, Tuple

# Would like to include timezone offset, but not worth the
# complexity of including pytz/etc.
TIMESTAMP_FORMAT = '%Y%m%d-%H%M%S%z'

GIT_VERSION_COMMAND = [
    'git',
    'describe',
    '--dirty',
]

DOCKER = 'docker'
DOCKER_BUILD_COMMAND_TEMPLATE: List[str] = [
    DOCKER,
    'build',
    '-q',
    '-t',
    '{label}',
    '-f',
    '{dockerfile_path}',
    '{base_dir}',
]
DOCKER_TAG_COMMAND_TEMPLATE: List[str] = [
    DOCKER,
    'tag',
    '{image_id}',
    '{tag_name}',
]
DOCKER_PUSH_COMMAND_TEMPLATE: List[str] = [
    DOCKER,
    'push',
    '{image_id}',
]

# List of (label, filename) tuples
IMAGES: List[Tuple[str, Path]] = [
    ('hubmap/data-portal-python-base', Path('docker/base/uwsgi+python-env/Dockerfile')),
    ('hubmap/data-portal-reactjs-base', Path('docker/base/reactjs_app/Dockerfile')),
    ('hubmap/data-portal-python-dev', Path('docker/dev/uwsgi+python-env/Dockerfile')),
    ('hubmap/data-portal-reactjs-dev', Path('docker/dev/reactjs_app/Dockerfile')),
    ('hubmap/data-portal-python-prod', Path('docker/prod/uwsgi+python-env/Dockerfile')),
]

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

def write_git_version():
    path = Path(__file__).parent
    file_to_write = path / 'hubmap/frontend/src/git-version.json'

    try:
        proc = run(GIT_VERSION_COMMAND, cwd=str(path), stdout=PIPE, check=True)
        git_version = proc.stdout.decode('utf-8').strip()

        print('Writing Git revision', git_version, 'to', file_to_write)
        with open(file_to_write, 'w') as f:
            json.dump({'version': git_version}, f)
    except Exception as e:
        # don't care too much; this is best-effort
        print('Caught', e)

def main(tag_latest: bool, push: bool, pretend: bool):
    write_git_version()
    directory_of_this_script = Path(__file__).parent
    timestamp = datetime.now().strftime(TIMESTAMP_FORMAT)
    images_to_push = []
    for label_base, filename in IMAGES:
        label = f'{label_base}:{timestamp}'

        docker_build_command = [
            piece.format(
                label=label,
                dockerfile_path=filename,
                base_dir=directory_of_this_script,
            )
            for piece in DOCKER_BUILD_COMMAND_TEMPLATE
        ]
        image_id = print_run(docker_build_command, pretend, return_stdout=True)
        images_to_push.append(label)
        print('Tagged image', image_id, 'as', label)

        if tag_latest:
            latest_tag_name = f'{label_base}:latest'
            docker_tag_latest_command = [
                piece.format(
                    image_id=image_id,
                    tag_name=latest_tag_name,
                )
                for piece in DOCKER_TAG_COMMAND_TEMPLATE
            ]
            print_run(docker_tag_latest_command, pretend)
            print('Tagged image', image_id, 'as', latest_tag_name)
            images_to_push.append(latest_tag_name)

    if push:
        for image_id in images_to_push:
            docker_push_command = [
                piece.format(
                    image_id=image_id,
                )
                for piece in DOCKER_PUSH_COMMAND_TEMPLATE
            ]
            print_run(docker_push_command, pretend)

if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--tag-latest', action='store_true')
    p.add_argument('--push', action='store_true')
    p.add_argument('--pretend', action='store_true')
    args = p.parse_args()

    main(args.tag_latest, args.push, args.pretend)
