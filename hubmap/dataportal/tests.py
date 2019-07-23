from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from dataportal.models import *
from rest_framework.test import APIRequestFactory, RequestsClient

from dataportal.views import StudyListView, StudyDetailView

#test coverage: 76% files and 87% lines : 5/25/2019
#TODO : complete tests
class DataportalModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        print('Creating test data')
        DataType.objects.create(name="scdna-seq")
        Tissue.objects.create(name="Brain")
        Institution.objects.create(name="CMU")
        ScRnaSeqStudyCDNA.objects.create(data_type_id=1, institution_id=1, tissue_id=1,
                             read_count_total=60, cell_count=12, read_count_aligned=8)
        print('Test data created')

    def test_subclass(self):
        study = Study.objects.get(id=1)
        expected_object_name = f'{study.subclass}'
        self.assertEquals(expected_object_name, 'sc rna seq study cdna')

    def test_institution_content(self):
        study = Study.objects.get(id=1)
        expected_object_name = f'{study.institution}'
        self.assertEquals(expected_object_name, 'CMU')

    def test_django_rest_framework_api(self):
        client = RequestsClient()
        response = client.get('http://127.0.0.1:8000/api/')
        assert response.status_code == 200
        print(response)

        client = RequestsClient()
        response = client.get('http://127.0.0.1:8000/api/1/')
        assert response.status_code == 200
        print(response)

        client = RequestsClient()
        response = client.get('http://127.0.0.1:8000/api/search/?search=Brain')
        assert response.status_code == 200
        print(response)

    def test_views(self):
        factory = APIRequestFactory()
        study = Study.objects.get(id=1)
        view = StudyDetailView.as_view()
        print(view)
