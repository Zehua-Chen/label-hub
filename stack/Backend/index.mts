import { Construct } from 'constructs';
import {
  aws_iam as iam,
  aws_s3 as s3,
  aws_s3_notifications as s3n,
} from 'aws-cdk-lib';
import Authentication, { AuthenticationProps } from './Authentication.mjs';
import Api from './Api/index.mjs';
import Lambdas from './Lambdas.mjs';
import Storage from './Storage.mjs';

export interface BackendProps {
  region: string;
  authentication: AuthenticationProps;
}

class Backend extends Construct {
  authentication: Authentication;
  storage: Storage;
  api: Api;
  lambdas: Lambdas;

  constructor(scope: Construct, id: string, props: BackendProps) {
    super(scope, id);

    const { region } = props;

    this.authentication = new Authentication(
      this,
      'Authentication',
      props.authentication
    );

    this.storage = new Storage(this, 'Storage', {});

    this.lambdas = new Lambdas(this, 'Lambdas', {
      region,
      photos: this.storage.photos,
      download: this.storage.download,
      producer: this.storage.producer,
      consumer: this.storage.consumer,
      userInfo: this.storage.userInfo,
    });

    this.storage.photos.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(this.lambdas.photosPut)
    );

    this.api = new Api(this, 'Api', {
      cognitoUserPools: [this.authentication.userPool],
      photosGetFunction: this.lambdas.photosGet,
      photosProducerGetFunction: this.lambdas.photosProducerGet,
      photosToS3: this.lambdas.photosToS3,
      incomeGetFunction: this.lambdas.incomeGet,
      projectsGetFunction: this.lambdas.projectsGet,
      projectsPutFunction: this.lambdas.projectsPut,
      buyGetFunction: this.lambdas.buyGet,
      userInfoGetFunction: this.lambdas.userInfoGet,
      userInfoPutFunction: this.lambdas.userInfoPut,
      downloadGetFunction: this.lambdas.downloadGet,
      photosBucket: this.storage.photos,
    });
  }
}

export default Backend;
