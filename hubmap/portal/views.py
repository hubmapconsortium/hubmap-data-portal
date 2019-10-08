import json
import string
from collections import OrderedDict

from django.shortcuts import render
entities_list = [{"entity_type": "sample", "hubmap_id": 1 },
 {"entity_type": "sample", "hubmap_id": 2},
 {"entity_type": "donor", "hubmap_id": 3},
 {"entity_type": "donor", "hubmap_id": 4},
 {"entity_type": "dataset", "hubmap_id": 5},
 {"entity_type": "dataset", "hubmap_id": 6}]

# Create your views here.
def index(request):
    """
    This method shows home page with browse options, help .
    :param request:
    :return:
    """
    return render(request, 'portal_home.html', {"title":"HuBMAP"})


def details(request, entity_type: string, hubmap_id: int):
    return render(
        request,
        'details.html',
        {
            "entity_type": entity_type,
            "hubmap_id":hubmap_id,
            "title": "Browse Entity Details"
        }
    )


def listall(request):
    print(entities_list)
    print(type(entities_list))
    return render(
        request,
        'listall.html',
        {
            "entities_list": entities_list,
            "title": "Browse all Entities"
        }
    )

def entities(request, entity_type:string):
    filtered_list = [ entity for entity in entities_list if entity['entity_type'].__eq__( entity_type)]
    print( filtered_list)
    return render(request,
           'entities.html',
           {
               "filtered_list": filtered_list,
               "entity_type": entity_type,
               "title": "Browse Entities of " + entity_type
           })

def help(request):
    return render(request, 'help.html', {"title": "Help"})
