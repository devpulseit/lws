# Deployment Pipeline

This repository uses GitHub Actions and a self-hosted runner to build and deploy the site.

## Workflows

- **ci.yml** – runs build checks on pull requests and pushes to `main` or `dev`.
- **build.yml** – builds a Docker image and publishes it to GHCR.
- **deploy.yml** – pulls the image and runs `docker compose` on the server.

## Secrets

Configure repository secrets:

- `GHCR_USERNAME`
- `GHCR_TOKEN`
- `ACME_EMAIL`
- `DEV_BASIC_AUTH_BCRYPT`

## Usage

- Push to `dev` to deploy https://dev.leanwebstudio.ru (requires basic auth).
- Push to `main` to deploy https://leanwebstudio.ru.

Run `scripts/dev-basic-auth.sh` to generate a bcrypt hash for basic auth.
