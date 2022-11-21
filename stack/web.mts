import {
  RemovalPolicy,
  aws_s3 as s3,
  aws_s3_deployment as deployment,
  aws_iam as iam,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import * as fs from 'fs';

export interface WebProps {
  source?: string;
}

export class Web extends Construct {
  hosting: s3.Bucket;

  constructor(scope: Construct, id: string, props: WebProps) {
    super(scope, id);

    const { source = path.join('web', 'public') } = props;

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

    if (fs.existsSync(source)) {
      new deployment.BucketDeployment(this, 'Deployment', {
        sources: [deployment.Source.asset(source)],
        destinationBucket: this.hosting,
      });
    }
  }
}
