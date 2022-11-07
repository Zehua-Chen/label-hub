import {
  RemovalPolicy,
  aws_s3 as s3,
  aws_s3_deployment as deployment,
  aws_iam as iam,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';

export interface WebProps {
  webBucketName: string;
}

export class Web extends Construct {
  hosting: s3.Bucket;

  constructor(scope: Construct, id: string, props: WebProps) {
    super(scope, id);

    this.hosting = new s3.Bucket(this, 'Hosting', {
      bucketName: props.webBucketName,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: '404.html',
    });

    this.hosting.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject'],
        principals: [new iam.AnyPrincipal()],
      })
    );

    new deployment.BucketDeployment(this, 'Deployment', {
      sources: [deployment.Source.asset(path.join('web', 'public'))],
      destinationBucket: this.hosting,
    });
  }
}
