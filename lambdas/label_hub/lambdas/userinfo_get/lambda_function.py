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
  try:
      data = client.get_item(
        TableName= tableName,
        Key={
            'id': {
              'S': user_id
            }
        }
      )
      
      return data['Item']
  except Exception as e:
      print('User info does not exist')
      print(e)
  