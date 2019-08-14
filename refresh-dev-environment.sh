#!/usr/bin/env bash
set -o errexit
set -o pipefail

die() { set +v; echo "$*" 1>&2 ; exit 1; }

BASE=$(dirname $0)
cd $BASE/docker/dev-common
docker-compose pull
docker-compose up
# TODO (Chuck?): Need to wait till containers have started.
# "npx wait-on" is slow to start, because it reloads source every time.
# http://localhost:3000 comes up fast, but Django hasn't actually started.
# http://localhost:3000/dataanalysis will work, but doesn't respond to HEAD requests.
cd -
./run_migrations_in_container.py

# TODO (Matt?): Load database dump: Could you host it on S3?
# Or I can, if you don't have access to a bucket...
# or is keeping the image up to date an issue?
