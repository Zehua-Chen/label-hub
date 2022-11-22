import * as cdk from 'aws-cdk-lib';
import * as pipelines from 'aws-cdk-lib/pipelines';
import * as process from 'process';
import { Construct } from 'constructs';
import Backend from './Backend/index.mjs';
import DevOps from './DevOps.mjs';
import Web from './Web.mjs';

export class LableHubStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cognitoDomain = new cdk.CfnParameter(this, 'CognitoDomain', {
      type: 'String',
    });

    const web = new Web(this, 'Web', {});
    const backend = new Backend(this, 'Backend', {
      authentication: {
        cognitoDomain: cognitoDomain.valueAsString,
        webURL: `https://${web.distribution.distributionDomainName}`,
      },
    });

    new DevOps(this, 'DevOps', {});

    new cdk.CfnOutput(this, 'CognitoClientId', {
      value: backend.authentication.client.userPoolClientId,
    });

    new cdk.CfnOutput(this, 'WebURL', {
      value: `https://${web.distribution.distributionDomainName}`,
    });
  }
}

export class LabelHubStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id);

    new LableHubStack(this, 'LabelHub', {});
  }
}

/**
 * Stack with build pipeline
 */
export class LabelHubPipeline extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.connection(
          'Zehua-Chen/label-hub',
          'main',
          {
            connectionArn: process.env.CODE_STAR_CONNECTION ?? '',
          }
        ),
        installCommands: ['npm install -g pnpm'],
        commands: [
          'pip install --target lambdas/vendor -e lambdas',
          'pnpm install',
          'pnpm synth',
        ],
      }),
    });

    pipeline.addStage(new LabelHubStage(this, 'Production'));
  }
}

const app = new cdk.App();
new LabelHubPipeline(app, 'LabelHubPipeline', {});
new LabelHubStage(app, 'Development');

app.synth();
