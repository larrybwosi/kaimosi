# @kaimosi/print-on-demand - Custom Print Service

Custom design and print ordering service for Kaimosi-branded merchandise.

## Features
- **🎨 Design Studio**: Canvas editor for creating custom designs.
- **👕 Custom Products**: T-shirts, mugs, posters, and more.
- **📐 Template Library**: Pre-designed templates to kickstart your creativity.
- **💳 M-Pesa Integration**: Secure and convenient local payments.
- **📦 Order Tracking**: Monitor your custom order from production to delivery.

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
