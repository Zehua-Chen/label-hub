# Label Hub

## Contributors

- Tsai-Chen Hsieh (th2990@columbia.edu)
- Zehua Chen (zc2616@columbia.edu)
- Fatima Dantsoho (fd2508@columbia.edu)
- Alix Leon (afl2124@columbia.edu)

## Architecture

- [`lambdas`](lambdas/README.md): Lambda functions
- [`web`](web/README.md): Web frontend
- [`stack`](stack/README.md): CDK

## Deployment

### Installing Dependencies

```
pnpm install
```

Note that PNPM is a next-generation package manager for Node. Please see
[pnpm.io](https://pnpm.io) for setup instructions

### Deploy Development Stack to AWS

```
cdk deploy "Development/*" --parameters \
  CognitoDomain=<unique url> \
  -O cdk.out/outputs.json
```

- `-O cdk.out/outputs.json`: save outputs to a file for quick reference

### Deploy Frontend

As frontend depends on outputs from Cloud Formation, it has to be deployed
separately.

- [Web Development](web/README.md): follow instructions on how to build frontend
  first

```
aws s3 sync web/public s3://<bucket>
```

### Deploy Production Stack with Pipeline

```
cdk deploy LabelHubPipeline --parameters \
  CodeStarConnection=<arn> \
  CognitoDomain=<unique url> \
  -O cdk.out/outputs.json
```

- `CODE_STAR_CONNECTION` can't be passed as parameter for some reasons
- Frontend still has to be deployed separately

## Testing

```commandline
python -m unittest discover tests
```
