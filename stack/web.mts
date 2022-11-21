import { RemovalPolicy, aws_s3 as s3 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface WebProps {}

export class Web extends Construct {
  hosting: s3.Bucket;

  constructor(scope: Construct, id: string, props: WebProps) {
    super(scope, id);

    this.hosting = new s3.Bucket(this, 'Hosting', {
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: '404.html',
      websiteRoutingRules: [
        {
          condition: {
            keyPrefixEquals: '/app',
          },
          replaceKey: s3.ReplaceKey.with('/app/index.html'),
        },
      ],
    });

    this.hosting.grantPublicAccess();
  }
}
