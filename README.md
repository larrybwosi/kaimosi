# Kaimosi Monorepo

> A modern, scalable monorepo for the Kaimosi platform - connecting community, commerce, and culture.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9-orange)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.0-red)](https://turbo.build/)

---

## Overview

Kaimosi is a comprehensive platform showcasing the culture, attractions, businesses, and real estate of the Kaimosi region. This monorepo architecture enables independent deployment of multiple applications while maintaining shared code and consistent standards.

### Applications

| App | Description | Port |
|-----|-------------|------|
| **Web** | Main public website with attractions, culture, and business directory | 3000 |
| **Marketplace** | E-commerce platform for local products | 3001 |
| **Properties** | Real estate listings and apartment rentals | 3002 |
| **Print-on-Demand** | Custom design and print ordering service | 3003 |
| **Admin** | Unified admin dashboard for content and order management | 3004 |

### Shared Packages

| Package | Description | Import |
|---------|-------------|--------|
| **@kaimosi/database** | Prisma client, services, and data access layer | `@kaimosi/database` |
| **@kaimosi/types** | Shared TypeScript type definitions and Zod schemas | `@kaimosi/types` |
| **@kaimosi/utils** | Common utilities, formatters, and helpers | `@kaimosi/utils` |
| **@kaimosi/auth** | Authentication and authorization with Better Auth | `@kaimosi/auth` |
| **@kaimosi/ui** | Reusable React components (Radix UI based) | `@kaimosi/ui` |
| **@kaimosi/cms** | Sanity CMS integration | `@kaimosi/cms` |

---

## Quick Start

### Prerequisites

- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0 ([Install pnpm](https://pnpm.io/installation))
- **PostgreSQL** (or Neon serverless PostgreSQL)

### Installation

```bash
# Clone the repository
git clone https://github.com/larrybwosi/kaimosi.git
cd kaimosi

# Install all dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Generate Prisma client
pnpm --filter @kaimosi/database db:generate

# Push database schema (development)
pnpm --filter @kaimosi/database db:push

# Start development servers for all apps
pnpm dev
```

### Development Commands

```bash
# Run all apps simultaneously
pnpm dev

# Run specific app
pnpm --filter @kaimosi/web dev              # Port 3000
pnpm --filter @kaimosi/marketplace dev      # Port 3001
pnpm --filter @kaimosi/properties dev       # Port 3002
pnpm --filter @kaimosi/print-on-demand dev  # Port 3003
pnpm --filter @kaimosi/admin dev            # Port 3004

# Build all apps and packages
pnpm build

# Type check entire monorepo
pnpm typecheck

# Lint all code
pnpm lint

# Clean all build artifacts
pnpm clean
```

---

## Project Structure

```
kaimosi/
├── apps/                          # Applications
│   ├── web/                       # Main website (Next.js 16)
│   │   ├── src/
│   │   │   ├── app/               # App Router pages
│   │   │   ├── components/        # App-specific components
│   │   │   └── shared/            # Legacy shared code (deprecated)
│   │   └── package.json
│   ├── marketplace/               # E-commerce app
│   ├── properties/                # Real estate app
│   ├── print-on-demand/           # POD service
│   └── admin/                     # Admin dashboard
│
├── packages/                      # Shared packages
│   ├── database/                  # Database layer
│   │   ├── src/
│   │   │   ├── index.ts           # Prisma client export
│   │   │   └── services/          # Database service classes
│   │   ├── prisma/
│   │   │   └── schema.prisma      # Database schema
│   │   └── package.json
│   ├── types/                     # Type definitions
│   │   ├── src/
│   │   │   ├── index.ts           # Main exports
│   │   │   ├── common.ts          # Shared types
│   │   │   ├── apartments.ts      # Property types
│   │   │   ├── marketplace.ts     # E-commerce types
│   │   │   └── print-on-demand.ts # POD types
│   │   └── package.json
│   ├── utils/                     # Utility functions
│   │   ├── src/
│   │   │   ├── index.ts           # Main exports
│   │   │   ├── cn.ts              # Class name utility
│   │   │   ├── format.ts          # Formatters
│   │   │   ├── validation.ts      # Validators
│   │   │   └── mpesa.ts           # M-Pesa utilities
│   │   └── package.json
│   ├── auth/                      # Authentication
│   ├── ui/                        # UI components
│   └── cms/                       # Sanity CMS
│
├── config/                        # Shared configurations
├── pnpm-workspace.yaml            # Workspace configuration
├── turbo.json                     # Turborepo configuration
├── tsconfig.json                  # TypeScript base config
└── package.json                   # Root dependencies
```

---

## Architecture

### Package Dependencies

```
                    ┌─────────────────┐
                    │   Applications  │
                    │  (web, admin,   │
                    │   marketplace)  │s
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        v                    v                    v
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ @kaimosi/ui   │    │@kaimosi/auth  │    │ @kaimosi/cms  │
└───────┬───────┘    └───────┬───────┘    └───────────────┘
        │                    │
        v                    v
┌───────────────┐    ┌───────────────┐
│@kaimosi/utils │    │@kaimosi/db    │
└───────────────┘    └───────┬───────┘
                             │
                             v
                    ┌───────────────┐
                    │@kaimosi/types │
                    └───────────────┘
```

### Database Services

The `@kaimosi/database` package provides service classes for all database operations:

**Print-on-Demand Services:**
- `PodCartService` - Shopping cart management
- `PodDesignService` - Design creation and versioning
- `PodOrderService` - Order lifecycle management
- `PodPaymentService` - M-Pesa payment handling
- `PodProductService` - Product catalog
- `PodTemplateService` - Design templates

**Property Services:**
- `PropertyService` - Property CRUD operations
- `PropertyAnalyticsService` - View tracking and analytics
- `PropertyShareService` - Social sharing
- `LocationService` - Location management
- `UserPreferenceService` - User preferences and favorites
- `ApartmentPreferencesService` - Recommendation engine

---

## Usage Guidelines

### Importing from Packages

```typescript
// Database services
import { prisma, PropertyService, PodOrderService } from '@kaimosi/database';

// Types
import type { UserPreference, PropertyFilters, ApartmentProperty } from '@kaimosi/types';

// Utilities
import { cn, formatCurrency, formatMpesaPhone } from '@kaimosi/utils';

// Authentication
import { auth } from '@kaimosi/auth';

// CMS
import { sanityClient } from '@kaimosi/cms';
```

### Using Database Services

```typescript
import { PropertyService, PodCartService } from '@kaimosi/database';

// Get properties with filters
const { properties, total } = await PropertyService.getAll({
  type: 'APARTMENT',
  minPrice: 10000,
  maxPrice: 50000,
  bedrooms: [2, 3],
  take: 20,
});

// Add item to cart
await PodCartService.addItem(userId, {
  podProductId: 'product-123',
  podDesignId: 'design-456',
  quantity: 2,
  size: 'M',
  color: 'black',
  price: 1500,
});
```

### Using Utilities

```typescript
import { cn, formatCurrency, isValidKenyanPhone, formatMpesaPhone } from '@kaimosi/utils';

// Tailwind class merging
<div className={cn('p-4', isActive && 'bg-blue-500', className)} />

// Currency formatting
formatCurrency(1500); // "KES 1,500.00"

// Phone validation and formatting
isValidKenyanPhone('0712345678'); // true
formatMpesaPhone('0712345678'); // "254712345678"
```

---

## Database Operations

### Schema Management

```bash
# Generate Prisma client after schema changes
pnpm --filter @kaimosi/database db:generate

# Create a new migration
pnpm --filter @kaimosi/database db:migrate

# Push schema changes directly (development)
pnpm --filter @kaimosi/database db:push

# Open Prisma Studio
pnpm --filter @kaimosi/database db:studio
```

### Connection Configuration

For serverless PostgreSQL (Neon), use connection pooling:

```env
DATABASE_URL="postgresql://user:pass@host/db?schema=public&connection_limit=1"
```

---

## Environment Variables

### Required Variables

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=https://your-domain.com

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token
```

### Optional Variables

```env
# M-Pesa (Print-on-Demand)
MPESA_CONSUMER_KEY=your-key
MPESA_CONSUMER_SECRET=your-secret
MPESA_SHORTCODE=your-shortcode
MPESA_PASSKEY=your-passkey
MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-id
```

---

## Contributing

### Workflow

1. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes** following the project structure

3. **Run checks** before committing
   ```bash
   pnpm typecheck
   pnpm lint
   ```

4. **Commit with conventional commits**
   ```bash
   git commit -m "feat(web): add property search filters"
   ```

5. **Create a Pull Request**

### Commit Convention

```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, test, chore
Scopes: web, marketplace, properties, print-on-demand, admin, database, types, utils, auth

Examples:
feat(database): add property recommendation service
fix(marketplace): resolve cart calculation bug
docs(readme): update installation instructions
refactor(types): consolidate property interfaces
```

### Adding Dependencies

```bash
# Add to specific app
pnpm --filter @kaimosi/web add package-name

# Add to shared package
pnpm --filter @kaimosi/utils add package-name

# Add dev dependency to root
pnpm add -D -w package-name
```

### Creating New Services

When adding new database services:

1. Create the service file in `packages/database/src/services/`
2. Export from `packages/database/src/services/index.ts`
3. Add types to `packages/types/src/`

---

## Deployment

### Vercel Deployment

Each app deploys independently. Configure in Vercel:

```bash
# Root Directory
apps/web  # or apps/marketplace, etc.

# Build Command
cd ../.. && pnpm turbo run build --filter=@kaimosi/web

# Install Command
pnpm install
```

### Environment Setup

Set all environment variables in Vercel project settings for each app.

---

## Troubleshooting

### Module Not Found

```bash
# Reinstall dependencies
pnpm install

# Clear cache and rebuild
pnpm clean
pnpm install
pnpm build
```

### Type Errors

```bash
# Regenerate Prisma types
pnpm --filter @kaimosi/database db:generate

# Restart TypeScript server (VS Code)
# Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

### Database Issues

```bash
# Reset database (development only)
pnpm --filter @kaimosi/database db:push --force-reset

# Check database connection
pnpm --filter @kaimosi/database db:studio
```

---

## Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | Radix UI |
| **Database** | PostgreSQL + Prisma |
| **Authentication** | Better Auth |
| **CMS** | Sanity |
| **Payments** | M-Pesa |
| **Monorepo** | pnpm Workspaces + Turborepo |
| **Hosting** | Vercel |

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Support

- **Repository**: [larrybwosi/kaimosi](https://github.com/larrybwosi/kaimosi)
- **Issues**: [GitHub Issues](https://github.com/larrybwosi/kaimosi/issues)
- **Discussions**: [GitHub Discussions](https://github.com/larrybwosi/kaimosi/discussions)

---

Built for the Kaimosi community.
