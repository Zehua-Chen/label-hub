import { Construct } from 'constructs';
import { LabelHubLambda } from './utils.mjs';

export interface DevOpsProps {}

class DevOps extends Construct {
  constructor(scope: Construct, id: string, props: DevOpsProps) {
    super(scope, id);

    new LabelHubLambda(this, 'TestInfrastructure', {
      module: 'test_infrastructure',
    });
  }
}

export default DevOps;
