# @kaimosi/types - Shared Type Definitions

Centralized TypeScript type definitions used across all Kaimosi services.

## Features
- **Domain Models**: User, Product, Attraction types
- **API Schemas**: Request/response types
- **Common Types**: Enums, interfaces, unions
- **Database Models**: Prisma-compatible types

## Installation

```bash
# From monorepo root
pnpm install

# Use in your service
import type { User, Product, Attraction } from '@kaimosi/types';
```

## Structure

```
shared/types/
├── src/
│   ├── models/
│   │   ├── user.ts          # User-related types
│   │   ├── product.ts       # Product-related types
│   │   ├── attraction.ts    # Attraction-related types
│   │   └── index.ts
│   ├── api/
│   │   ├── requests.ts      # API request types
│   │   ├── responses.ts     # API response types
│   │   └── index.ts
│   ├── enums.ts             # Shared enums
│   ├── common.ts            # Common types
│   └── index.ts             # Main export
├── package.json
└── tsconfig.json
```

## Usage

```typescript
import type {
  User,
  UserRole,
  CreateUserRequest,
  UserResponse,
  Attraction,
  Product,
} from '@kaimosi/types';

// Using types in your service
function getUser(id: string): Promise<UserResponse> {
  // implementation
}

const user: User = {
  id: '123',
  email: 'user@example.com',
  role: UserRole.USER,
};
```

## Adding Types

1. Create type definition in appropriate module
2. Add export to `src/index.ts`
3. Update this README with examples
4. Commit and publish

## Guidelines

- **Immutable**: Export as `const` or `as const` when appropriate
- **Exported**: All public types must be exported from `src/index.ts`
- **Documented**: Include comments for complex types
- **Consistent**: Use consistent naming conventions
- **Shared**: Only include types used by multiple services
- **Versioned**: Update version when adding breaking type changes

## Type Organization

```typescript
// ✅ Correct: Organize by domain
import type { User, UserRole } from '@kaimosi/types/models/user';
import type { Product } from '@kaimosi/types/models/product';

// ✅ Correct: Use barrel exports
import type { User, Product, Attraction } from '@kaimosi/types';

// ❌ Avoid: Deep nested imports
import type { User } from '@kaimosi/types/src/models/user';
```
