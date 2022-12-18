import { Construct } from 'constructs';
import Authentication, { AuthenticationProps } from './Authentication.mjs';
import Api, { ApiProps } from './Api.mjs';
import Lambdas from './Lambdas.mjs';
import Storage from './Storage.mjs';

export interface BackendProps {
  authentication: AuthenticationProps;
}

class Backend extends Construct {
  authentication: Authentication;
  api: Api;
  lambdas: Lambdas;
  storage: Storage;

  constructor(scope: Construct, id: string, props: BackendProps) {
    super(scope, id);

    this.authentication = new Authentication(
      this,
      'Authentication',
      props.authentication
    );

    this.storage = new Storage(this, 'Storage');

    this.lambdas = new Lambdas(this, 'Lambdas', {});

    this.api = new Api(this, 'Api', {
      cognitoUserPools: [this.authentication.userPool],
      photosGetFunction: this.lambdas.photosGet,
      incomeGetFunction: this.lambdas.incomeGet,
      projectsGetFunction: this.lambdas.projectsGet,
      projectsPutFunction: this.lambdas.projectsPut,
      buyGetFunction: this.lambdas.buyGet,
      photosBucket: this.storage.photos,
    });
  }
}

export default Backend;
