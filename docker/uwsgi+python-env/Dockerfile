FROM ubuntu:18.04 as BASE

RUN apt-get update
RUN apt-get -y install \
    python3 \
    python3-dev \
    python3-pip

COPY requirements.txt /opt
# Doing a little redundant work to actually *install* things in the base
# container, but worth it to avoid specifying packages to build wheels by hand
RUN pip3 install -r /opt/requirements.txt

FROM ubuntu:18.04 as RELEASE

RUN apt-get update
RUN apt-get -y install uwsgi uwsgi-plugin-python3 python3 python3-six python3-idna
RUN rm -rf /var/cache/apt/*

EXPOSE 5000

COPY --from=BASE /usr/local/lib/python3.6 /usr/local/lib/python3.6
COPY dataportal.xml /opt/dataportal.xml

CMD ["uwsgi", "--xml", "/opt/dataportal.xml"]
