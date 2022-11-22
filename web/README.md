# Web

## Setup

- Node v18

## Environment Variables

- `AUTH_DOMAIN`:
  - Cognito domain: `https://<COGNITO_DOMAIN>.auth.us-east-1.amazoncognito.com`;
    `COGNITO_DOMAIN` should be the same value as `CognitoDomain` passed to CDK
- `COGNITO_CLIENT_ID`: cognito client ID

## Development

1. `pnpm install`
2. Duplicate `.env` to `.env.development` and fill values

## Build

1. Duplicate `.env` to `.env.production` and fill values

## Scripts

- `pnpm develop`: start development server
- `pnpm build`: build static web app
- `pnpm serve`: serve freshly built static web app
