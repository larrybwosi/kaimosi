# @kaimosi/utils - Common Utilities and Helpers

Common helper functions and utility libraries used across all Kaimosi applications and packages.

## Features
- **🗓️ Date Formatting**: Helpers for consistent date and time operations.
- **🔡 String Utils**: Validation, formatting, and transformation functions.
- **🌐 API Helpers**: Request and response utility functions.
- **🧪 Validation**: Form validation and schema utilities.
- **💳 M-Pesa Service**: Shared M-Pesa payment integration helpers.

## Usage

```typescript
import { formatDate, slugify, cn } from '@kaimosi/utils';
import { mpesaService } from '@kaimosi/utils/mpesa';

// Date utility
const formattedDate = formatDate(new Date(), 'MMM dd, yyyy');

// Utility for merging tailwind classes
const classes = cn('p-4', isActive && 'text-blue-500');

// M-Pesa payment service
const status = await mpesaService.checkPaymentStatus(orderId);
```

## Structure
- `src/`: Shared utility functions and services.
- `package.json`: Package-specific dependencies.
- `tsconfig.json`: TypeScript configuration for the package.

## Development

```bash
# Build the package
pnpm build

# Type check
pnpm type-check
```
