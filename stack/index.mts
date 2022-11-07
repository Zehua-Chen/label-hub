import * as cdk from 'aws-cdk-lib';
import { Web } from './web.mjs';

export class LableHubStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const webBucketName = new cdk.CfnParameter(this, 'WebBucketName', {
      type: 'String',
      default: 'coms6998-fa22-lable-hub-hosting',
      description: 'Name of the bucket to host the frontend',
    });

    new Web(this, 'Web', {
      webBucketName: webBucketName.valueAsString,
    });
  }
}

const app = new cdk.App();
new LableHubStack(app, 'LabelHub', { stackName: 'label-hub' });

app.synth();
