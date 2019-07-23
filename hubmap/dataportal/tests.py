from django.test import TestCase
from rest_framework.test import APIClient

from .models import *
from .views import StudyDetailView

# TODO : complete tests
class DataportalModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        print('Creating test data')
        dt = DataType.objects.create(name="scdna-seq")
        t = Tissue.objects.create(name="Brain")
        i = Institution.objects.create(name="CMU")
        ScRnaSeqStudyCDNA.objects.create(
            data_type=dt,
            institution=i,
            tissue=t,
            read_count_total=60,
            cell_count=12,
            read_count_aligned=8,
        )
        print('Test data created')

    def test_subclass(self):
        study = Study.objects.first()
        expected_object_name = f'{study.subclass}'
        self.assertEquals(expected_object_name, 'sc rna seq study cdna')

    def test_institution_content(self):
        study = Study.objects.first()
        expected_object_name = f'{study.institution}'
        self.assertEquals(expected_object_name, 'CMU')

    def test_django_rest_framework_api(self):
        client = APIClient()
        response = client.get('/api/')
        self.assertEquals(response.status_code, 200)

        client = APIClient()
        response = client.get('/api/1/')
        self.assertEquals(response.status_code, 200)

        client = APIClient()
        response = client.get('/api/search/?search=Brain')
        self.assertEquals(response.status_code, 200)

    def test_views(self):
        StudyDetailView.as_view()
        # At the moment, this test "passing" means it doesn't throw an exception
