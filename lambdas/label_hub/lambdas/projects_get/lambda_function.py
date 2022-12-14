import sys

sys.path.append("/var/task/vendor")

import json
import os

import boto3
import requests
from requests_aws4auth import AWS4Auth
from aws_lambda_powertools.utilities.data_classes import event_source, APIGatewayProxyEvent
cog = boto3.client("cognito-idp")
OPENSEARCH_consumer = os.environ["opensearchEndpoint_consumer"]
region = 'us-east-1'
credentials = boto3.Session().get_credentials()
service = 'es'
awsauth = AWS4Auth(credentials.access_key,
                   credentials.secret_key,
                   region,
                   service,
                   session_token=credentials.token)


def open_search(projectID, consumerID):
    print("FUNCTION: Open_Search...")
    # The OpenSearch domain endpoint with https://
    os_host = 'https://' + OPENSEARCH_consumer
    os_index = 'projects'
    os_url = os_host + '/' + os_index + '/_search'

    print("open_serch message")
    results = {'photos': []}

    query = {"query": {"term": {"projectID.keyword": {"value": projectID}}}}
    print("SENDING query ...")
    print(query)

    headers = {"Content-Type": "application/json"}
    print("Open Search Request Processing ...")
    rest = requests.get(os_url,
                        auth=awsauth,
                        headers=headers,
                        data=json.dumps(query))

    try:
        print(rest.json())
        photos = rest.json()["hits"]["hits"]
        print(photos)

        for photo in photos:
            if (consumerID == photo['_source']['consumerID']):
                print("yes")
                d = {}
                d['purchaseID'] = photo['_source']['objectKey'],
                d['filename'] = photo['_source']['photoID']
                d['time'] = photo['_source']['createdTimestamp']
                d['amount'] = photo['_source']['price']
                d['tags'] = photo['_source']['labels']
                d['consumerID'] = photo['_source']['consumerID']
                d['producerID'] = photo['_source']['producerID']
                d['projectID'] = photo['_source']['projectID']
                results['photos'].append(d)
    except Exception as e:
        print("Error finding open search hits")
        print(e)

    print('FINAL RESULTS JSON :')
    print(results)

    return results


@event_source(data_class=APIGatewayProxyEvent)
def lambda_handler(event: APIGatewayProxyEvent, context):

    assert event.query_string_parameters is not None

    access_token = event.headers["access-token"]
    consumerID = cog.get_user(AccessToken=access_token)['Username']
    projectID = event.query_string_parameters['project-id']

    results = open_search(projectID, consumerID)
    return {
        'statusCode': 200,
        'body': json.dumps(results),
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
    }
