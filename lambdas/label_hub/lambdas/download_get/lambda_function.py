import sys

sys.path.append("/var/task/vendor")

import boto3
import json
import requests
from requests_aws4auth import AWS4Auth
import os
import base64
from aws_lambda_powertools.utilities.data_classes import event_source, APIGatewayProxyEvent

region = 'us-east-1'

s3_client = boto3.client('s3')

service = 'es'
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key,
                   credentials.secret_key,
                   region,
                   service,
                   session_token=credentials.token)
host = 'https://' + os.environ['opensearchEndpoint_consumer']
index = 'projects'
url = host + '/' + index + '/_search'
s3 = boto3.resource('s3')

destination_bucket_name = os.environ['s3Bucket_dest']
cog = boto3.client("cognito-idp")


@event_source(data_class=APIGatewayProxyEvent)
def lambda_handler(event: APIGatewayProxyEvent, context):
    access_token = event.headers['access-token']
    consumer_id = cog.get_user(AccessToken=access_token)['Username']
    project_id = event.query_string_parameters['project-id']

    prefix = project_id + '/'
    query = {
        "query": {
            "bool": {
                "must": [
                    {
                        "term": {
                            "projectID.keyword": {
                                "value": project_id
                            }
                        }
                    },
                    {
                        "term": {
                            "consumerID.keyword": {
                                "value": consumer_id
                            }
                        }
                    },
                ]
            }
        }
    }
    headers = {"Content-Type": "application/json"}

    try:
        url = host + '/' + index + '/_search'
        r = requests.get(url,
                         auth=awsauth,
                         headers=headers,
                         data=json.dumps(query))
        response = r.json()['hits']['hits']
        print(response)
    except Exception as e:
        print(e)
        print("Unable to Connect with Consumer Open Search Enpoint")
        raise

    return_obj = []
    for doc in response:
        print(doc)
        source_bucket_name = doc['_source']['bucket']
        file_name = doc['_source']['photoID']
        key = prefix + file_name
        copy_object = {'Bucket': source_bucket_name, 'Key': file_name}
        s3_client.copy_object(CopySource=copy_object,
                              Bucket=destination_bucket_name,
                              Key=key)
        response = s3_client.get_object(Bucket=destination_bucket_name,
                                        Key=key)
        print("Response from s3 : ", response)
        image_file_to_be_downloaded = response['Body'].read()
        return_obj.append(base64.b64encode(image_file_to_be_downloaded))

    #location = s3_client.get_bucket_location(Bucket=destination_bucket_name)['LocationConstraint']
    #url = "https://s3-%s.amazonaws.com/%s/%s" % (location, destination_bucket_name, prefix)
    return {
        'statusCode': 200,
        'body': return_obj,
        'isBase64Encoded': True,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
    }
