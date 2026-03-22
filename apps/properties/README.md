# @kaimosi/properties - Real Estate Platform

Real estate listings and apartment rentals for the Kaimosi region.

## Features
- **🏠 Property Listings**: Advanced search for homes, apartments, and land.
- **📍 Location-based Filtering**: Find properties near specific landmarks or areas.
- **❤️ Favorites**: Save and manage your favorite listings for easy access.
- **📊 Property Analytics**: Insights into market trends and property values.
- **🔗 Property Sharing**: Easily share listings with friends and family.

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
