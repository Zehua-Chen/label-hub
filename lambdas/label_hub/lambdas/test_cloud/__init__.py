"""
A lambda function for tests that must run in the cloud
"""
import json
from unittest import TestCase, TestSuite, TextTestRunner, defaultTestLoader


class LambdaAssumptionsTest(TestCase):

    def test_lambdas_task_root(self) -> None:
        self.assertEqual(__file__,
                         "/var/task/label_hub/lambdas/test_cloud/__init__.py")


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
    suite.addTest(
        defaultTestLoader.loadTestsFromTestCase(LambdaAssumptionsTest))
    suite.addTest(defaultTestLoader.loadTestsFromTestCase(SampleTest))

    runner = TextTestRunner()
    result = runner.run(suite)

    if len(result.failures) > 0 or len(result.errors) > 0:
        return {"statusCode": 500, "body": json.dumps("test fails")}

    return {"statusCode": 200, "body": json.dumps("test passes")}
