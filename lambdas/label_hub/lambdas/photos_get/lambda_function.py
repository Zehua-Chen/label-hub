import sys
sys.path.append("/var/task/vendor")

import json
import boto3
from opensearch import opensearch
import urllib
import os

BUCKET_URL = "https://s3.us-east-1.amazonaws.com"


def build_photo_object(object_key: str, bucket: str, labels: str) -> dict:
    photo = {"url": f"{BUCKET_URL}/{bucket}/{object_key}", "labels": labels}

    return photo


def get_images(response: dict):
    print(type(response))
    body = response["body"]
    hits = body["hits"]["hits"]

    results = []
    for hit in hits:
        source = hit["_source"]

        object_key = source.get("objectKey")
        bucket = source.get("bucket")
        labels = source.get("labels")

        photo = build_photo_object(object_key, bucket, labels)
        results.append(photo)

    return {"results": results}


def get_tokens(event: dict) -> str:
    t = event["q"]
    t = t.strip().lower()

    return t.split(" ")


def lambda_handler(event, context):
    print(event)

    labels = get_tokens(event)

    print("Labels")
    print(labels)

    # Search the photos OpenSearch index for results
    response = opensearch.query(labels,
                                os.environ['opensearchEndpointProducer'])

    results = get_images(response)
    print("Results")
    print(results)

    return results
