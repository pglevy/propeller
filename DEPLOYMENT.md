# Deployment Guide

This project is configured to deploy automatically to GitHub Pages when changes are pushed to the `main` branch.

## What Gets Deployed

- **Main Site**: The React application (Vite build) is deployed to the root of GitHub Pages
- **Storybook**: The component documentation is deployed to `/docs/`

## URLs

After deployment, the site will be available at:
- **Main Site**: `https://pglevy.github.io/propeller/`
- **Storybook**: `https://pglevy.github.io/propeller/docs/`

## GitHub Pages Setup

To enable GitHub Pages for this repository:

1. Go to repository **Settings** > **Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. The workflow will automatically deploy on push to `main`

## Manual Deployment

You can manually trigger a deployment:

1. Go to **Actions** tab in GitHub
2. Select the **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Choose the `main` branch
5. Click **Run workflow**

## Local Testing

To test the production builds locally:

```bash
# Build and preview the main site
npm run build
npm run preview

# Build and preview Storybook
npm run build-storybook
npx http-server storybook-static
```

## Troubleshooting

### Site not loading after deployment

- Check that GitHub Pages is enabled in repository settings
- Verify the workflow completed successfully in the Actions tab
- Ensure the base path is correctly set to `/propeller/` in `vite.config.ts`

### Storybook assets not loading

- Verify the Storybook base path is set to `/propeller/docs/` in `.storybook/main.ts`
- Check browser console for 404 errors on assets
