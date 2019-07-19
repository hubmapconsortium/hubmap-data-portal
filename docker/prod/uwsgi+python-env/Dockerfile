FROM hubmap/data-portal-python-base:latest

COPY uwsgi/dataportal.xml /opt/dataportal.xml

COPY . /opt/hubmap-data-portal
RUN mv \
    /opt/hubmap-data-portal/hubmap/hubmap/production_settings.py \
    /opt/hubmap-data-portal/hubmap/hubmap/local_settings.py
WORKDIR /opt/hubmap-data-portal/hubmap
RUN python3 -m compileall .
RUN python3 -O -m compileall .

VOLUME /opt/hubmap-data-portal/static

EXPOSE 5000

ENTRYPOINT ["/opt/hubmap-data-portal/docker/prod/uwsgi+python-env/collectstatic_then_web_app.sh"]
