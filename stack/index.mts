import * as cdk from 'aws-cdk-lib';
import * as pipelines from 'aws-cdk-lib/pipelines';
import * as path from 'path';
import { Construct } from 'constructs';
import Backend from './Backend/index.mjs';
import DevOps from './DevOps.mjs';
import Web from './Web.mjs';

export class LableHubStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cognitoDomain = new cdk.CfnParameter(this, 'CognitoDomain', {
      type: 'String',
      description: 'Cognito Domain for hosted Authentication UI',
    });

    const webLocalURL = new cdk.CfnParameter(this, 'WebLocalURL', {
      type: 'String',
      default: 'http://localhost:8000',
      description: 'Address at which to access the local development server',
    });

    const webAuthCallBackPath = new cdk.CfnParameter(
      this,
      'WebAuthCallbackPath',
      {
        type: 'String',
        default: 'app',
        description:
          'the URL path (not scheme or host) at which hosted authentication UI will callback at',
      }
    );

    const web = new Web(this, 'Web', {});

    const backend = new Backend(this, 'Backend', {
      region: this.region,
      authentication: {
        cognitoDomain: cognitoDomain.valueAsString,
        webProductionAuthCallbackURL: cdk.Fn.join('/', [
          cdk.Fn.join('', [
            'https://',
            web.distribution.distributionDomainName,
          ]),
          webAuthCallBackPath.valueAsString,
        ]),
        webLocalAuthCallbackURL: cdk.Fn.join('/', [
          webLocalURL.valueAsString,
          webAuthCallBackPath.valueAsString,
        ]),
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

    const codeStarConnection = new cdk.CfnParameter(
      this,
      'CodeStarConnection',
      {
        type: 'String',
        description: 'Used to access source code',
      }
    );

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.connection(
          'Zehua-Chen/label-hub',
          'main',
          {
            connectionArn: codeStarConnection.valueAsString,
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
