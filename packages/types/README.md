# @kaimosi/types - Shared TypeScript Definitions

Shared TypeScript interfaces and types for the Kaimosi monorepo.

## Features
- **🌐 Shared Interfaces**: Common types for all applications and packages.
- **🛡️ Consistency**: Maintain a single source of truth for all project-wide types.
- **🏗️ API Support**: Shared types for API requests and responses.
- **🛠️ Utility Types**: Helpful TypeScript utilities for common tasks.

## Usage

```typescript
import type { Property, User, Order } from '@kaimosi/types';

// Use shared types in applications
const user: User = { id: '1', name: 'John Doe' };
```

## Structure
- `src/`: Shared TypeScript interfaces and types.
- `package.json`: Package-specific dependencies.
- `tsconfig.json`: TypeScript configuration for the package.

## Development

```bash
# Build the package
pnpm build

# Type check
pnpm type-check
```
