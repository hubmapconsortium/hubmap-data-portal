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
CI=true $(npm bin)/eslint --max-warnings=0 .
popd
end eslint

start cypress
pushd hubmap/frontend
npm start &
SERVER_PID=$!
$(npm bin)/wait-on http://localhost:3000
$(npm bin)/cypress run
kill $SERVER_PID
popd
end cypress
