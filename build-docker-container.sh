#!/bin/sh
TIMESTAMP=$(date +%Y%m%d-%H%M%S%z)
docker build -t mruffalo/hubmap-data-portal-python:$TIMESTAMP -f docker/uwsgi+python-env/Dockerfile .
docker build -t mruffalo/hubmap-data-portal-reactjs:$TIMESTAMP -f docker/reactjs_app/Dockerfile .
