import { Construct } from 'constructs';
import {
  aws_apigateway as apigateway,
  aws_cognito as cognito,
  aws_iam as iam,
  aws_lambda as lambda,
} from 'aws-cdk-lib';

export interface ApiProps {
  cognitoUserPools: cognito.IUserPool[];

  photosGetFunction: lambda.Function;

  incomeGetFunction: lambda.Function;
}

class Api extends Construct {
  api: apigateway.RestApi;
  authorizer: apigateway.Authorizer;

  constructor(scope: Construct, id: string, props: ApiProps) {
    super(scope, id);

    const { cognitoUserPools, photosGetFunction, incomeGetFunction } = props;

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

    const upload = photos.addResource('upload');
    const folder = upload.addResource('{folder}');
    const object = folder.addResource('{object}');

    object.addMethod(
      'PUT',
      new apigateway.AwsIntegration({
        service: 's3',
        path: '{bucket}/{key}',
        integrationHttpMethod: 'PUT',
        options: {
          credentialsRole: new iam.Role(this, 'Role', {
            assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
          }),
          requestParameters: {
            'integration.request.path.bucket': 'method.request.path.folder',
            'integration.request.path.key': 'method.request.path.object',
          },
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
        },
      }),
      {
        authorizer: this.authorizer,
        authorizationType: apigateway.AuthorizationType.COGNITO,
      }
    );

    object.addCorsPreflight({
      allowOrigins: ['*'],
      allowMethods: ['PUT'],
      allowHeaders: ['*'],
    });

    photos.addCorsPreflight({
      allowOrigins: ['*'],
    });

    // Income API
    const income = this.api.root.addResource('income');

    income.addMethod(
      'GET',
      new apigateway.LambdaIntegration(incomeGetFunction),
      {
        authorizer: this.authorizer,
        authorizationType: apigateway.AuthorizationType.COGNITO,
      }
    );

    income.addCorsPreflight({
      allowOrigins: ['*'],
    });

    const projects = this.api.root.addResource('projects');

    projects.addMethod(
      'GET',
      new apigateway.LambdaIntegration(
        new lambda.Function(this, 'get_projects', {
          runtime: lambda.Runtime.PYTHON_3_9,
          code: lambda.Code.fromAsset('lambdas', { exclude: ['__pycache__'] }),
          handler: 'label_hub.lambdas.projects.handler',
        })
      ),
      {
        authorizer: this.authorizer,
        authorizationType: apigateway.AuthorizationType.COGNITO,
      }
    );

    projects.addCorsPreflight({
      allowOrigins: ['*'],
    });

    projects.addMethod(
      'PUT',
      new apigateway.LambdaIntegration(
        new lambda.Function(this, 'put_projects', {
          runtime: lambda.Runtime.PYTHON_3_9,
          code: lambda.Code.fromAsset('lambdas', { exclude: ['__pycache__'] }),
          handler: 'label_hub.lambdas.projects.handler',
        })
      ),
      {
        authorizer: this.authorizer,
        authorizationType: apigateway.AuthorizationType.COGNITO,
      }
    );
  }
}

export default Api;
