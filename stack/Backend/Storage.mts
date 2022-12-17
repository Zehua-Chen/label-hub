import { Construct } from 'constructs';

export interface StorageProps {}

class Storage extends Construct {
  constructor(scope: Construct, id: string, props: StorageProps) {
    super(scope, id);
  }
}

export default Storage;
