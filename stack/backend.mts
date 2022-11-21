import { Construct } from 'constructs';
import { aws_cognito as cognito } from 'aws-cdk-lib';

export interface BackendProps {
  cognitoDomain: string;
}

export class Backend extends Construct {
  constructor(scope: Construct, id: string, props: BackendProps) {
    super(scope, id);

    const { cognitoDomain } = props;

    const pool = new cognito.UserPool(this, 'Cognito', {
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: { email: true },
    });

    pool.addClient('label-hub-web');

    this.node.id;

    pool.addDomain('CognitoDomain', {
      cognitoDomain: { domainPrefix: cognitoDomain },
    });
  }
}
