## 1. Build static ReactJS/etc. content, to copy to static files later
FROM node:12.4.0 as NODE

WORKDIR /opt
COPY . /opt/hubmap-data-portal
WORKDIR /opt/hubmap-data-portal/frontend
RUN npm install
RUN npm run build

## 2. Install Python packages and requirements into throwaway build stage,
# so the cached archives/wheels and development dependencies don't take up
# disk space in the real image
FROM ubuntu:18.04 as BASE

RUN apt-get update
RUN apt-get -y install \
    python3 \
    python3-dev \
    python3-pip

COPY hubmap/requirements.txt /opt
# Doing a little redundant work to actually *install* things in the base
# container, but worth it to avoid specifying packages to build wheels by hand
RUN pip3 install -r /opt/requirements.txt

## 3. Actual container
FROM ubuntu:18.04 as RELEASE

RUN apt-get update
RUN apt-get -y install uwsgi uwsgi-plugin-python3 python3 python3-six python3-idna
RUN rm -rf /var/cache/apt/*

COPY --from=BASE /usr/local/lib/python3.6 /usr/local/lib/python3.6
COPY --from=NODE /opt/hubmap-data-portal/frontend/build /opt/hubmap-data-portal-static
COPY uwsgi/dataportal.xml /opt/dataportal.xml

COPY . /opt/hubmap-data-portal
WORKDIR /opt/hubmap-data-portal/hubmap
RUN python3 -m compileall .
RUN python3 -O -m compileall .

EXPOSE 5000

ENTRYPOINT ["uwsgi", "--xml", "/opt/dataportal.xml"]
