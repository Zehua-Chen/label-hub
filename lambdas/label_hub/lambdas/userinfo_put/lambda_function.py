import json
import boto3
import os

client = boto3.client('dynamodb')
tableName = host = os.environ['dynamodb_tableName']


def lambda_handler(event, context):
    #get userid
    # cog = boto3.client("cognito-idp", region_name=region)
    # user_id = cog.get_user(AccessToken=idtoken)['Username']

    user_id = 'asdf-hgd'
    first = 'fatima'
    last = 'dantsoho'
    title = 'web dev'
    aboutme = 'this is a description'
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
