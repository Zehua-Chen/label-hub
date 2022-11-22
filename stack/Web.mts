import {
  RemovalPolicy,
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface WebProps {}

class Web extends Construct {
  hosting: s3.Bucket;
  distribution: cloudfront.Distribution;

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

    this.distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(this.hosting),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
      },
    });
  }
}

export default Web;
