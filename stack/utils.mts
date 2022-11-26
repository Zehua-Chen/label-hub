import { Construct } from 'constructs';
import { aws_lambda as lambda } from 'aws-cdk-lib';

export interface LabelHubLambdaProps {
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
export class LabelHubLambda extends Construct {
  function: lambda.Function;

  constructor(scope: Construct, id: string, props: LabelHubLambdaProps) {
    super(scope, id);

    const { module } = props;

    this.function = new lambda.Function(this, 'Function', {
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromAsset('lambdas', { exclude: ['__pycache__'] }),
      handler: `label_hub.lambdas.${module}.handler`,
      environment: {
        PYTHONPATH: '/var/task/vendor',
      },
    });
  }
}
