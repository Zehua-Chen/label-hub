import { aws_apigateway as apigateway } from 'aws-cdk-lib';
import { JsonSchemaType } from 'aws-cdk-lib/aws-apigateway';

class Models {
  photo: apigateway.Model;
  getIncomeRequest: apigateway.Model;
  getIncomeResponse: apigateway.Model;
  getPhotosRequest: apigateway.Model;
  getPhotosResponse: apigateway.Model;
  getPhotosProducerRequest: apigateway.Model;
  getPhotosProducerResponse: apigateway.Model;
  putPhotoRequest: apigateway.Model;
  putPhotoResponse: apigateway.Model;

  constructor(api: apigateway.RestApi) {
    this.photo = api.addModel('Photo', {
      modelName: 'Photo',
      schema: {
        type: JsonSchemaType.STRING,
        format: 'binary',
      },
    });

    this.getIncomeRequest = api.addModel('GetIncomeRequest', {
      modelName: 'GetIncomeRequest',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          idtoken: {
            type: JsonSchemaType.STRING,
          },
        },
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

    this.getPhotosRequest = api.addModel('GetPhotosRequest', {
      modelName: 'GetPhotosRequest',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          labels: {
            type: JsonSchemaType.ARRAY,
            items: {
              type: JsonSchemaType.STRING,
            },
          },
        },
      },
    });

    this.getPhotosResponse = api.addModel('GetPhotosResponse', {
      modelName: 'GetPhotosResponse',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          url: {
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

    this.getPhotosProducerRequest = api.addModel('GetPhotosProducerRequest', {
      modelName: 'GetPhotosProducerRequest',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          idtoken: {
            type: JsonSchemaType.STRING,
          },
          filter_month: {
            type: JsonSchemaType.STRING,
          },
          filter_label: {
            type: JsonSchemaType.STRING,
          },
          amount_high: {
            type: JsonSchemaType.NUMBER,
          },
          amount_low: {
            type: JsonSchemaType.NUMBER,
          },
        },
      },
    });

    this.getPhotosProducerResponse = api.addModel('GetPhotosProducerResponse', {
      modelName: 'GetPhotosProducerResponse',
      schema: {
        type: JsonSchemaType.OBJECT,
        properties: {
          photos_list: {
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
  }
}

export default Models;
