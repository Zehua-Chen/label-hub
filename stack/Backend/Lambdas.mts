import { Construct } from 'constructs';
import {
  Duration,
  aws_iam as iam,
  aws_s3 as s3,
  aws_opensearchservice as opensearch,
  aws_dynamodb as dynamodb,
  aws_lambda as lambda,
} from 'aws-cdk-lib';
import { LabelHubFunction } from '../utils.mjs';

export interface LambdasProps {
  region: string;
  photos: s3.Bucket;
  download: s3.Bucket;
  producer: opensearch.Domain;
  consumer: opensearch.Domain;
  userInfo: dynamodb.Table;
  executeRole: iam.Role;
}

class Lambdas extends Construct {
  photosGet: LabelHubFunction;
  photosPut: LabelHubFunction;
  photosProducerGet: LabelHubFunction;
  photosToS3: LabelHubFunction;
  incomeGet: LabelHubFunction;
  projectsGet: LabelHubFunction;
  projectsPut: LabelHubFunction;
  userInfoGet: LabelHubFunction;
  userInfoPut: LabelHubFunction;
  downloadGet: LabelHubFunction;
  buyGet: LabelHubFunction;

  constructor(scope: Construct, id: string, props: LambdasProps) {
    super(scope, id);

    const {
      region,
      executeRole,
      photos,
      download,
      producer,
      consumer,
      userInfo: table,
    } = props;

    const powertools = lambda.LayerVersion.fromLayerVersionArn(
      this,
      'PowerTools',
      `arn:aws:lambda:${region}:017000801446:layer:AWSLambdaPowertoolsPythonV2:16`
    );

    this.photosGet = new LabelHubFunction(this, 'PhotosGet', {
      module: 'photos_get',
      memorySize: 1024,
      timeout: Duration.seconds(30),
      role: executeRole,
      environment: {
        opensearchEndpointProducer: producer.domainEndpoint,
      },
      layers: [powertools],
    });

    this.photosPut = new LabelHubFunction(this, 'PhotosPut', {
      module: 'photos_put',
      memorySize: 1024,
      timeout: Duration.seconds(30),
      role: executeRole,
      environment: {
        opensearchEndpointProducer: producer.domainEndpoint,
      },
      layers: [powertools],
    });

    this.photosToS3 = new LabelHubFunction(this, 'PhotosToS3', {
      module: 'photos_to_s3',
      role: executeRole,
      memorySize: 1024,
      timeout: Duration.seconds(30),
      environment: {
        s3BucketName: photos.bucketName,
      },
      layers: [powertools],
    });

    this.incomeGet = new LabelHubFunction(this, 'IncomeGet', {
      module: 'income_get',
      memorySize: 1024,
      timeout: Duration.seconds(30),
      role: executeRole,
      environment: {
        opensearchEndpoint_consumer: consumer.domainEndpoint,
      },
      layers: [powertools],
    });

    this.projectsGet = new LabelHubFunction(this, 'ProjectsGet', {
      module: 'projects_get',
      memorySize: 1024,
      timeout: Duration.seconds(30),
      role: executeRole,
      environment: {
        opensearchEndpoint_consumer: consumer.domainEndpoint,
      },
      layers: [powertools],
    });

    this.projectsPut = new LabelHubFunction(this, 'ProjectsPut', {
      module: 'projects_put',
      memorySize: 1024,
      timeout: Duration.seconds(30),
      role: executeRole,
      environment: {
        opensearchEndpoint_consumer: consumer.domainEndpoint,
        opensearchEndpoint_producer: producer.domainEndpoint,
      },
      layers: [powertools],
    });

    this.photosProducerGet = new LabelHubFunction(this, 'PhotosProducerGet', {
      module: 'photos_producer_get',
      memorySize: 1024,
      timeout: Duration.seconds(30),
      role: executeRole,
      environment: {
        opensearchEndpointProducer: producer.domainEndpoint,
      },
      layers: [powertools],
    });

    this.userInfoGet = new LabelHubFunction(this, 'UserInfoGet', {
      module: 'userinfo_get',
      memorySize: 1024,
      timeout: Duration.seconds(30),
      role: executeRole,
      environment: {
        opensearchEndpoint_producer: producer.domainEndpoint,
        opensearchEndpoint_consumer: consumer.domainEndpoint,
        dynamodb_tableName: table.tableName,
      },
      layers: [powertools],
    });

    this.userInfoPut = new LabelHubFunction(this, 'UserInfoPut', {
      module: 'userinfo_put',
      memorySize: 1024,
      timeout: Duration.seconds(30),
      role: executeRole,
      environment: {
        opensearchEndpoint_producer: producer.domainEndpoint,
        opensearchEndpoint_consumer: consumer.domainEndpoint,
        dynamodb_tableName: table.tableName,
      },
      layers: [powertools],
    });

    this.downloadGet = new LabelHubFunction(this, 'DownloadGet', {
      module: 'download_get',
      memorySize: 1024,
      timeout: Duration.seconds(30),
      role: executeRole,
      environment: {
        opensearchEndpoint_consumer: consumer.domainEndpoint,
        s3Bucket_dest: download.bucketName,
      },
      layers: [powertools],
    });

    this.buyGet = new LabelHubFunction(this, 'BuyGet', {
      module: 'buy_get',
      memorySize: 1024,
      timeout: Duration.seconds(30),
      role: executeRole,
      layers: [powertools],
    });
  }
}

export default Lambdas;
