# @kaimosi/admin - Unified Admin Dashboard

Unified administrative dashboard for content management and order oversight across the Kaimosi platform.

## Features
- **📊 Overview Analytics**: Monitor platform performance and usage trends.
- **✏️ Content Management**: Manage articles, listings, and products across apps.
- **👥 User Management**: Handle user accounts and permissions.
- **📦 Order Management**: Oversee orders from marketplace and print-on-demand services.
- **📝 Review Moderation**: Manage product and property reviews for quality control.

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint
```

## Structure
- `app/`: Next.js App Router directory for routes and layouts.
- `components/`: App-specific UI components.
- `lib/`: App-specific utilities and helpers.
- `public/`: Static assets like images and fonts.

## Technology Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Data Access**: `@kaimosi/database`, `@kaimosi/cms`
- **Shared Packages**: `@kaimosi/ui`, `@kaimosi/utils`, `@kaimosi/types`
