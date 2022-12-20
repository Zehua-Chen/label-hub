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
awsauth = AWS4Auth(
    credentials.access_key,
    credentials.secret_key,
    region,
    service,
    session_token=credentials.token,
)
host = 'https://' + os.environ['opensearchEndpoint_consumer']
index = 'projects'
url = host + '/' + index + '/_search'
cog = boto3.client("cognito-idp")


@event_source(data_class=APIGatewayProxyEvent)
def lambda_handler(event: APIGatewayProxyEvent, context):
    access_token = event.headers["access-token"]
    #get userid

    producer_id = cog.get_user(AccessToken=access_token)['Username']
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
    headers = {"Content-Type": "application/json"}
    income = 0

    try:
        r = requests.get(
            url,
            auth=awsauth,
            headers=headers,
            data=json.dumps(query),
        )
        response = r.json()['hits']['hits']
        for doc in response:
            price = doc['_source']['price']
            income += price

    except Exception as e:
        print("Unable to connect to Open Search Consumer Instance")
        print(e)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'income': income})
    }
