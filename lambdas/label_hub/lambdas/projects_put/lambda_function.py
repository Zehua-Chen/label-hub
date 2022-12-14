import sys

sys.path.append("/var/task/vendor")

import json
import boto3
import json
import requests
from requests_aws4auth import AWS4Auth
import os
from aws_lambda_powertools.utilities.data_classes import event_source, APIGatewayProxyEvent
cog = boto3.client("cognito-idp")
OPENSEARCH_consumer = os.environ['opensearchEndpoint_consumer']
OPENSEARCH_producer = os.environ['opensearchEndpoint_producer']
region = 'us-east-1'
service = 'es'
s3_client = boto3.client('s3')
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key,
                   credentials.secret_key,
                   region,
                   service,
                   session_token=credentials.token)

#producer Open Serch variables
host = 'https://' + OPENSEARCH_producer
index = 'photos'
url = host + '/' + index + '/_search'

#Consumer Open Seacrh variables
os_host = 'https://' + OPENSEARCH_consumer
os_index = 'projects'
os_type = '_doc'


def upload_to_os(photo_obj, key):
    print("FUNCTION: Open_Search...")
    os_url = os_host + '/' + os_index + '/' + os_type + '/' + key
    print("open_serch message")
    print(photo_obj)

    headers = {"Content-Type": "application/json"}
    print("Open Search Request Processing ...")
    try:
        rest = requests.post(os_url,
                             auth=awsauth,
                             headers=headers,
                             data=json.dumps(photo_obj))
        print(rest.content)
    except Exception as e:
        print("OPEN SEARCH STORE ERROR")
        print(e)


def valid_purchase(key):
    query = {"query": {"term": {"objectKey.keyword": {"value": key}}}}
    valid_url = os_host + '/' + os_index + '/_search'
    headers = {"Content-Type": "application/json"}

    try:
        r = requests.get(valid_url,
                         auth=awsauth,
                         headers=headers,
                         data=json.dumps(query))
        response = r.json()
        print(response)
        if 'hits' in response and response['hits']['hits']:
            return False
        else:
            return True
    except Exception as e:
        print(e)

        return False


@event_source(data_class=APIGatewayProxyEvent)
def lambda_handler(event: APIGatewayProxyEvent, context):

    assert event.body is not None

    body = json.loads(event.body)

    access_token = event.headers["access-token"]
    consumerID = cog.get_user(AccessToken=access_token)['Username']

    PhotoID = body['photoID']
    projectID = body['projectID']

    key = consumerID + "-" + PhotoID

    query = {"query": {"term": {"objectKey.keyword": {"value": PhotoID}}}}

    headers = {"Content-Type": "application/json"}
    try:
        r = requests.get(url,
                         auth=awsauth,
                         headers=headers,
                         data=json.dumps(query))
        response = r.json()['hits']['hits']
        print("response from producer")
        print(response)
    except Exception as e:
        print("unable to query producer endpoint")
        return {'statusCode': 404}
    """
    response = [{
        '_source':{
            'objectKey': 'abcd-1234',
            'bucket': 'my-bucket',
            'createdTimestamp': '12-03-2023',
            'producerID': '1234-5678',
            'price': 12,
            'labels':['cats','dogs','animals']
        }
    }]
    """

    for doc in response:
        if valid_purchase(key):
            json_obj = {
                "objectKey": key,
                "photoID": doc['_source']['objectKey'],
                "bucket": doc['_source']['bucket'],
                "createdTimestamp": doc['_source']['createdTimestamp'],
                "producerID": doc['_source']['producerID'],
                "price": doc['_source']['price'],
                "consumerID": consumerID,
                "projectID": projectID,
                "labels": doc['_source']['labels']
            }
            print("created json object")
            print(json_obj)

            upload_to_os(json_obj, key)
        else:
            print("No")

    return {
        'statusCode': 200,
        'body': json.dumps('New Photo added to Project: ' + key),
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
    }
