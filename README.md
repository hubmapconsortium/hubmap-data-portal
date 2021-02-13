# HuBMAP Data Portal

- [Development instance](https://data.dev.hubmapconsortium.org/)
- [Test instance](https://data.test.hubmapconsortium.org/)

## About
This is a work-in-progress HuBMAP data portal.

This uses sample data and data types and creates basic models in Django
(database, tables), provides a REST API via Django REST framework, and has
a front-end interface written in ReactJS.

The site will adhere to [FAIR principles](https://docs.google.com/document/d/1RXmFrLhm_twOQGSlElcqWp8P8uEcq2jiJavjjM13cbo).

## Development

The application is packaged in Docker containers for production deployment,
and we recommend running through Docker for local development also.

[![container diagram](https://docs.google.com/drawings/d/e/2PACX-1vQEu2FPtJeuNscKahs8WrHbNFUcgwE-PXwEzV0XJ1aDiKm2th_XE822gOd1zmVm1APsehElyEjJGkHk/pub?w=600&h=300)](https://docs.google.com/drawings/d/1vw0EJSVPZprQU8HMZKJrjnFTKRWHXlVzCbJBetOODSg/edit)

### Quick start

After cloning the repo and cd'ing into it:
```bash
cd docker/dev-common
docker-compose pull # Only needed if you have old images.
docker-compose up
```
When [`localhost:8000`](http://localhost:8000/) is up, enter this in a new terminal:
```
./run_migrations_in_container.py
# Download a metadata .tsv file from HCA, e.g. from
# https://data.humancellatlas.org/explore/projects/74b6d569-3b11-42ef-b6b1-a0454522b4a0
./load_hca_metadata.py path_to_metadata_from_HCA.tsv
```

Revisit [`localhost:8000`](http://localhost:8000/) and it should show the sample data.

<details>
When you run `docker-compose up` in the `docker/dev-common` directory it will
download pre-built Docker containers for development, and start all services
listed in `docker/dev-common/docker-compose.yml`. The local copy of this
repository will be mounted in the Django container, and that
container will start a development server.
Modifications of your local copy of the repository will be noticed by the
Django development server, which should reload automatically.

The Postgres container will initially have an empty database. Database
migrations (including the initial migration which creates the database tables)
can be applied by running the `run_migrations_in_container.py` script. This
script is essentially a wrapper around `docker exec <container> manage.py migrate`,
with auto-detection of the running Django container. (Migrations must be applied
through `docker exec` instead of something like
`docker run hubmap/data-portal-python-dev manage.py migrate` since the Postgres
container is only accessible through the virtual network provided by
`docker-compose`).

After all services are started, Django is available at
`http://localhost:8000/`.

To experiment with local modifications to the development Docker container,
see [the docs](docker/dev-local-example/README.md).

See the [nginx README](docker/prod/nginx/README.md) for more detail on the configuration
of that container.
</details>

### Running in production via `docker-compose`
The current production configuration for this application runs most pieces of the application
through `docker-compose`. This includes the Python/Django backend app via `uwsgi`, and
the ReactJS app through Node.js. PostgreSQL is used for the database server, through the stock
`postgres:11` Docker image.

Web serving is handled by `nginx` on the _host_ machine, with a TLS certificate from Let's Encrypt.

### Building "official" Docker containers
A `build_docker_container.py` script is provided -- running this builds Docker containers for
both the Python/Django/`uwsgi` application and the ReactJS application. This script automatically
tags the images with a timestamp, and can also tag the images as "latest" and/or push the new
containers to Docker Hub. See `--help` for details.

Note that these Dockerfiles include the _current_ state of your copy of this repository in
the containers! I.e., local modifications in your copy will be reflected in the containerized
application. You may want to run `build_docker_container.py` from a fresh checkout and/or run
`git clean -dfx; git reset --hard` before building.

### Branching and merging

- New feature branches from `develop` should have names like `username/short-description-123`:
Including your username will help us identify the owners of stale branches;
Including an issue number will remind us what the branch was trying to do.
- Non-trivial PRs should update the changelog. The idea is to provide something more readable
and more accessible than the git log.
- Identify a single reviewer for PRs, unless there are really cross-cutting concerns.
Feel free to solicit broader feedback on Slack, but it's good to have a single check,
rather than letting responsibility be more diffuse.
- At the end of the sprint, @mruffalo will make a release branch, confirm that it's good,
tag a release, and merge to master, in line with the [gitflow](https://nvie.com/posts/a-successful-git-branching-model/) model.

### Troubleshooting

#### "No space left on disk"
Over time old image files will accumate. If `docker-compose up` produces a "No space left on disk" error, this will give you a blank slate:
```
$ docker system prune --all
```
