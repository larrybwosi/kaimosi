# Database Setup and Maintenance

The Kaimosi monorepo uses **PostgreSQL** with **Prisma ORM** to manage data access and schema consistency across all applications.

## Prerequisites

- **PostgreSQL** database (Local, Docker, or Managed Service).
- **Node.js** >= 18.0.0.
- **pnpm** >= 9.0.0.

## Setup

### Environment Variables

Each application that interacts with the database needs the `DATABASE_URL` environment variable:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/kaimosi
```

### Initial Configuration

1. Install dependencies from the monorepo root:
   ```bash
   pnpm install
   ```
2. Generate the Prisma client:
   ```bash
   pnpm db:generate
   ```
3. Push the schema to the database:
   ```bash
   pnpm db:push
   ```

## Development Workflow

### Changing the Schema

1. Modify the `packages/database/prisma/schema.prisma` file.
2. Generate the updated Prisma client:
   ```bash
   pnpm db:generate
   ```
3. Push changes to the database (for development):
   ```bash
   pnpm db:push
   ```
4. Create a migration (for production/staging):
   ```bash
   pnpm --filter @kaimosi/database db:migrate
   ```

### Using Prisma Studio

Visualize and manage your data with Prisma Studio:

```bash
pnpm db:studio
```

## Maintenance

- **Regular Backups**: Ensure your managed database service is configured for regular automated backups.
- **Migration Best Practices**: Always review migrations before applying them to production to prevent data loss.
- **Schema Optimization**: Periodically audit the Prisma schema for performance optimizations and indexing improvements.
- **Monitoring**: Use monitoring tools to track database performance and identify slow queries.

## Troubleshooting

- **Connection Errors**: Verify that your `DATABASE_URL` is correct and that your database server is reachable.
- **Prisma Client Issues**: Run `pnpm db:generate` to ensure the client is up to date with the latest schema changes.
- **Outdated Schema**: Use `pnpm db:push` to synchronize the local database with the current schema.
