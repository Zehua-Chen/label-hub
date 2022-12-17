import { Construct } from 'constructs';
import Authentication, { AuthenticationProps } from './Authentication.mjs';
import Api, { ApiProps } from './Api.mjs';
import Lambdas from './Lambdas.mjs';
import Storage from './Storage.mjs';

export interface BackendProps {
  authentication: AuthenticationProps;
  api: Omit<ApiProps, 'cognitoUserPools'>;
}

class Backend extends Construct {
  authentication: Authentication;
  storage: Storage;
  api: Api;
  lambdas: Lambdas;

  constructor(scope: Construct, id: string, props: BackendProps) {
    super(scope, id);

    this.authentication = new Authentication(
      this,
      'Authentication',
      props.authentication
    );

    this.storage = new Storage(this, 'Storage', {});

    this.api = new Api(this, 'Api', {
      cognitoUserPools: [this.authentication.userPool],
      ...props.api,
    });

    this.lambdas = new Lambdas(this, 'Lambdas', {});
  }
}

export default Backend;
