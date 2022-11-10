import { Construct } from 'constructs';
import { LabelHubLambda } from './utils.mjs';

export class DevOps extends Construct {
  constructor(scope: Construct, id: string, props: any) {
    super(scope, id);

    new LabelHubLambda(this, 'TestInfrastructure', {
      module: 'test_infrastructure',
    });
  }
}
