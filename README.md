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

## Development

### Installing Dependencies

```
pnpm install
```

Note that PNPM is a next-generation package manager for Node. Please see
[pnpm.io](https://pnpm.io) for setup instructions

### Deploy Development Stack to AWS

```
export CODE_STAR_CONNECTION='arn'
cdk deploy "Development/*"
```

### Testing

```commandline
python -m unittest discover tests
```
