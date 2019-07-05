
# HuBMAP Data Portal

## About
This is a work-in-progress HuBMAP data portal.
This uses sample data and data types and creates basic
models in Django (database, tables) Django-restful framework with reactJS.
We use PyCharm as development IDE for this prototype.

## Data portal configuration:
### Steps to setup ReactJS:
* Install npm and nodejs:
```Follow instructions @ https://nodejs.org/en/``` and
```https://nodejs.org/en/download/```
* Install `create-react-app`:
`npm install -g create-react-app`
* Navigate to hubmap/frontend folder and execute following command:
`npm start`
* Navigate to hubmap/frontend folder and execute following command:
`npm run build`
* Navigate to hubmap/frontend folder and execute following command:
`npm run prod`
* Navigate to dataportal folder and run following command
	to migrate/create databases.
	`python manage.py makemigrations`
	`python manage.py migrate`
* To access tables and run some SQL commands:
	`python manage.py shell`

### Required software:
* Check and install python packages [requirements.txt](https://github.com/hubmapconsortium/hubmap-data-portal/blob/sushma-branch/hiveportal/requirements.txt)

### Running the app for development

* Execute following command: `python manage.py runserver`
* To access basic reactjs app, navigate to hubmap/frontend folder and execute following command: `npm start`
* Alternately, if you'd like to run vis HTTPS url: `set HTTPS=true&&npm start`

* Access HuBMAP dataportal restful django api by : http://127.0.0.1:8000/api
* Access HuBMAP dataportal api for #id from Studies by : http://127.0.0.1:8000/api/1/
* Access reactjs app : http://127.0.0.1:3000

## Running in production via `docker-compose`
The current production configuration for this application runs most pieces of the application
through `docker-compose`. This includes the Python/Django backend app via `uwsgi`, and
the ReactJS app through Node.js. PostgreSQL is used for the database server, through the stock
`postgres:11` Docker image.

Web serving is handled by `nginx` on the _host_ machine, with a TLS certificate from Let's Encrypt.

### `nginx` configuration
See `nginx/demo1.hubmapconsortium.org.conf`. This is a modified version of `/etc/nginx/nginx.conf`
from a CentOS 7 host, and the file in this repository can be symlinked to that location.

### Docker containers for the application
A `build_docker_container.py` script is provided -- running this builds Docker containers for
both the Python/Django/`uwsgi` application and the ReactJS application. This script automatically
tags the images with a timestamp, and can also tag the images as "latest" and/or push the new
containers to Docker Hub. See `--help` for details.

Note that these Dockerfiles include the _current_ state of your copy of this repository in
the containers! I.e., local modifications in your copy will be reflected in the containerized
application. You may want to run `build_docker_container.py` from a fresh checkout and/or run
`git clean -dfx; git reset --hard` before building.

### Running the application through docker-compose
Run `docker-compose up` in the `docker` directory. This will start all three containers specified in
`docker/docker-compose.yml`, and the Postgres container will initially have an empty database.
Database migrations (including the initial migration which creates the database tables) can be
applied by running the `run_migrations_in_container.py` script. This script is essentially a wrapper
around `docker exec <container> manage.py migrate`, with auto-detection of the running
Python/Django/`uwsgi` container.

## Misc
Acronyms:

FAIR reference: https://docs.google.com/document/d/1RXmFrLhm_twOQGSlElcqWp8P8uEcq2jiJavjjM13cbo/edit#heading=h.5s6i6l1nfb30

FAIR Metrics: https://github.com/FAIRMetrics/Metrics

TODO: Along with a full functional description all published APIs will include complete information describing:
* authentication and authorization (security scheme)
* request header
* call parameters
* response
* data models used for any of the above
