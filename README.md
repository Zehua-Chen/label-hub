# Label Hub

## Contributors

- Tsai-Chen Hsieh (th2990@columbia.edu)
- Zehua Chen (zc2616@columbia.edu)
- Fatima Dantsoho (fd2508@columbia.edu)
- Alix Leon (afl2124@columbia.edu)

## Architecture

- [`label_hub`](label_hub)
  - [`core`](label_hub/core): entities and business rules
  - [`infrastructure`](label_hub/infrastructure): infrastructure adapters
  - [`lambdas`](label_hub/lambdas): lambda implementations
- [`tests`](tests): unit tests

## Deployment

Before starting deployment, follow the following instructions to build
components of the app. Leave environment variables during the first deployment.

- [Web Development](web/README.md):

### Installing Dependencies

```
pnpm install
```

Note that PNPM is a next-generation package manager for Node. Please see
[pnpm.io](https://pnpm.io) for setup instructions

### Deploy Development Stack to AWS

```
export CODE_STAR_CONNECTION='arn'

cdk deploy "Development/*" --parameters \
  CognitoDomain=<unique url> \
  -O cdk.out/outputs.json
```

- `-O cdk.out/outputs.json`: save outputs to a file for quick reference

After receiving outputs, fill in environment variables and deploy again.

## Testing

```commandline
python -m unittest discover tests
```
