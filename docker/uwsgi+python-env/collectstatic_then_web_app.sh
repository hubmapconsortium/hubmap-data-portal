#!/bin/sh
python3 /opt/hubmap-data-portal/hubmap/manage.py collectstatic
uwsgi --xml /opt/dataportal.xml
