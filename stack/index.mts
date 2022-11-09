import * as cdk from 'aws-cdk-lib';
import { Web } from './web.mjs';

export class LableHubStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Web(this, 'Web', {});
  }
}

const app = new cdk.App();
new LableHubStack(app, 'LabelHub', { stackName: 'label-hub' });

app.synth();
