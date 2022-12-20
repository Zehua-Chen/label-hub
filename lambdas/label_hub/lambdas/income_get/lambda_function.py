import sys

sys.path.append("/var/task/vendor")

import boto3
import json
import requests
from requests_aws4auth import AWS4Auth
import os

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


def lambda_handler(event, context):
    idtoken = 'string'
    #get userid
    # cog = boto3.client("cognito-idp", region_name=region)
    # producerid = cog.get_user(AccessToken=idtoken)['Username']
    producerID = 'dfsdfds111111'
    query = {
        "query": {
            "bool": {
                "must": [{
                    "term": {
                        "producerID.keyword": {
                            "value": producerID
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
