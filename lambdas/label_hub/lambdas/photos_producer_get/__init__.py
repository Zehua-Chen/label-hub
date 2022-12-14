import sys

sys.path.append("/var/task/vendor")

import boto3
import json
import requests
from requests_aws4auth import AWS4Auth
import os
from aws_lambda_powertools.utilities.data_classes import event_source, APIGatewayProxyEvent

region = 'us-east-1'
service = 'es'
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key,
                   credentials.secret_key,
                   region,
                   service,
                   session_token=credentials.token)
host = 'https://' + os.environ['opensearchEndpointProducer']
index = 'photos'
url = host + '/' + index + '/_search'


@event_source(data_class=APIGatewayProxyEvent)
def handler(event: APIGatewayProxyEvent, context):
    access_token = event.headers['access-token']
    #get userid
    cog = boto3.client("cognito-idp", region_name=region)
    producer_id = cog.get_user(AccessToken=access_token)['Username']

    filter_month = '12'
    filter_label = None
    amount_high = None
    amount_low = None
    query = {
        "query": {
            "bool": {
                "must": [{
                    "term": {
                        "producerID.keyword": {
                            "value": producer_id
                        }
                    }
                }]
            }
        }
    }

    if filter_label:
        query["query"]["bool"]["must"].append(
            {"match": {
                "labels": filter_label
            }})
    if amount_low and amount_high:
        query["query"]["bool"]["must"].append(\
            {"range": {"price": {"gte": amount_low,"lte": amount_high}}})
    if filter_month:
        query["query"]["bool"]["must"].append(
            {"term": {
                "month.keyword": {
                    "value": filter_month
                }
            }})

    headers = {"Content-Type": "application/json"}
    r = requests.get(url,
                     auth=awsauth,
                     headers=headers,
                     data=json.dumps(query))
    response = r.json()['hits']['hits']
    return_obj = []
    for doc in response:
        d = {}
        d['filename'] = doc['_source']['objectKey']
        d['time'] = doc['_source']['createdTimestamp']
        d['amount'] = doc['_source']['price']
        d['tags'] = doc['_source']['labels']
        return_obj.append(d)
    return {
        'statusCode': 200,
        'body': json.dumps(return_obj),
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
    }
