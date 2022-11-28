import { Construct } from 'constructs';
import {
  aws_apigateway as apigateway,
  aws_cognito as cognito,
  aws_iam as iam,
  aws_lambda as lambda,
  aws_s3 as s3,
} from 'aws-cdk-lib';

export interface ApiProps {
  cognitoUserPools: cognito.IUserPool[];

  photosGetFunction: lambda.Function;

  incomeGetFunction: lambda.Function;

  projectsGetFunction: lambda.Function;

  projectsPutFunction: lambda.Function;

  photosBucket: s3.Bucket;
}

class Api extends Construct {
  api: apigateway.RestApi;
  authorizer: apigateway.Authorizer;

  constructor(scope: Construct, id: string, props: ApiProps) {
    super(scope, id);

    const {
      cognitoUserPools,
      photosGetFunction,
      incomeGetFunction,
      projectsGetFunction,
      projectsPutFunction,
      photosBucket,
    } = props;

    this.api = new apigateway.RestApi(this, 'Api');
    this.authorizer = new apigateway.CognitoUserPoolsAuthorizer(
      this,
      'Authorizer',
      { cognitoUserPools }
    );

    // photo API
    const photos = this.api.root.addResource('photos');

    photos.addMethod(
      'GET',
      new apigateway.LambdaIntegration(photosGetFunction),
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

    const photosId = photos.addResource('{photo_id}');

    photosId.addMethod(
      'PUT',
      new apigateway.AwsIntegration({
        service: 's3',
        path: `${photosBucket.bucketName}/{photo_id}`,
        integrationHttpMethod: 'PUT',
        options: {
          credentialsRole: new iam.Role(this, 'Role', {
            assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
          }),
          requestParameters: {
            'integration.request.path.photo_id': 'method.request.path.photo_id',
          },
          integrationResponses: [
            {
              statusCode: '200',
              responseParameters: {
                'method.response.header.access-control-allow-origin': "'*'",
              },
            },
          ],
        },
      }),
      {
        authorizer: this.authorizer,
        authorizationType: apigateway.AuthorizationType.COGNITO,
        requestParameters: {
          'method.request.path.photo_id': true,
        },
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

    photosId.addCorsPreflight({
      allowOrigins: ['*'],
      allowMethods: ['PUT'],
      allowHeaders: ['*'],
    });

    // Income API
    const income = this.api.root.addResource('income');

    income.addMethod(
      'GET',
      new apigateway.LambdaIntegration(incomeGetFunction),
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

    income.addCorsPreflight({
      allowOrigins: ['*'],
    });

    const projects = this.api.root.addResource('projects');

    projects.addMethod(
      'GET',
      new apigateway.LambdaIntegration(projectsGetFunction),
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

    projects.addMethod(
      'PUT',
      new apigateway.LambdaIntegration(projectsPutFunction),
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

    projects.addCorsPreflight({
      allowOrigins: ['*'],
    });
  }
}

export default Api;
