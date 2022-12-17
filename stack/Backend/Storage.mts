import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';

export interface StorageProps {}

class Storage extends Construct {
  constructor(scope: Construct, id: string, props: StorageProps) {
    super(scope, id);

    this.photos = new s3.Bucket(this, 'Photos');
  }
}

export default Storage;
