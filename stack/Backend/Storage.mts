import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';

class Storage extends Construct {
  photos: s3.Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.photos = new s3.Bucket(this, 'Photos');
  }
}

export default Storage;
