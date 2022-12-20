import { aws_apigateway as apigateway } from 'aws-cdk-lib';
import { JsonSchemaType } from 'aws-cdk-lib/aws-apigateway';

class Models {
  photo: apigateway.Model;
  getIncomeResponse: apigateway.Model;
  getPhotosResponse: apigateway.Model;
  getPhotosProducerResponse: apigateway.Model;
  putPhotoRequest: apigateway.Model;
  putPhotoResponse: apigateway.Model;
  putUserInfoRequest: apigateway.Model;
  getUserInfoResponse: apigateway.Model;

  constructor(api: apigateway.RestApi) {
    this.photo = api.addModel('Photo', {
      modelName: 'Photo',
      schema: {
        type: JsonSchemaType.STRING,
        format: 'binary',
      },
    });

    this.getIncomeResponse = api.addModel('GetIncomeResponse', {
      modelName: 'GetIncomeResponse',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          income: {
            type: JsonSchemaType.NUMBER,
          },
        },
      },
    });

    this.getPhotosResponse = api.addModel('GetPhotosResponse', {
      modelName: 'GetPhotosResponse',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          results: {
            type: JsonSchemaType.ARRAY,
            items: {
              type: JsonSchemaType.OBJECT,
              properties: {
                url: {
                  type: JsonSchemaType.STRING,
                },
                labels: {
                  type: JsonSchemaType.STRING,
                },
              },
            },
          },
        },
      },
    });

    this.getPhotosProducerResponse = api.addModel('GetPhotosProducerResponse', {
      modelName: 'GetPhotosProducerResponse',
      schema: {
        type: JsonSchemaType.ARRAY,
        items: {
          type: JsonSchemaType.OBJECT,
          properties: {
            filename: { type: JsonSchemaType.STRING },
            time: { type: JsonSchemaType.STRING },
            amount: { type: JsonSchemaType.NUMBER },
            tags: {
              type: JsonSchemaType.ARRAY,
              items: { type: JsonSchemaType.STRING },
            },
          },
        },
      },
    });

    this.putPhotoRequest = api.addModel('PutPhotoRequest', {
      modelName: 'PutPhotoRequest',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          file: {
            type: JsonSchemaType.STRING,
          },
          filename: {
            type: JsonSchemaType.STRING,
          },
          id_token: {
            type: JsonSchemaType.STRING,
          },
          labels: {
            type: JsonSchemaType.ARRAY,
            items: {
              type: JsonSchemaType.STRING,
            },
          },
        },
      },
    });

    this.putPhotoResponse = api.addModel('PutPhotoResponse', {
      modelName: 'PutPhotoResponse',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          message: {
            type: JsonSchemaType.STRING,
          },
        },
      },
    });

    this.putUserInfoRequest = api.addModel('PutUserInfoRequest', {
      modelName: 'PutUserInfoRequest',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          first: {
            type: JsonSchemaType.STRING,
          },
          last: {
            type: JsonSchemaType.STRING,
          },
          title: {
            type: JsonSchemaType.STRING,
          },
          email: {
            type: JsonSchemaType.STRING,
          },
          aboutme: {
            type: JsonSchemaType.STRING,
          },
          projectID: {
            type: JsonSchemaType.STRING,
          },
        },
      },
    });

    this.getUserInfoResponse = api.addModel('GetUserInfoResponse', {
      modelName: 'GetUserInfoResponse',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          first_name: {
            type: JsonSchemaType.STRING,
          },
          last_name: {
            type: JsonSchemaType.STRING,
          },
          id: {
            type: JsonSchemaType.STRING,
          },
          title: {
            type: JsonSchemaType.STRING,
          },
          email: {
            type: JsonSchemaType.STRING,
          },
          aboutme: {
            type: JsonSchemaType.STRING,
          },
          projectID: {
            type: JsonSchemaType.STRING,
          },
        },
      },
    });
  }
}

export default Models;
