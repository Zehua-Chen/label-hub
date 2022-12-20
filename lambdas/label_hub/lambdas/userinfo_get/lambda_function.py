import sys

sys.path.append("/var/task/vendor")

import json
import boto3
import os
from aws_lambda_powertools.utilities.data_classes import event_source, APIGatewayProxyEvent

region = 'us-east-1'
client = boto3.client('dynamodb')
table_name = host = os.environ['dynamodb_tableName']


@event_source(data_class=APIGatewayProxyEvent)
def lambda_handler(event: APIGatewayProxyEvent, context):
    access_token = event.headers['access-token']

    cog = boto3.client("cognito-idp", region_name=region)
    user_id = cog.get_user(AccessToken=access_token)['Username']

    try:
        data = client.get_item(TableName=table_name, Key={'id': {'S': user_id}})
        return {
            'statusCode': 200,
            'body': json.dumps(data['Item']),
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
        }
    except Exception as e:
        print('User info does not exist')
        print(e)
