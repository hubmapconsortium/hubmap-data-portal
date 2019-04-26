from django.utils.functional import LazyObject
from django.core.paginator import Paginator, PageNotAnInteger, Page, EmptyPage
from elasticsearch_dsl import Search, Q,FacetedSearch, TermsFacet, DateHistogramFacet

from .documents import StudyDocument

class StudySearch(FacetedSearch):
    doc_types = [StudyDocument, ]
    index = "studies"
    fields = ['subclass','creation_time']
    facets = {
        'subclass':TermsFacet(field='subclass'),
        'studies_by_month':DateHistogramFacet(field ='creation_time', interval='month'),
        'studies_by_week': DateHistogramFacet(field='creation_time', interval='week'),
        'studies_by_day': DateHistogramFacet(field='creation_time', interval='day'),
        'studies_by_hour': DateHistogramFacet(field='creation_time', interval='hour')
    }

    def search(self):
        # override methods to add custom pieces
        s = super().search()
        return s.filter('range', creation_time={'lte': 'now/h'})

# ss = StudySearch()
# search_response = ss.execute()

# for hit in search_response:
#     print(hit.meta.score, hit)

# for (subclass, count, selected) in search_response.facets.subclass:
#     print('tag', '(SELECTED):' if selected else ':', count)
#
# for (month, count, selected) in search_response.facets.studies_by_month:
#     print(month.strftime('%B %Y'), '(SELECTED) :' if selected else ':', count)
# for (week, count, selected) in search_response.facets.studies_by_week:
#     print(week.strftime('%B %Y'), '(SELECTED) :' if selected else ':', count)
#
# for (day, count, selected) in search_response.facets.studies_by_day:
#     print(day.strftime('%B %Y'), '(SELECTED) :' if selected else ':', count)
#
# for (hour, count, selected) in search_response.facets.studies_by_hour:
#     print(hour.strftime('%B %Y'), '(SELECTED) :' if selected else ':', count)


class SearchResults(LazyObject):
    def __init__(self, search_instance):
        self._wrapped  = search_instance

    def __len__(self):
        return self._wrapped.count()

    def __getitem__(self, index):
        search_hits = self._wrapped[index]
        if isinstance(index, slice):
            search_hits = list(search_hits)
        return search_hits
