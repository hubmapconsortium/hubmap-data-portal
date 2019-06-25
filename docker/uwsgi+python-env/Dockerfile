## 1. Install Python packages and requirements into throwaway build stage,
# so the cached archives/wheels and development dependencies don't take up
# disk space in the real image
FROM ubuntu:18.04 as BASE

RUN apt-get update
RUN apt-get -y install \
    postgresql-server-dev-all \
    python3 \
    python3-dev \
    python3-pip

COPY hubmap/requirements.txt /opt
# Doing a little redundant work to actually *install* things in the base
# container, but worth it to avoid specifying packages to build wheels by hand
RUN pip3 install -r /opt/requirements.txt

## 2. Actual container
FROM ubuntu:18.04 as RELEASE

RUN apt-get update
RUN apt-get -y install uwsgi uwsgi-plugin-python3 python3 python3-six python3-idna libpq5
RUN rm -rf /var/cache/apt/*

COPY --from=BASE /usr/local/lib/python3.6 /usr/local/lib/python3.6
COPY uwsgi/dataportal.xml /opt/dataportal.xml

COPY . /opt/hubmap-data-portal
RUN mv \
    /opt/hubmap-data-portal/hubmap/hubmap/production_settings.py \
    /opt/hubmap-data-portal/hubmap/hubmap/local_settings.py
WORKDIR /opt/hubmap-data-portal/hubmap
RUN python3 -m compileall .
RUN python3 -O -m compileall .
# for frontend
RUN python3 manage.py gitversion

VOLUME /opt/hubmap-data-portal/static

EXPOSE 5000

ENTRYPOINT ["/opt/hubmap-data-portal/docker/uwsgi+python-env/collectstatic_then_web_app.sh"]
