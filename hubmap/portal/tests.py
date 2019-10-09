from django.test import RequestFactory, TestCase

# Create your tests here.
from .views import details, entities, index, listall


class PortalViewsTestCase(TestCase):
    def setUp(self) -> None:
        self.factory = RequestFactory()
        self.request = self.factory.request()
        self.entity_type = 'donor'
        self.hubmap_id = 4
        pass

    def test_home_page(self):
        response = index(self.request)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        pass

    def test_list_entities_page(self):
        response = listall(self.request)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        pass

    def test_entities_by_type_page(self):
        response = entities(self.request, self.entity_type)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        pass

    def test_browse_entity_detail_page(self):
        response = details(self.request, self.entity_type, self.hubmap_id)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)
        pass
