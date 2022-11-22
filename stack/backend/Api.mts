import { Construct } from 'constructs';
import { aws_apigateway as apigateway } from 'aws-cdk-lib';

export interface ApiProps {}

class Api extends Construct {
  api: apigateway.RestApi;

  constructor(scope: Construct, id: string, props: ApiProps) {
    super(scope, id);

    this.api = new apigateway.RestApi(this, 'Api');

    const photos = this.api.root.addResource('photos');
    photos.addMethod('GET', new apigateway.MockIntegration());
  }
}

export default Api;
