FROM hubmap/data-portal-python-base:latest

# Do some duplicate work to install development packages in the dev container.
# We make sure to omit unnecessary system packages in the "base" Python image
# so the production container can be as small as possible, but we probably want
# some -dev packages here.

# Assume apt information is up-to-date, since we will probably run this right
# after building a new version of the base container
RUN apt-get -y install \
    python3-dev \
    python3-pip

RUN pip3 install -U pip setuptools wheel

COPY hubmap/requirements-dev.txt /opt
RUN pip3 install -r /opt/requirements-dev.txt
COPY hubmap/requirements-test.txt /opt
RUN pip3 install -r /opt/requirements-test.txt

# It's nice to have Python available through the `python` executable,
# so `manage.py` can be run directly, and so you don't need to change the
# default interpreter in PyCharm. Not important for production though.
RUN ln -s /usr/bin/python3 /usr/bin/python

EXPOSE 8000

VOLUME /opt/hubmap-data-portal

WORKDIR /opt/hubmap-data-portal/hubmap
CMD ["python3", "/opt/hubmap-data-portal/hubmap/manage.py", "runserver", "0.0.0.0:8000"]
