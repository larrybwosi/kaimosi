# @kaimosi/marketplace - E-commerce Platform

E-commerce platform for local products from the Kaimosi region.

## Features
- **🛒 Product Catalog**: Browse products from various local vendors.
- **🛍️ Shopping Cart**: Add and manage products for checkout.
- **📦 Order Tracking**: Keep track of order status and history.
- **⭐ Product Reviews**: Rate and review products for better community feedback.

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
