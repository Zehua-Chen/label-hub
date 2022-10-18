import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class Web extends Construct {
  constructor(scope: Construct, id: string, props: unknown) {
    super(scope, id);
    new cdk.aws_s3.Bucket(scope, 'label-hub-hosting', {});
  }
}
