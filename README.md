# lws

Minimal project for testing GitHub Actions deployment using a self-hosted runner.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run tests:
   ```bash
   npm test
   ```
3. Build static assets:
   ```bash
   npm run build
   ```
   The generated files appear in the `build/` directory.

## GitHub Actions

Pushes to the `main` or `dev` branches trigger the workflows in `.github/workflows`:

- **ci.yml** – installs dependencies and runs the build.
- **build.yml** – builds a Docker image and pushes it to GHCR.
- **deploy.yml** – syncs configuration and runs `docker compose` on the server.
- **run-self-hosted.yml** – manual workflow to verify the self-hosted runner.

See `README-deploy.md` for details on required secrets and deployment process.

