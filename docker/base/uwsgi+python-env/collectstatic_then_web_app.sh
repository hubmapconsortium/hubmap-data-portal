#!/bin/sh
python3 /opt/hubmap-data-portal/hubmap/manage.py collectstatic --no-input
uwsgi --xml /opt/dataportal.xml
