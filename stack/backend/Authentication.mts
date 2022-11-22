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
  userPool: cognito.UserPool;

  constructor(scope: Construct, id: string, props: AuthenticationProps) {
    super(scope, id);

    const { cognitoDomain, webURL } = props;

    this.userPool = new cognito.UserPool(this, 'Cognito', {
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: { email: true },
    });

    this.client = this.userPool.addClient('label-hub-web', {
      oAuth: {
        callbackUrls: ['http://localhost:8000/app', webURL],
      },
    });

    this.userPool.addDomain('CognitoDomain', {
      cognitoDomain: { domainPrefix: cognitoDomain },
    });
  }
}

export default Authentication;
