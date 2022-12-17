import { Construct } from 'constructs';
import { LabelHubFunction } from './utils.mjs';

export interface DevOpsProps {}

class DevOps extends Construct {
  constructor(scope: Construct, id: string, props: DevOpsProps) {
    super(scope, id);

    new LabelHubFunction(this, 'TestCloud', {
      module: 'test_cloud',
    });
  }
}

export default DevOps;
