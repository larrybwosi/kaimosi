# @kaimosi/database - Prisma Client and Data Services

Centralized database management and data access layer for all Kaimosi applications using **Prisma ORM**.

## Features
- **📊 Prisma Schema**: Centralized schema definition for the entire monorepo.
- **⚡ Service Layer**: Shared data services for common database operations.
- **🛡️ Type Safety**: Automatically generated TypeScript types from the Prisma schema.
- **🏗️ Database Management**: Simplified migrations and schema updates.

## Usage

```typescript
import { prisma } from '@kaimosi/database';
import { propertyService } from '@kaimosi/database/services/property';

// Use Prisma client
const users = await prisma.user.findMany();

// Use shared service
const property = await propertyService.getById(id);
```

## Structure
- `prisma/`: Prisma schema and migration files.
- `src/`: Prisma client exports and data services.
- `package.json`: Package-specific dependencies.
- `tsconfig.json`: TypeScript configuration for the package.

## Development

```bash
# Generate Prisma client
pnpm db:generate

# Push schema changes (development)
pnpm db:push

# Create migration (production)
pnpm db:migrate

# Open Prisma Studio
pnpm db:studio
```
