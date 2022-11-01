import { RemovalPolicy, aws_s3 as s3, aws_iam as iam } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface WebProps {
  webBucketName: string;
}

export class Web extends Construct {
  constructor(scope: Construct, id: string, props: WebProps) {
    super(scope, id);

    const bucket = new s3.Bucket(this, 'FrontendHosting', {
      bucketName: props.webBucketName,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: '404.html',
    });

    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject'],
        principals: [new iam.AnyPrincipal()],
      })
    );
  }
}
