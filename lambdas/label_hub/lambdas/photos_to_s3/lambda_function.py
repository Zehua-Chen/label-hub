import sys
sys.path.append("/var/task/vendor")

import os
import json
import boto3
import base64

s3 = boto3.client('s3')


def lambda_handler(event, context):

    if event['httpMethod'] == 'PUT':
        data = json.loads(event['body'])

        image = data['file']

        image = image[image.find(",") + 1:]
        dec = base64.b64decode(image + "===")

        #get userid
        cog = boto3.client("cognito-idp", region_name='us-east-1')
        producerid = cog.get_user(AccessToken=data['id_token'])['Username']

        s3.put_object(Bucket=os.environ['s3BucketName'], Key=data['filename'], \
            Body=dec, Metadata={'labels':str(data['labels']), 'producerid': producerid})
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'successful lambda function call'}),
            'headers': {
                'Access-Control-Allow-Origin': '*'
            }
        }
