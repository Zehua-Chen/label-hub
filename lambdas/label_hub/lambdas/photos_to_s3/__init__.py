import sys

sys.path.append("/var/task/vendor")

import os
import json
import boto3
import base64
from aws_lambda_powertools.utilities.data_classes import event_source, APIGatewayProxyEvent
from aws_lambda_powertools.logging import Logger

s3 = boto3.client('s3')
logger = Logger()

@logger.inject_lambda_context
@event_source(data_class=APIGatewayProxyEvent)
def handler(event: APIGatewayProxyEvent, context):
    assert event.body is not None

    data = json.loads(event.body)

    image = data['file']

    image = image[image.find(",") + 1:]
    dec = base64.b64decode(image + "===")


    #get userid
    cog = boto3.client("cognito-idp", region_name='us-east-1')
    producerid = cog.get_user(AccessToken=data['id_token'])['Username']

    s3.put_object(Bucket=os.environ['s3BucketName'], Key=data['filename'], \
        Body=dec, Metadata={'labels':",".join(data['labels']), 'producerid': producerid})
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'successful lambda function call'}),
        'headers': {
            'Access-Control-Allow-Origin': '*'
        }
    }
