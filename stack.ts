import * as cdk from 'aws-cdk-lib';
import { Web } from './web/cdk';

export class LableHubStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Web(this, 'web', {});
  }
}

const app = new cdk.App();
new LableHubStack(app, 'label-hub');

app.synth();
