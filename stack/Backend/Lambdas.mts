import { Construct } from 'constructs';
import { LabelHubLambdaFunction } from '../utils.mjs';

export interface LambdasProps {}

class Lambdas extends Construct {
  photosGet: LabelHubLambdaFunction;
  incomeGet: LabelHubLambdaFunction;

  constructor(scope: Construct, id: string, props: LambdasProps) {
    super(scope, id);

    this.photosGet = new LabelHubLambdaFunction(this, 'PhotosGet', {
      module: 'photos_get',
    });

    this.incomeGet = new LabelHubLambdaFunction(this, 'PhotosGet', {
      module: 'income_get',
    });
  }
}

export default Lambdas;
