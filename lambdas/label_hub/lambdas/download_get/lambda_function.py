import boto3
import json
import requests
from requests_aws4auth import AWS4Auth
import os
region = 'us-east-1'

s3_client=boto3.client('s3')

service = 'es'
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service,
session_token=credentials.token)
host = 'https://' + os.environ['opensearchEndpoint_consumer']
index = 'projects'
url = host + '/' + index + '/_search'


destination_bucket_name= os.environ['s3Bucket_dest']


def lambda_handler(event, context):
    idtoken = 'string'
    #get userid
    # cog = boto3.client("cognito-idp", region_name=region)
    # producerid = cog.get_user(AccessToken=idtoken)['Username']
    projectID = 'projectID-123'
    consumerID = '8765-4321'
    prefix = projectID + '/'
    query = {
        "query": {
            "bool":{
                "must":[
                    {"term": {
                        "projectID.keyword": {"value": projectID}
                        }
                    },                     
                    {"term": {
                        "consumerID.keyword": {"value": consumerID}
                        }
                    }, 
                ]
            }
        }
    }
    headers = { "Content-Type": "application/json" }
    try:
        print(url)
        r = requests.get(url, auth=awsauth, headers=headers, data=json.dumps(query))
        response = r.json()['hits']['hits']
        print(response)
    except Exception as e:
        print(e)
        print("Unable to Connect with Consumer Open Search Enpoint")
        
    return_url = []
    for doc in response:
        print(doc)
        source_bucket_name=doc['_source']['bucket']
        file_name=doc['_source']['photoID']
        
        copy_object={'Bucket':source_bucket_name,'Key':file_name}
        s3_client.copy_object(CopySource=copy_object,Bucket=destination_bucket_name,Key=prefix+file_name)
        return_url.append("https://%s.s3.amazonaws.com/%s%s" % (destination_bucket_name, prefix, file_name))
    return {
        'photosUrl': return_url
    }