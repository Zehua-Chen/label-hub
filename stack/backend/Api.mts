import { Construct } from 'constructs';
import {
  aws_apigateway as apigateway,
  aws_cognito as cognito,
} from 'aws-cdk-lib';

export interface ApiProps {
  cognitoUserPools: cognito.IUserPool[];
}

class Api extends Construct {
  api: apigateway.RestApi;
  authorizer: apigateway.Authorizer;

  constructor(scope: Construct, id: string, props: ApiProps) {
    super(scope, id);

    const { cognitoUserPools } = props;

    this.api = new apigateway.RestApi(this, 'Api');
    this.authorizer = new apigateway.CognitoUserPoolsAuthorizer(
      this,
      'Authorizer',
      { cognitoUserPools }
    );

    const photos = this.api.root.addResource('photos');

    photos.addMethod(
      'GET',
      new apigateway.MockIntegration({
        requestTemplates: {
          'application/json': JSON.stringify({ statusCode: 200 }),
        },
        integrationResponses: [
          {
            statusCode: '200',
            responseParameters: {
              'method.response.header.access-control-allow-origin': "'*'",
            },
          },
        ],
      }),
      {
        authorizer: this.authorizer,
        authorizationType: apigateway.AuthorizationType.COGNITO,
        methodResponses: [
          {
            statusCode: '200',
            responseParameters: {
              'method.response.header.access-control-allow-origin': true,
            },
          },
        ],
      }
    );

    photos.addCorsPreflight({
      allowOrigins: ['*'],
    });
  }
}

export default Api;
