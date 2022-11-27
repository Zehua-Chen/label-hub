import { Construct } from 'constructs';
import Authentication, { AuthenticationProps } from './Authentication.mjs';
import Api, { ApiProps } from './Api.mjs';
import Lambdas from './Lambdas.mjs';

export interface BackendProps {
  authentication: AuthenticationProps;
}

class Backend extends Construct {
  authentication: Authentication;
  api: Api;
  lambdas: Lambdas;

  constructor(scope: Construct, id: string, props: BackendProps) {
    super(scope, id);

    this.authentication = new Authentication(
      this,
      'Authentication',
      props.authentication
    );

    this.lambdas = new Lambdas(this, 'Lambdas', {});

    this.api = new Api(this, 'Api', {
      cognitoUserPools: [this.authentication.userPool],
      photosGetFunction: this.lambdas.photosGet.function,
      incomeGetFunction: this.lambdas.incomeGet.function,
      projectsGetFunction: this.lambdas.projectsGet.function,
      projectsPutFunction: this.lambdas.projectsPut.function,
    });
  }
}

export default Backend;
