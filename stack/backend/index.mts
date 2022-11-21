import { Construct } from 'constructs';
import { Authentication, AuthenticationProps } from './authentication.mjs';

export interface BackendProps {
  authentication: AuthenticationProps;
}

export class Backend extends Construct {
  authentication: Authentication;

  constructor(scope: Construct, id: string, props: BackendProps) {
    super(scope, id);

    this.authentication = new Authentication(
      this,
      'Authentication',
      props.authentication
    );
  }
}
