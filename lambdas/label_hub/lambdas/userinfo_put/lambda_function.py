import sys

sys.path.append("/var/task/vendor")

import json
import boto3
import os

client = boto3.client('dynamodb')
tableName = host = os.environ['dynamodb_tableName']
region = 'us-east-1'

def lambda_handler(event, context):
    #get userid
    # cog = boto3.client("cognito-idp", region_name=region)
    # user_id = cog.get_user(AccessToken=idtoken)['Username']
    body = json.loads(event['body'])
    idtoken = body['idtoken']
    cog = boto3.client("cognito-idp", region_name=region)
    user_id = cog.get_user(AccessToken=idtoken)['Username']
    first = body['first']
    last = body['last']
    title = body['title']
    aboutme = body['aboutme']
    projectID = body['ProjectID']
    try:
        data = client.put_item(TableName=tableName,
                               Item={
                                   'id': {
                                       'S': user_id
                                   },
                                   'firstname': {
                                       'S': first
                                   },
                                   'lastname': {
                                       'S': last
                                   },
                                   'title': {
                                       'S': title
                                   },
                                   'email': {
                                       'S': title
                                   },
                                   'aboutme': {
                                       'S': aboutme
                                   },
                                   'projectID':{
                                        'S': projectID
                                   }
                               })

        response = {
            'statusCode': 200,
            'body': 'successfully created item!',
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }
        return response
    except Exception as e:
        print('Error Inserting client info')
        print(e)
