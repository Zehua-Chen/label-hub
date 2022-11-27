import { Construct } from 'constructs';
import { LabelHubLambdaFunction } from '../utils.mjs';

export interface LambdasProps {}

class Lambdas extends Construct {
  photosGet: LabelHubLambdaFunction;
  incomeGet: LabelHubLambdaFunction;
  projectsGet: LabelHubLambdaFunction;
  projectsPut: LabelHubLambdaFunction;

  constructor(scope: Construct, id: string, props: LambdasProps) {
    super(scope, id);

    this.photosGet = new LabelHubLambdaFunction(this, 'PhotosGet', {
      module: 'photos_get',
    });

    this.incomeGet = new LabelHubLambdaFunction(this, 'IncomeGet', {
      module: 'income_get',
    });

    this.projectsGet = new LabelHubLambdaFunction(this, 'ProjectsGet', {
      module: 'projects_get',
    });

    this.projectsPut = new LabelHubLambdaFunction(this, 'ProjectsPut', {
      module: 'projects_put',
    });
  }
}

export default Lambdas;
