# @kaimosi/cms - Sanity CMS Integration

Shared library for managing Sanity CMS integration across Kaimosi applications.

## Features
- **📝 Content Queries**: Pre-defined GROQ queries for common content.
- **🖼️ Image Optimization**: Helper functions for Sanity image URLs.
- **⚙️ Configuration**: Centralized Sanity client configuration.
- **🏗️ Schema Support**: Structured content management for all apps.

## Usage

```typescript
import { sanityClient } from '@kaimosi/cms';
import { attractionQuery } from '@kaimosi/cms/queries';

// Fetch content from Sanity
const attractions = await sanityClient.fetch(attractionQuery);
```

## Structure
- `src/`: Client configuration and query definitions.
- `package.json`: Package-specific dependencies.
- `tsconfig.json`: TypeScript configuration for the package.

## Development

```bash
# Build the package
pnpm build

# Type check
pnpm type-check
```
