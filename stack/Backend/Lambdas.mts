import { Construct } from 'constructs';
import { LabelHubFunction } from '../utils.mjs';

export interface LambdasProps {}

class Lambdas extends Construct {
  photosGet: LabelHubFunction;
  incomeGet: LabelHubFunction;
  projectsGet: LabelHubFunction;
  projectsPut: LabelHubFunction;
  buyGet: LabelHubFunction;

  constructor(scope: Construct, id: string, props: LambdasProps) {
    super(scope, id);

    this.photosGet = new LabelHubFunction(this, 'PhotosGet', {
      module: 'photos_get',
    });

    this.incomeGet = new LabelHubFunction(this, 'IncomeGet', {
      module: 'income_get',
    });

    this.projectsGet = new LabelHubFunction(this, 'ProjectsGet', {
      module: 'projects_get',
    });

    this.projectsPut = new LabelHubFunction(this, 'ProjectsPut', {
      module: 'projects_put',
    });

    this.buyGet = new LabelHubFunction(this, 'BuyGet', {
      module: 'buy_get',
    });
  }
}

export default Lambdas;
