# HuBMAP Data Portal

- [Development instance](https://data.dev.hubmapconsortium.org/)
- [Test instance](https://data.test.hubmapconsortium.org/)

## About
This is a work-in-progress HuBMAP data portal.

This uses sample data and data types and creates basic models in Django
(database, tables), provides a REST API via Django REST framework, and has
a front-end interface written in ReactJS.

## Setup

The application is packaged in Docker containers for production deployment,
and we recommend running through Docker for local development also.

### Local development with Docker
Run `docker-compose up` in the `docker/dev-common` directory. This will
download pre-built Docker containers for development, and start all services
listed in `docker/dev-common/docker-compose.yml`. The local copy of this
repository will be mounted in Django and ReactJS containers, and those
containers will start development servers for both parts of the application.
Note that the ReactJS container will run `npm install` before starting the
application, so a `node_modules` directory will appear in `hubmap/frontend`.
Modifications of your local copy of the repository will be noticed by the
Django and ReactJS development servers, which should reload automatically.

The Postgres container will initially have an empty database. Database
migrations (including the initial migration which creates the database tables)
can be applied by running the `run_migrations_in_container.py` script. This
script is essentially a wrapper around `docker exec <container> manage.py migrate`,
with auto-detection of the running Django container. (Migrations must be applied
through `docker exec` instead of something like
`docker run hubmap/data-portal-python-dev manage.py migrate` since the Postgres
container is only accessible through the virtual network provided by
`docker-compose`).

After all services are started, the Django REST API is available at
`http://localhost:8000/api` and the ReactJS app is available at
`http://localhost:3000`.

To experiment with local modifications to the development Docker container,
see `docker/dev-local-example/README.md`.

#### Running test code inside Docker containers

There is currently no automated mechanism to run tests in a local development
instance of the data portal, but this can be done manually by either:
1. attaching to a running container, if the application is running through
   `docker-compose`
1. running a new instance of the appropriate container with an overridden entry
   point

Attaching to an existing container spawned by `docker-compose` is strongly
recommended, since (e.g.) Django tests require a connection to a Postgres database.

To attach to an existing container, list the running containers with `docker ps`,
then note the ID or name of the React or Django container. For example:
```
$ docker ps --format '{{.ID}} {{.Names}}'
87fa2e6036eb dev-common_django_1
9aaf758a3e1f dev-common_rabbitmq_1
e7e410328ae0 dev-common_neo4j_1
1ec6d97dd36b dev-common_react_app_1
8fa1a6144374 dev-common_postgres_1
7d38a435ce51 dev-common_elasticsearch_1
```
(The `dev-common` prefix might be `dev-local` if you are using a locally modified
Docker configuration.)

For example, to run the Node and ESLint tests:
```
$ docker exec -it dev-common_react_app_1 /bin/bash
root@1ec6d97dd36b:/opt/hubmap-data-portal/hubmap/frontend# npm run test
<Node/React test output>
root@1ec6d97dd36b:/opt/hubmap-data-portal/hubmap/frontend# npx eslint .
<eslint output>
```

To run the Python tests:
```
$ docker exec -it dev-common_django_1 /bin/bash
root@87fa2e6036eb:/opt/hubmap-data-portal/hubmap# ./manage.py test
<Django test output>
root@87fa2e6036eb:/opt/hubmap-data-portal/hubmap# flake8
<flake8 output, if any errors are found>
```

### Running in production via `docker-compose`
The current production configuration for this application runs most pieces of the application
through `docker-compose`. This includes the Python/Django backend app via `uwsgi`, and
the ReactJS app through Node.js. PostgreSQL is used for the database server, through the stock
`postgres:11` Docker image.

Web serving is handled by `nginx` on the _host_ machine, with a TLS certificate from Let's Encrypt.

### `nginx` configuration
See `nginx/demo1.hubmapconsortium.org.conf`. This is a modified version of `/etc/nginx/nginx.conf`
from a CentOS 7 host, and the file in this repository can be symlinked to that location.

### Building "official" Docker containers
A `build_docker_container.py` script is provided -- running this builds Docker containers for
both the Python/Django/`uwsgi` application and the ReactJS application. This script automatically
tags the images with a timestamp, and can also tag the images as "latest" and/or push the new
containers to Docker Hub. See `--help` for details.

Note that these Dockerfiles include the _current_ state of your copy of this repository in
the containers! I.e., local modifications in your copy will be reflected in the containerized
application. You may want to run `build_docker_container.py` from a fresh checkout and/or run
`git clean -dfx; git reset --hard` before building.

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
