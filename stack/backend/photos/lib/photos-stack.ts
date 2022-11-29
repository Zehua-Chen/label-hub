import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import * as opensearch from 'aws-cdk-lib/aws-opensearchservice';

export class PhotosStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const executeRole = new iam.Role(this, 'photosRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });
    executeRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess"));
    executeRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonRekognitionFullAccess"));
    executeRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonOpenSearchServiceFullAccess"));
    
    const s3Bucket = new s3.Bucket(this, 'labelhub-photos', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    const openSearch = new opensearch.Domain(this, 'photos', {
      version: opensearch.EngineVersion.OPENSEARCH_1_0,
      enforceHttps: true,
      nodeToNodeEncryption: true,
      encryptionAtRest: {
        enabled: true,
      },
      fineGrainedAccessControl: {
        masterUserArn: executeRole.roleArn,
      },
      capacity: {
        masterNodeInstanceType: 't3.small.search',
      },
    });

    const lfPut = new lambda.Function(this, 'photos-put', {
      runtime: lambda.Runtime.PYTHON_3_9,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      handler: 'lambda_function.lambda_handler',
      role: executeRole,
      code: lambda.Code.fromAsset(path.join(__dirname, '/lf-photos')),
      environment: {
        opensearchEndpoint: openSearch.domainEndpoint,
      },
    });
    
    s3Bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(lfPut),
    );

    const lfGet = new lambda.Function(this, 'photos-get', {
      runtime: lambda.Runtime.PYTHON_3_9,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      handler: 'lambda_function.lambda_handler',
      role: executeRole,
      code: lambda.Code.fromAsset(path.join(__dirname, '/get-photos')),
      environment: {
        opensearchEndpoint: openSearch.domainEndpoint,
      },
    });

    const lfProducerGet = new lambda.Function(this, 'photos-producer-get', {
      runtime: lambda.Runtime.PYTHON_3_9,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      handler: 'lambda_function.lambda_handler',
      role: executeRole,
      code: lambda.Code.fromAsset(path.join(__dirname, '/get-producer-photos')),
      environment: {
        opensearchEndpoint: openSearch.domainEndpoint,
      },
    });
  }
}
