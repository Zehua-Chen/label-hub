import { Construct } from 'constructs';
import {
  RemovalPolicy,
  aws_iam as iam,
  aws_s3 as s3,
  aws_dynamodb as dynamodb,
  aws_opensearchservice as opensearch,
} from 'aws-cdk-lib';

export interface StorageProps {}

class Storage extends Construct {
  photos: s3.Bucket;
  download: s3.Bucket;
  userInfo: dynamodb.Table;
  producer: opensearch.Domain;
  consumer: opensearch.Domain;

  constructor(scope: Construct, id: string, props: StorageProps) {
    super(scope, id);

    this.photos = new s3.Bucket(this, 'Photos', {
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    this.download = new s3.Bucket(this, 'Download', {
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    this.userInfo = new dynamodb.Table(this, 'UserInfo', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    this.producer = new opensearch.Domain(this, 'Producer', {
      version: opensearch.EngineVersion.OPENSEARCH_1_0,
      removalPolicy: RemovalPolicy.DESTROY,
      capacity: {
        dataNodeInstanceType: 't3.small.search',
        dataNodes: 1,
      },
    });

    this.consumer = new opensearch.Domain(this, 'Consumer', {
      version: opensearch.EngineVersion.OPENSEARCH_1_0,
      removalPolicy: RemovalPolicy.DESTROY,
      capacity: {
        dataNodeInstanceType: 't3.small.search',
        dataNodes: 1,
      },
    });
  }
}

export default Storage;
