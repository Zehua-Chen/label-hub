import { Construct } from 'constructs';
import { aws_cognito as cognito } from 'aws-cdk-lib';

export interface AuthenticationProps {
  cognitoDomain: string;

  /**
   * URL to the web app. Must be https
   */
  webURL: string;
}

class Authentication extends Construct {
  client: cognito.UserPoolClient;

  constructor(scope: Construct, id: string, props: AuthenticationProps) {
    super(scope, id);

    const { cognitoDomain, webURL } = props;

    const pool = new cognito.UserPool(this, 'Cognito', {
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: { email: true },
    });

    this.client = pool.addClient('label-hub-web', {
      oAuth: {
        callbackUrls: ['http://localhost:8000/app', webURL],
      },
    });

    pool.addDomain('CognitoDomain', {
      cognitoDomain: { domainPrefix: cognitoDomain },
    });
  }
}

export default Authentication;
