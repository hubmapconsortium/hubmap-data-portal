#!/usr/bin/env bash
set -o errexit
set -o pipefail

start() { echo travis_fold':'start:$1; echo $1; }
end() { set +v; echo travis_fold':'end:$1; echo; echo; }
die() { set +v; echo "$*" 1>&2 ; exit 1; }

start flake8
pushd hubmap
flake8
popd
end flake8

start python
pushd hubmap
python manage.py test
# TODO: Django tests
popd
end python

start npm
pushd hubmap/frontend
CI=true npm test
popd
end npm

start eslint
pushd hubmap/frontend
CI=true npx eslint .
popd
end eslint
