#!/usr/bin/env bash
set -o errexit
set -o pipefail

REACT_CONTAINER=$(docker ps --format '{{.Names}}' | grep react)
echo "React container: $REACT_CONTAINER"
docker exec -it $REACT_CONTAINER npx eslint .
docker exec -it $REACT_CONTAINER npm test

DJANGO_CONTAINER=$(docker ps --format '{{.Names}}' | grep django)
echo "Django container: $DJANGO_CONTAINER"
docker exec -it $DJANGO_CONTAINER flake8
docker exec -it $DJANGO_CONTAINER ./manage.py test
# TODO: Fails ->
# django.db.utils.OperationalError: could not translate host name "postgres" to address: Name or service not known
