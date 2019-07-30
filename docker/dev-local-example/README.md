Local Docker image configuration
================================

Rationale
---------

When experimenting with (e.g.) new Python packages, it might be useful to
extend the "common" development Docker image for testing, before adding
packages to the committed versions of `requirements.txt`. The 
`docker-compose.yml` file in this directory is intended for this type of
extension, and refers to the `Dockerfile` in the `django_app` directory.
If desired, one can also extend the React container in the same way -- the
Python container configuration is only provided as an example.

The `Dockerfile` in `django_app` copies a (nonexistent and `.gitignore`d)
`requirements-local.txt` to the container, `pip install`s the packages listed,
and specifies a `CMD` identical to the common development container.

Usage
-----

Make a copy of this `dev-local-example` named `dev-local` (which is included
in the top-level `.gitignore`), then modify your new copy as desired.

If `docker-compose up` must build a new container, the working directory of
`docker build` will be the subdirectory of `dev-local` containing the
`Dockerfile`. As such, the example `COPY requirements-local.txt /opt` command
in `django_app/Dockerfile` needs a `requirements-local.txt` file in the
`django_app` subdirectory.
