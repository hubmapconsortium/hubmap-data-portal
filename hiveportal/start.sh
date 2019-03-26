#!/usr/bin/env bash

# Start Gunicorn processes

echo "This is for Docker Setup for HuBMAP web portal."
echo "Starting Gunicorn."
exec gunicorn hiveportal.hiveportal.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3