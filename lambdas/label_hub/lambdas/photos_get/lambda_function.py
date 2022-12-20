import sys

sys.path.append("/var/task/vendor")

import json
import boto3
import urllib
import os
import requests
from requests_aws4auth import AWS4Auth
from aws_lambda_powertools.utilities.data_classes import event_source, APIGatewayProxyEvent

BUCKET_URL = "https://s3.us-east-1.amazonaws.com"
region = 'us-east-1'
service = 'es'
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)


headers = { "Content-Type": "application/json" }

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

def query(labels, endpoint):
    endpoint = 'https://' + endpoint
    index = 'photos'
    url = endpoint + '/' + index + '/_search'
    query = {
        "size": 25,
        "query": {
            "match": {
                "labels": {
                    "query"     : ', '.join(labels),
                    "operator"  : "or",
                    "fuzziness" : "AUTO"
                }
            }
        }
    }
    print(query)
    
    r = requests.get(url, auth=awsauth, headers=headers, data=json.dumps(query))
    print(r.content)
    response = {
        "body" : json.loads(r.text)
    }
    
    return response

@event_source(data_class=APIGatewayProxyEvent)
def lambda_handler(event: APIGatewayProxyEvent, context):

    labels = [event['queryStringParameters']['labels']]

    # Search the photos OpenSearch index for results
    response = query(labels, os.environ['opensearchEndpointProducer'])

    results = get_images(response)
    print("Results")
    print(results)

    return {
        'statusCode': 200,
        'body': json.dumps(results),
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
    }
