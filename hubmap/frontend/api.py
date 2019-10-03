import requests
from urllib.parse import quote_plus

# In general, unit tests should not depend on live servers
# ... but in this case, it's all one project, and fairly simple,
# and making sure docker works is actually a good thing, too.

# Down the road, generate API client code from OpenAPI:
# https://github.com/hubmapconsortium/hubmap-data-portal/issues/179

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


def get_donor_uuids(user=None):
    '''
    >>> donor_uuids = get_donor_uuids()
    >>> all([type(id) is str for id in donor_uuids])
    True
    >>> all([len(id) == 32 for id in donor_uuids])
    True

    >>> filtered_uuids = get_donor_uuids(user='shirey@pitt.edu')
    >>> all([type(id) is str for id in filtered_uuids])
    True
    >>> all([len(id) == 32 for id in filtered_uuids])
    True
    '''
    if user:
        response = requests.get(f'{base_url}/entities/donors/created-by/{user}').json()
    else:
        response = requests.get(f'{base_url}/entities/donors').json()
    return response['uuids']
