"""
A lambda function for testing label_hub.infrastructure entities
"""
import json
from unittest import TestCase, TestSuite, TextTestRunner, defaultTestLoader


class SampleTest(TestCase):

    def test_sample(self) -> None:
        self.assertEqual(1, 2)

    def test_another(self) -> None:
        self.assertEqual(1, 1)


def handler(_event, _context):
    """
    Test infrastructure handlers
    Args:
        _event:
        _context:

    Returns:
    """
    suite = TestSuite()
    suite.addTest(defaultTestLoader.loadTestsFromTestCase(SampleTest))

    runner = TextTestRunner()
    result = runner.run(suite)

    if len(result.failures) > 0 or len(result.errors) > 0:
        return {"statusCode": 500, "body": json.dumps("test fails")}

    return {"statusCode": 200, "body": json.dumps("test passes")}
