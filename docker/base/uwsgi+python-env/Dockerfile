## 1. Install Python packages and requirements into throwaway build stage,
# so the cached archives/wheels and development dependencies don't take up
# disk space in the real image
FROM ubuntu:18.04 as BASE

RUN apt-get update \
&& apt-get -y install \
    postgresql-server-dev-all \
    python3 \
    python3-dev \
    python3-pip \
&& rm -rf /var/cache/apt/*

COPY hubmap/requirements.txt /opt
# Doing a little redundant work to actually *install* things in the base
# container, but worth it to avoid specifying packages to build wheels by hand
RUN pip3 install -r /opt/requirements.txt

## 2. Actual container
FROM ubuntu:18.04 as RELEASE

RUN apt-get update \
&& apt-get -y install python3 python3-six python3-idna python3-pkg-resources libpq5 \
&& rm -rf /var/cache/apt/*

COPY --from=BASE /usr/local/lib/python3.6 /usr/local/lib/python3.6
