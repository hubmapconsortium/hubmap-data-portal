
# HuBMAP Data portal!

## About Data portal
This is a simple, quick prototype of HuBMAP data portal.
This uses sample data and data types and creates basic 
Models in Django (database, tables..) Django-restful framework with reactJS.
We use PyCharm as development IDE for this prototype.
Database/Django Models are same as defined by Matt Ruffalo: https://github.com/hubmapconsortium/hubmap-data-portal 

## Dataportal Configuration:
### Steps to setup ReactJS:
* Install npm and nodejs:
```Follow instructions @ https://nodejs.org/en/``` and
```https://nodejs.org/en/download/```
* Install create-react-app :
`npm install -g create-react-app`
* Navigate to hubmap\frontend folder and execute following command:
`npm start`
* Navigate to dataportal folder and run following command
	to migrate/create databases.
	`python manage.py makemigrations`
	`python manage.py migrate`
* To access tables and run some SQL commands:
	`python manage.py shell`

### Required software:
* Check and install python packages [requirements.txt](https://github.com/hubmapconsortium/hubmap-data-portal/blob/sushma-branch/hiveportal/requirements.txt)

### To run the app,

* Execute following command: `python manage.py runserver`
* To access basic reactjs app, navigate to hubmap/frontend folder and execute following command: `npm start`
* Alternately, if you'd like to run vis HTTPS url: `set HTTPS=true&&npm start`

* Access HuBMAP dataportal restful django api by : http://127.0.0.1:8000/api
* Access HuBMAP dataportal api for #id from Studies by : http://127.0.0.1:8000/api/1/
* Access reactjs app : http://127.0.0.1:3000

## To build the Docker container for the app:
The Dockerfile at `docker/uwsgi+python-env/Dockerfile` copies this repository into
the container, so you must run `docker build` from _this_ directory. This is automated
via the `build-docker-container.sh` script in this directory.

Note that the current state of your checkout will be used as-is, so you may want to
build the Docker container from a fresh checkout (and/or run `git repack -Ad` to repack your
local repository).

## Misc
Acronyms:
W.I.P.: work in progress

FAIR reference: https://docs.google.com/document/d/1RXmFrLhm_twOQGSlElcqWp8P8uEcq2jiJavjjM13cbo/edit#heading=h.5s6i6l1nfb30

FAIR Metrics: https://github.com/FAIRMetrics/Metrics

TODO: Along with a full functional description all published APIs will include complete information describing:
* authentication and authorization (security scheme)
* request header
* call parameters
* response
* data models used for any of the above
* 