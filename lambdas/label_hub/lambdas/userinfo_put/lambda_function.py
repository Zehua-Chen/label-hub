import sys

sys.path.append("/var/task/vendor")

import json
import boto3
import os
from aws_lambda_powertools.utilities.data_classes import event_source, APIGatewayProxyEvent

client = boto3.client('dynamodb')
table_name = host = os.environ['dynamodb_tableName']
cog = boto3.client("cognito-idp")


@event_source(data_class=APIGatewayProxyEvent)
def lambda_handler(event: APIGatewayProxyEvent, context):
    #get userid
    # cog = boto3.client("cognito-idp", region_name=region)
    # user_id = cog.get_user(AccessToken=idtoken)['Username']
    assert event.body is not None

    body = json.loads(event.body)

    access_token = event.headers["access-token"]
    user_id = cog.get_user(AccessToken=access_token)['Username']

    first = body['first']
    last = body['last']
    title = body['title']
    email = body['email']
    aboutme = body['aboutme']
    projectID = body['projectID']

    try:
        data = client.put_item(
            TableName=table_name,
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
                    'S': email
                },
                'aboutme': {
                    'S': aboutme
                },
                'projectID': {
                    'S': projectID
                }
            },
        )

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
