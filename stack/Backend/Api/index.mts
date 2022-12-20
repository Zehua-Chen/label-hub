import { Construct } from 'constructs';
import {
  aws_apigateway as apigateway,
  aws_cognito as cognito,
  aws_iam as iam,
  aws_lambda as lambda,
  aws_s3 as s3,
} from 'aws-cdk-lib';
import Models from './Models.mjs';

export interface ApiProps {
  cognitoUserPools: cognito.IUserPool[];

  photosGetFunction: lambda.IFunction;
  photosProducerGetFunction: lambda.IFunction;
  photosToS3: lambda.IFunction;

  incomeGetFunction: lambda.IFunction;

  projectsGetFunction: lambda.IFunction;

  projectsPutFunction: lambda.IFunction;

  buyGetFunction: lambda.IFunction;
  userInfoGetFunction: lambda.IFunction;
  userInfoPutFunction: lambda.IFunction;
  downloadGetFunction: lambda.IFunction;

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
      photosProducerGetFunction,
      photosToS3,
      incomeGetFunction,
      projectsGetFunction,
      projectsPutFunction,
      buyGetFunction,
      userInfoGetFunction,
      userInfoPutFunction,
      downloadGetFunction,
      photosBucket,
    } = props;

    this.api = new apigateway.RestApi(this, 'Api', {
      binaryMediaTypes: ['application/octet-stream'],
    });

    const models = new Models(this.api);

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
        requestParameters: {
          'method.request.querystring.labels': true,
        },
        methodResponses: [
          {
            statusCode: '200',
            responseModels: {
              'application/json': models.getPhotosResponse,
            },
            responseParameters: {
              'method.response.header.access-control-allow-origin': true,
            },
          },
        ],
      }
    );

    photos.addCorsPreflight({
      allowOrigins: ['*'],
      allowMethods: ['*'],
      allowHeaders: ['*'],
    });

    const photosProducer = photos.addResource('producer');

    photosProducer.addMethod(
      'GET',
      new apigateway.LambdaIntegration(photosProducerGetFunction),
      {
        authorizer: this.authorizer,
        authorizationType: apigateway.AuthorizationType.COGNITO,
        requestParameters: {
          'method.request.header.access-token': true,
          'method.request.querystring.month': false,
          'method.request.querystring.label': false,
          'method.request.querystring.amount-low': false,
          'method.request.querystring.amount-high': false,
        },
        methodResponses: [
          {
            statusCode: '200',
            responseModels: {
              'application/json': models.getPhotosProducerResponse,
            },
            responseParameters: {
              'method.response.header.access-control-allow-origin': true,
            },
          },
        ],
      }
    );

    photosProducer.addCorsPreflight({
      allowOrigins: ['*'],
      allowMethods: ['*'],
      allowHeaders: ['*'],
    });

    const photosUpload = photos.addResource('upload');

    photosUpload.addMethod(
      'PUT',
      new apigateway.LambdaIntegration(photosToS3),
      {
        authorizer: this.authorizer,
        authorizationType: apigateway.AuthorizationType.COGNITO,
        requestModels: {
          'application/json': models.putPhotoRequest,
        },
        methodResponses: [
          {
            statusCode: '200',
            responseModels: {
              'application/json': models.putPhotoResponse,
            },
            responseParameters: {
              'method.response.header.access-control-allow-origin': true,
            },
          },
        ],
      }
    );

    photosUpload.addCorsPreflight({
      allowOrigins: ['*'],
      allowMethods: ['*'],
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
        requestParameters: {
          'method.request.header.access-token': true,
        },
        methodResponses: [
          {
            statusCode: '200',
            responseModels: {
              'application/json': models.getIncomeResponse,
            },
            responseParameters: {
              'method.response.header.access-control-allow-origin': true,
            },
          },
        ],
      }
    );

    income.addCorsPreflight({
      allowOrigins: ['*'],
      allowMethods: ['*'],
      allowHeaders: ['*'],
    });

    // Projects API
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
        requestModels: {
          'application/json': models.putProjectsRequest,
        },
        requestParameters: {
          'method.request.header.access-token': true,
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

    projects.addCorsPreflight({
      allowOrigins: ['*'],
      allowMethods: ['*'],
      allowHeaders: ['*'],
    });

    // Buy API
    const buy = this.api.root.addResource('buy');

    buy.addMethod('GET', new apigateway.LambdaIntegration(buyGetFunction), {
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
    });

    buy.addCorsPreflight({
      allowOrigins: ['*'],
    });

    // Download API
    const download = this.api.root.addResource('download');

    download.addMethod(
      'GET',
      new apigateway.LambdaIntegration(downloadGetFunction),
      {
        requestParameters: {
          'method.request.header.access-token': true,
          'method.request.querystring.project-id': true,
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

    download.addCorsPreflight({
      allowOrigins: ['*'],
      allowMethods: ['GET'],
      allowHeaders: ['*'],
    });

    const userInfo = this.api.root.addResource('userinfo');

    userInfo.addMethod(
      'GET',
      new apigateway.LambdaIntegration(userInfoGetFunction),
      {
        requestParameters: {
          'method.request.header.access-token': true,
        },
        methodResponses: [
          {
            statusCode: '200',
            responseModels: {
              'application/json': models.getUserInfoResponse,
            },
            responseParameters: {
              'method.response.header.access-control-allow-origin': true,
            },
          },
        ],
      }
    );

    userInfo.addMethod(
      'PUT',
      new apigateway.LambdaIntegration(userInfoPutFunction),
      {
        requestParameters: {
          'method.request.header.access-token': true,
        },
        requestModels: {
          'application/json': models.putUserInfoRequest,
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

    userInfo.addCorsPreflight({
      allowOrigins: ['*'],
      allowMethods: ['*'],
      allowHeaders: ['*'],
    });
  }
}

export default Api;
