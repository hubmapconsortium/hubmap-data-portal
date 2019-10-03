import requests
from urllib.parse import quote_plus

base_url = 'http://localhost:9999/v0'

def get_entity_types():
    '''
    >>> types = get_entity_types()
    >>> all([type(t) is str for t in types])
    True
    '''
    response = requests.get(f'{base_url}/entities').json()
    return response['entity_types']

def get_entity(uuid):
    '''
    >>> entity = get_entity('11866f9586fdac34c95ac8a2737a83dd')
    >>> entity['description']
    'Test Donor 1'
    '''
    entity = requests.get(f'{base_url}/entities/{quote_plus(uuid)}').json()
    return entity
