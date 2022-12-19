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
host = 'https://' + os.environ['opensearchEndpointProducer']
index = 'photos'
url = host + '/' + index + '/_search'

def lambda_handler(event, context):
    idtoken = 'string'
    #get userid
    # cog = boto3.client("cognito-idp", region_name=region)
    # producerid = cog.get_user(AccessToken=idtoken)['Username']
    producerid = 'dfsdfds111111'
    filter_month = '12'
    filter_label = None
    amount_high = None
    amount_low = None
    query = {
        "query": {
            "bool":{
                "must":[
                    {"term": {
                        "producerID.keyword": {"value": producerid}
                        }
                    }
                ]
            }
        }
    }

    if filter_label:
        query["query"]["bool"]["must"].append({"match": {"labels": filter_label}})
    if amount_low and amount_high:
        query["query"]["bool"]["must"].append(\
            {"range": {"price": {"gte": amount_low,"lte": amount_high}}})
    if filter_month:
        query["query"]["bool"]["must"].append({"term": {"month.keyword": {"value": filter_month}}})

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