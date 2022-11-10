import * as cdk from 'aws-cdk-lib';
import { Backend } from './backend.mjs';
import { DevOps } from './devops.mjs';
import { Web } from './web.mjs';

export class LableHubStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Web(this, 'Web', {});
    new Backend(this, 'Backend', {});
    new DevOps(this, 'DevOps', {});
  }
}

const app = new cdk.App();
new LableHubStack(app, 'LabelHub', { stackName: 'LabelHub' });

app.synth();
