import { Construct } from 'constructs';

export interface LambdasProps {}

class Lambdas extends Construct {
  constructor(scope: Construct, id: string, props: LambdasProps) {
    super(scope, id);
  }
}

export default Lambdas;
