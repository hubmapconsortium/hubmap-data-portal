from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from dataportal.models import *


class DataportalModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        DataType.objects.create(name="scdna-seq")
        Tissue.objects.create(name="Brain")
        Institution.objects.create(name="CMU")
        ScRnaSeqStudyCDNA.objects.create(data_type_id=1, institution_id=1, tissue_id=1,
                             read_count_total=60, cell_count=12, read_count_aligned=8)

    def test_subclass(self):
        study = Study.objects.get(id=1)
        expected_object_name = f'{study.subclass}'
        self.assertEquals(expected_object_name, 'sc rna seq study cdna')

    def test_institution_content(self):
        study = Study.objects.get(id=1)
        expected_object_name = f'{study.institution}'
        self.assertEquals(expected_object_name, 'CMU')