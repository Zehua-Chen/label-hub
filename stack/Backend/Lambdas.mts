import { Construct } from 'constructs';
import { LabelHubFunction } from '../utils.mjs';

export interface LambdasProps {}

class Lambdas extends Construct {
  photosGet: LabelHubFunction;
  photosPut: LabelHubFunction;
  photosProducerGet: LabelHubFunction;
  incomeGet: LabelHubFunction;
  projectsGet: LabelHubFunction;
  projectsPut: LabelHubFunction;

  constructor(scope: Construct, id: string, props: LambdasProps) {
    super(scope, id);

    this.photosGet = new LabelHubFunction(this, 'PhotosGet', {
      module: 'photos_get',
    });

    this.photosPut = new LabelHubFunction(this, 'PhotosPut', {
      module: 'photos_put',
    });

    this.photosProducerGet = new LabelHubFunction(this, 'PhotosProducerGet', {
      module: 'photos_producer_get',
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
  }
}

export default Lambdas;
