import { aws_apigateway as apigateway } from 'aws-cdk-lib';

class Models {
  photo: apigateway.Model;
  getIncomeRequest: apigateway.Model;
  getIncomeResponse: apigateway.Model;

  putPhotoRequest: apigateway.Model;

  constructor(api: apigateway.RestApi) {
    this.photo = api.addModel('Photo', {
      modelName: 'Photo',
      schema: {
        type: apigateway.JsonSchemaType.STRING,
        format: 'binary',
      },
    });

    this.getIncomeRequest = api.addModel('GetIncomeRequest', {
      modelName: 'GetIncomeRequest',
      schema: {
        type: apigateway.JsonSchemaType.OBJECT,
        properties: {
          idtoken: {
            type: apigateway.JsonSchemaType.STRING,
          },
        },
      },
    });

    this.getIncomeResponse = api.addModel('GetIncomeResponse', {
      modelName: 'GetIncomeResponse',
      schema: {
        type: apigateway.JsonSchemaType.OBJECT,
        properties: {
          idtoken: {
            type: apigateway.JsonSchemaType.STRING,
          },
        },
      },
    });

    this.putPhotoRequest = api.addModel('PutPhotoRequest', { schema: {} });
  }
}

export default Models;
