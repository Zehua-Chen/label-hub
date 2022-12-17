# CDK Stack

## Utilities

### `LabelHubFunction`

```ts
new LabelHubFunction(this, 'Function', {
  module: 'module_name',
  // other props to aws_lambda.Function
});
```

Create a Lambda Function that uses `label_hub.lambdas.module_name.handler` as
handler
