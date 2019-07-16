## 1. Install Python packages and requirements into throwaway build stage,
# so the cached archives/wheels and development dependencies don't take up
# disk space in the real image
FROM hubmap/data-portal-python-base:latest

EXPOSE 8000

VOLUME /opt/hubmap-data-portal

WORKDIR /opt/hubmap-data-portal/hubmap
CMD ["python3", "/opt/hubmap-data-portal/hubmap/manage.py", "runserver", "0.0.0.0:8000"]
