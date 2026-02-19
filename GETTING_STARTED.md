# Getting Started with Kaimosi Monorepo

This guide will help you set up and run the Kaimosi monorepo locally.

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL database (for production) or SQLite (for development)

## Installation

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/kaimosi"

# Auth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Sanity CMS (optional)
NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN=""
```

3. Generate Prisma client:

```bash
pnpm db:generate
```

4. Push database schema:

```bash
pnpm db:push
```

## Development

Run all applications in development mode:

```bash
pnpm dev
```

This will start:
- Web app: http://localhost:3000
- Marketplace: http://localhost:3001
- Properties: http://localhost:3002
- Print-on-Demand: http://localhost:3003
- Admin: http://localhost:3004

### Run specific apps:

```bash
# Run only web app
cd apps/web && pnpm dev

# Run only marketplace
cd apps/marketplace && pnpm dev
```

## Building

Build all applications:

```bash
pnpm build
```

Build specific app:

```bash
cd apps/web && pnpm build
```

## Project Structure

```
kaimosi-monorepo/
├── apps/
│   ├── web/              # Main website (port 3000)
│   ├── marketplace/      # E-commerce platform (port 3001)
│   ├── properties/       # Real estate listings (port 3002)
│   ├── print-on-demand/  # Custom printing (port 3003)
│   └── admin/            # Admin dashboard (port 3004)
├── packages/
│   ├── database/         # Prisma client & migrations
│   ├── ui/               # Shared UI components
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions
│   ├── auth/             # Authentication logic
│   └── cms/              # Sanity CMS integration
└── package.json
```

## Available Scripts

- `pnpm dev` - Run all apps in development mode
- `pnpm build` - Build all apps
- `pnpm lint` - Lint all packages
- `pnpm type-check` - Run TypeScript type checking
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push database schema
- `pnpm db:studio` - Open Prisma Studio
- `pnpm clean` - Clean all build artifacts and node_modules

## Adding Dependencies

### To a specific app:

```bash
cd apps/web
pnpm add package-name
```

### To a shared package:

```bash
cd packages/ui
pnpm add package-name
```

### To the root (dev dependencies):

```bash
pnpm add -Dw package-name
```

## Working with Packages

All packages are referenced using workspace protocol:

```json
{
  "dependencies": {
    "@kaimosi/ui": "workspace:*",
    "@kaimosi/utils": "workspace:*"
  }
}
```

Import in your apps:

```typescript
import { Button } from '@kaimosi/ui';
import { formatCurrency } from '@kaimosi/utils';
import { prisma } from '@kaimosi/database';
```

## Database Management

### View database:

```bash
pnpm db:studio
```

### Create migration:

```bash
cd packages/database
pnpm db:migrate
```

### Reset database:

```bash
cd packages/database
prisma migrate reset
```

## Deployment

Each app can be deployed independently to Vercel:

1. Connect your repository to Vercel
2. Set the root directory to the specific app (e.g., `apps/web`)
3. Vercel will automatically detect the monorepo structure
4. Add environment variables in Vercel dashboard

## Troubleshooting

### Port already in use:

If a port is already in use, you can change it in the app's `package.json`:

```json
"scripts": {
  "dev": "next dev -p 3005"
}
```

### Type errors after adding dependencies:

```bash
pnpm type-check
```

### Build cache issues:

```bash
pnpm clean
pnpm install
```

## Next Steps

- Read [MONOREPO_ARCHITECTURE.md](./MONOREPO_ARCHITECTURE.md) for architecture details
- Check [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) for development patterns
- Review [MIGRATION_CHECKLIST.md](./MIGRATION_CHECKLIST.md) for migration progress

## Support

For issues and questions, please open an issue on GitHub or contact the development team.
