
#HuBMAP Data portal!

This is a simple, quick prototype of HuBMAP web portal.
This uses sample data and data types and creates basic 
Models in Django (database, tables..) by using simple HTML templates.
This portal simulates Globus authentication.
We use PyCharm as development IDE for this prototype.

## Dataportal
* Navigate to dataportal folder and run following command
	to migrate/create databases.
	```
	python manage.py migrate
	```

* To access tables and run some SQL commands:
	```
	python manage.py shell
	```

### Required software:
* Check and install python packages [requirements.txt](https://github.com/mruffalo/hubmap-data-portal/blob/sushma-branch/hiveportal/requirements.txt)
* Install [Docker](https://docs.docker.com/install/)
* Start Docker server on the system. run the command from terminal 
	```
	docker --version
	```
* Since this app now has elastic search, we must run elastic search server first.
	And then build index for Django models.
	* To start elastic search server, run the script :
	[start_docker_search.sh](https://github.com/mruffalo/hubmap-data-portal/blob/sushma-branch/start_docker_search.sh)

	* To test if elastic search is running: navigate to http://127.0.0.1:9200/ and should display 
	* Build indices from folder path hubmap-data-portal/hiveportal/ :
	```
	python manage.py search_index --populate
	```
	* Now access http://127.0.0.1:9200/studies/_search?q=*
	This should list all available entries in index with structure of documents from primary shard.
	* Now access http://127.0.0.1:9200/studies/
	This should list all mappings in building studies Index, more specifically,
	all the mappings, keyword, analyzers, fields, model documents are in 
	[documents.py](https://github.com/mruffalo/hubmap-data-portal/blob/sushma-branch/hiveportal/dataportal/documents.py)
	
### To run the app,

* Make sure elastic search server is running by accessing : http://127.0.0.1:9200/ 
* Configure running a django app with port 8000 and run/debug the app.
* Run data portal from terminal
```
python manage.py runserver
```
* Access HuBMAP dataportal prototype by : http://127.0.0.1:8000
* Access HuBMAP dataportal search by : http://127.0.0.1:8000/search

### Note:
This web portal runs locally for now so does not have any 
web hosting mechanisms implemented.
To see work-in-progress and TODOs, look for TODOs in PyCharm.

### Acronyms:
W.I.P.: work in progress

Architectural design (W.I.P):
* FAIR reference: https://docs.google.com/document/d/1RXmFrLhm_twOQGSlElcqWp8P8uEcq2jiJavjjM13cbo/edit#heading=h.5s6i6l1nfb30
* FAIR Metrics: https://github.com/FAIRMetrics/Metrics
* TODO: Along with a full functional description all published APIs will include complete information describing:
	* authentication and authorization (security scheme)
	* request header
	* call parameters
	* response
	* data models used for any of the above


