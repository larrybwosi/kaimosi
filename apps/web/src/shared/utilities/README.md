# @kaimosi/utils - Shared Utilities Library

Common helper functions and utilities used across all Kaimosi services.

## Features
- **Date Formatting**: Helper functions for date/time operations
- **String Utils**: Validation, formatting, transformation functions
- **API Helpers**: Request/response utilities
- **Validation**: Form validation and schema utilities
- **Constants**: Shared application constants

## Installation

```bash
# From monorepo root
pnpm install

# Use in your service
import { formatDate, slugify, validateEmail } from '@kaimosi/utils';
```

## Structure

```
shared/utilities/
├── src/
│   ├── date.ts              # Date/time utilities
│   ├── string.ts            # String manipulation
│   ├── api.ts               # API helpers
│   ├── validation.ts        # Validation utilities
│   ├── constants.ts         # Application constants
│   └── index.ts             # Main export
├── tests/
├── package.json
└── tsconfig.json
```

## Usage

```typescript
import { formatDate, slugify, cn } from '@kaimosi/utils';

// Date utilities
formatDate(new Date(), 'MMM dd, yyyy'); // Feb 17, 2026

// String utilities
slugify('Hello World'); // hello-world

// Class name utilities
cn('px-4', condition && 'text-blue-600');
```

## Adding Utilities

1. Create function in appropriate module (`date.ts`, `string.ts`, etc.)
2. Add export to `src/index.ts`
3. Add tests in `tests/`
4. Update README with examples
5. Commit and publish

## Guidelines

- **No Dependencies**: Keep utilities dependency-free (except TypeScript)
- **Pure Functions**: Functions should be pure without side effects
- **Documented**: Include JSDoc comments for all exports
- **Tested**: 100% code coverage required
- **Modular**: Export granular functions, not large bundles
- **Re-exportable**: Functions should be tree-shakeable

## Versioning

Follow semantic versioning for this shared library.
