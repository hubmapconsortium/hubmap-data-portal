FROM hubmap/data-portal-python-dev:latest

COPY hubmap/requirements-local.txt /opt
RUN pip3 install -r /opt/requirements-local.txt

EXPOSE 8000

VOLUME /opt/hubmap-data-portal

WORKDIR /opt/hubmap-data-portal/hubmap
CMD ["python3", "/opt/hubmap-data-portal/hubmap/manage.py", "runserver", "0.0.0.0:8000"]
