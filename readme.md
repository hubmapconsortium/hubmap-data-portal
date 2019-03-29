This is a simple, quick prototype of HuBMAP web portal.
This uses sample data and data types and creates basic 
Models in Django (database, tables..) by using simple HTML templates.
This portal simulates Globus authentication.
We use PyCharm as development IDE for this prototype.

Navigate to dataportal folder and run following command
to migrate/create databases.
```
python manage.py migrate
```

To access tables and run some SQL commands:
```
python manage.py shell
```

To run the app,
configure running a django app with port 8000 and run/debug the app.
This web portal runs locally for now so does not have any 
web hosting mechanisms implemented.

To see work-in-progress and TODOs, search TODOs in PyCharm.

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


