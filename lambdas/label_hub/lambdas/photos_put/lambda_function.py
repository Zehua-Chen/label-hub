import sys

sys.path.append("/var/task/vendor")

from opensearchpy import OpenSearch, RequestsHttpConnection, AWSV4SignerAuth
import json
import urllib.parse
import boto3
from datetime import datetime
import os
from aws_lambda_powertools.utilities.data_classes import event_source, APIGatewayProxyEvent

s3 = boto3.client('s3')
USERID = 'dfsdfds111111'
PRICE = 100


@event_source(data_class=APIGatewayProxyEvent)
def lambda_handler(event: APIGatewayProxyEvent, context):
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'],
                                    encoding='utf-8')
    try:

        response = s3.get_object(Bucket=bucket, Key=key)
        rekog_labels = detect_labels(key, bucket)
        labels = []
        for label in rekog_labels:
            labels.append(label['Name'])
        metadata = s3.head_object(Bucket=bucket, Key=key)
        if 'x-amz-meta-customlabels' in metadata['ResponseMetadata'][
                'HTTPHeaders']:
            customlabel = metadata['ResponseMetadata']['HTTPHeaders'][
                'x-amz-meta-customlabels']
            list_customlabel = customlabel.split(', ')
            for e in list_customlabel:
                labels.append(e)
        timestamp = metadata['LastModified'].strftime("%Y-%m-%dT%H:%M:%S")
        json_obj = {
            "objectKey": key,
            "bucket": bucket,
            "createdTimestamp": timestamp,
            "year": metadata['LastModified'].strftime("%Y"),
            "month": metadata['LastModified'].strftime("%m"),
            "day": metadata['LastModified'].strftime("%d"),
            "producerID": USERID,
            "price": PRICE,
            "labels": labels
        }

        # upload the data to opensearch
        host = os.environ['opensearchEndpointProducer']
        region = 'us-east-1'
        credentials = boto3.Session().get_credentials()
        auth = AWSV4SignerAuth(credentials, region)
        index_name = 'photos'
        client = OpenSearch(hosts=[{
            'host': host,
            'port': 443
        }],
                            http_auth=auth,
                            use_ssl=True,
                            verify_certs=True,
                            connection_class=RequestsHttpConnection)

        response = client.index(index=index_name,
                                body=json_obj,
                                id=key,
                                refresh=True)
        return {'statusCode': 200, 'body': json.dumps(json_obj)}
    except Exception as e:
        print(e)
        print(
            'Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'
            .format(key, bucket))
        raise e


def detect_labels(photo, bucket):
    client = boto3.client('rekognition')
    response = client.detect_labels(
        Image={'S3Object': {
            'Bucket': bucket,
            'Name': photo
        }}, MaxLabels=10)
    return response['Labels']
