import { Construct } from 'constructs';
import { aws_cognito as cognito } from 'aws-cdk-lib';

export interface BackendProps {}

export class Backend extends Construct {
  constructor(scope: Construct, id: string, props: BackendProps) {
    super(scope, id);

    new cognito.UserPool(this, 'Cognito', {});
  }
}
