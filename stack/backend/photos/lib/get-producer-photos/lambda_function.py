import boto3
import json
import requests
from requests_aws4auth import AWS4Auth
import os
region = 'us-east-1'
service = 'es'
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service,
session_token=credentials.token)
host = 'https://' + os.environ['opensearchEndpoint']
index = 'photos'
url = host + '/' + index + '/_search'

def lambda_handler(event, context):
    idtoken = 'string'
    #get userid
    # cog = boto3.client("cognito-idp", region_name=region)
    # producerid = cog.get_user(AccessToken=idtoken)['Username']
    producerid = '%$#^&%$&%$$'

    query = {
        "query": {
            "term": {
                "producerID.keyword": {
                    "value": producerid
                    }
            }
        }
    }
    headers = { "Content-Type": "application/json" }
    r = requests.get(url, auth=awsauth, headers=headers, data=json.dumps(query))
    response = r.json()['hits']['hits']
    return_obj = []
    for doc in response:
        d = {}
        d['filename'] = doc['_source']['objectKey']
        d['time'] = doc['_source']['createdTimestamp']
        d['amount'] = doc['_source']['price']
        d['tags'] = doc['_source']['labels']
        return_obj.append(d)
    return return_obj