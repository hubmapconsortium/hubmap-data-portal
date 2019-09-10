#!/usr/bin/env python3
from argparse import ArgumentParser
from pathlib import Path
from shutil import copy
from typing import List

from docker_util import MANAGE_PY_COMMAND_TEMPLATE, REPOSITORY_PATH, run_in_django_container

DATA_PATH = Path(__file__).parent / 'data'
LOAD_DATA_COMMAND: List[str] = MANAGE_PY_COMMAND_TEMPLATE + [
    'metadata_import',
    '--force-color',
]

def copy_file_if_necessary(metadata_file: Path) -> str:
    """
    `metadata_file` needs to be inside this repository, mounted in the
    Django Docker container, so it's readable by the metadata import
    functionality.

    Ensure that `metadata_file` is inside this repository: copy it to
    the 'data' directory if not.

    Then, return an absolute path usable as an argument to `./manage.py
    metadata_import` inside the Django container.

    :param metadata_file:
    :return: A relative path, as a `str`, usable as an argument to
      `./manage.py metadata_import`. Returned as a string since this
      will need to be appended to `LOAD_DATA_COMMAND` and we may as
      well not require the caller of this function to do this themselves.
    """
    # A few contortions with path manipulation. On the host system, get
    # the absolute directory that this script is in, and the absolute
    # path to the metadata file. Then try to get a version of the metadata
    # path relative to the directory containing this script -- this will
    # throw a `ValueError` if the metadata file isn't inside this
    # repository.

    absolute_dir = Path(__file__).parent.absolute()

    try:
        relative_path = metadata_file.absolute().relative_to(absolute_dir)
    except ValueError:
        # File isn't in this repository. Need to copy it (can't symlink)
        relative_path = DATA_PATH / metadata_file.name
        print('Copying', metadata_file, 'to', relative_path)
        copy(metadata_file, relative_path)

    # Now we know that `relative_path` is inside this repository (either it
    # already was, or it is after copying the file). Make this an absolute
    # path that matches the repository location in the container, so this
    # will be usable as an argument to `./manage.py metadata_import`.
    absolute_path_for_container = REPOSITORY_PATH / relative_path
    return str(absolute_path_for_container)

if __name__ == '__main__':
    p = ArgumentParser()
    p.add_argument('--pretend', action='store_true')
    p.add_argument('metadata_file', type=Path)
    args = p.parse_args()

    command = LOAD_DATA_COMMAND.copy()
    command.append(copy_file_if_necessary(args.metadata_file))

    run_in_django_container(command, args.pretend)
