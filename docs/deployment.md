# Deployment Guide

The Kaimosi monorepo is optimized for independent deployment of its applications and packages.

## Hosting Platforms

All applications (`web`, `marketplace`, `properties`, `print-on-demand`, `admin`) are designed to be hosted on **Vercel**.

### Vercel Deployment

Each application can be deployed as a separate Vercel project:

1. Connect the monorepo GitHub repository to Vercel.
2. Select the "Root Directory" for each project (e.g., `apps/web`).
3. Configure the "Build Command" as `pnpm build`.
4. Set the "Output Directory" to `.next`.
5. Configure the necessary environment variables.

### Environment Variables

Required environment variables per app:

#### Common Variables
- `DATABASE_URL`: PostgreSQL connection string.
- `AUTH_SECRET`: Secret key for authentication.
- `BETTER_AUTH_URL`: Canonical URL for authentication.

#### Sanity CMS
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID.
- `NEXT_PUBLIC_SANITY_DATASET`: Target dataset (e.g., `production`).
- `SANITY_API_TOKEN`: API token for CMS access.

#### M-Pesa Integration (Print-on-Demand)
- `MPESA_CONSUMER_KEY`: M-Pesa consumer key.
- `MPESA_CONSUMER_SECRET`: M-Pesa consumer secret.
- `MPESA_SHORTCODE`: M-Pesa shortcode.

## CI/CD Workflow

GitHub Actions can be used to automate the build and deployment process:

1. **Build**: Run `pnpm build` to ensure all packages and applications compile correctly.
2. **Lint**: Run `pnpm lint` to check for code style issues.
3. **Type Check**: Run `pnpm type-check` to verify TypeScript integrity.
4. **Deploy**: Trigger Vercel deployments upon merging to the `main` branch.

## Database Deployment

1. Use a managed PostgreSQL database provider (e.g., Neon, Supabase, Vercel Postgres).
2. Run database migrations before or during application deployment:
   ```bash
   pnpm --filter @kaimosi/database db:push
   ```
3. Ensure the `DATABASE_URL` environment variable is correctly set for all applications.

## Sanity CMS Deployment

1. Deploy the Sanity Studio by following the official [Sanity Deployment Guide](https://www.sanity.io/docs/deployment).
2. Configure the dataset and API tokens for each application using the CMS.
