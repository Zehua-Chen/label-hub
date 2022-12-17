import { Construct } from 'constructs';
import { Function, FunctionProps, Runtime, Code } from 'aws-cdk-lib/aws-lambda';

export interface LabelHubLambdaProps
  extends Omit<FunctionProps, 'runtime' | 'code' | 'handler'> {
  /**
   * The module containing the lambda function
   *
   * The handler will be set to label_hub.lambdas.<module>.handler
   */
  module: string;
}

/**
 * Wrapper for lambda function using label_hub root module
 */
export class LabelHubFunction extends Function {
  constructor(scope: Construct, id: string, props: LabelHubLambdaProps) {
    const { module, ...others } = props;

    super(scope, id, {
      runtime: Runtime.PYTHON_3_9,
      code: Code.fromAsset('lambdas', { exclude: ['__pycache__'] }),
      handler: `label_hub.lambdas.${module}.handler`,
      ...others,
    });
  }
}
