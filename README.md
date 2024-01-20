# Svelte Wheel

## Developing

Install dependencies: `pnpm i`  
Create the `.env` file from the template  
Start the development server: `pnpm dev`  

## Building

To build for production: `pnpm build`  
Preview the production build: `pnpm preview`  
Macro: `pnpm bp`  

## Testing

Run the unit tests: `pnpm test:unit`  
Run the integration tests: `pnpm test:integration`  
Run both: `pnpm test`  

## Deploying

Deploying is handled by GitHub Actions for the main SvelteKit app.  
GitHub repository secrets: create one for each line in `.env`, plus
`FIREBASE_DEPLOYER_SERVICE_ACCOUNT`, which is a JSON key to a GCP service
account with Editor permissions.  
If new PWA assets are needed, run `pnpm generate-pwa-assets`. Does not overwrite
old assets.  

## Cloud Run services

Instructions for Cloud Run services are in their own directories.  
