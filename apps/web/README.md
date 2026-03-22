# @kaimosi/web - Main Public Website

Main public website for the Kaimosi platform, showcasing the culture, attractions, and businesses of the region.

## Features
- **🏔️ Attractions**: Highlights and information about local tourism sites.
- **📚 Culture and History**: Educational content about the Kaimosi region.
- **🏫 Educational Institutions**: Directory of schools, colleges, and universities.
- **📅 Events Calendar**: Upcoming local events and activities.
- **🏪 Business Directory**: Information about local businesses, hostels, and services.

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
