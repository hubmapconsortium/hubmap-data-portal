# 1. Build production React app
FROM hubmap/data-portal-reactjs-base:latest as REACT_BUILD

WORKDIR /opt/hubmap-data-portal/hubmap/frontend
RUN npm run build

# Build production Python container with static content from React container

FROM hubmap/data-portal-python-base:latest

RUN apt-get update \
&& apt-get -y install uwsgi uwsgi-plugin-python3 \
&& rm -rf /var/cache/apt/*

COPY uwsgi/dataportal.xml /opt/dataportal.xml

COPY . /opt/hubmap-data-portal

COPY --from=REACT_BUILD \
    /opt/hubmap-data-portal/hubmap/frontend/build \
    /opt/hubmap-data-portal/hubmap/frontend/build

WORKDIR /opt/hubmap-data-portal/hubmap/frontend
RUN mv build/index.html templates
RUN mv build/static/* static
RUN mv build/* static
RUN rm -rf build

RUN mv \
    /opt/hubmap-data-portal/hubmap/hubmap/production_settings.py \
    /opt/hubmap-data-portal/hubmap/hubmap/local_settings.py
WORKDIR /opt/hubmap-data-portal/hubmap
RUN python3 -m compileall .
RUN python3 -O -m compileall .

VOLUME /opt/hubmap-data-portal/static
VOLUME /opt/secret

EXPOSE 5000

ENTRYPOINT ["/opt/hubmap-data-portal/docker/prod/uwsgi+python-env/collectstatic_then_web_app.sh"]
