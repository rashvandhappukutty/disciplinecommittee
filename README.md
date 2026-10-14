# Pixel Perfect

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dc3adc5a-3110-41b1-81b2-6637b354e34e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Netlify Deployment Guide

This project is configured and ready for deployment on Netlify with full serverless/SSR support via TanStack Start & Nitro.

### Option 1: Deploy via GitHub / GitLab / Bitbucket (Recommended)

1. Push your repository to GitHub.
2. Log in to [Netlify](https://app.netlify.com).
3. Click **Add new site** → **Import an existing project**.
4. Select your repository.
5. Netlify will automatically detect [netlify.toml](file:///e:/Projects/Web-Development/Discipline%20Committee/netlify.toml) settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Environment Variables**: `NITRO_PRESET=netlify`
6. Click **Deploy Site**.

---

### Option 2: Deploy using Netlify CLI

1. Run a production build:
   ```sh
   npx cross-env NITRO_PRESET=netlify npm run build
   ```
2. Deploy to Netlify:
   ```sh
   npx netlify deploy --prod
   ```
3. Follow the on-screen prompts to log in and select/create a site.

# disciplinecommittee
