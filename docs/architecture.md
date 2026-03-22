# Monorepo Architecture

The Kaimosi project is structured as a monorepo using **pnpm workspaces** and **Turborepo**. This setup allows for shared code, consistent configurations, and independent deployment of multiple applications.

## Directory Structure

```
kaimosi/
├── apps/                    # User-facing applications
│   ├── web/                 # Main public website (Next.js)
│   ├── marketplace/         # E-commerce platform (Next.js)
│   ├── properties/          # Real estate listings (Next.js)
│   ├── print-on-demand/    # Custom design & print (Next.js)
│   └── admin/              # Unified admin dashboard (Next.js)
│
├── packages/               # Shared libraries and packages
│   ├── ui/                 # Shared React components (Radix UI + Tailwind)
│   ├── database/           # Prisma schema and data access layer
│   ├── auth/              # Authentication logic (Better Auth)
│   ├── types/             # Shared TypeScript interfaces
│   ├── utils/             # Common utility functions
│   ├── cms/               # Sanity CMS integration
│   ├── eslint-config/     # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
│
├── config/                 # Global configuration files
└── docs/                   # Project documentation
```

## Key Technologies

- **Package Manager**: [pnpm](https://pnpm.io/) for efficient workspace management.
- **Build System**: [Turborepo](https://turbo.build/) for optimized task execution and caching.
- **Frontend Framework**: [Next.js](https://nextjs.org/) (App Router) for all applications.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for consistent UI across apps.
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/).
- **CMS**: [Sanity](https://www.sanity.io/) for flexible content management.
- **Auth**: [Better Auth](https://www.better-auth.com/) for secure authentication.

## Data Flow

Applications interact with shared packages to maintain consistency:

1. **Shared Types**: `@kaimosi/types` provides consistent interfaces across the entire monorepo.
2. **Shared UI**: `@kaimosi/ui` ensures a unified look and feel for all user-facing apps.
3. **Data Access**: `@kaimosi/database` centralizes database logic, ensuring all apps use the same Prisma client and service patterns.
4. **Auth**: `@kaimosi/auth` handles user authentication across different domains.
