# @kaimosi/auth - Shared Authentication Package

Authentication and authorization logic for all Kaimosi applications using **Better Auth**.

## Features
- **🔐 Secure Authentication**: Multi-factor authentication support.
- **🛡️ RBAC**: Role-based access control for multiple applications.
- **🌐 Shared Session**: Seamless user login experience across apps.
- **🛠️ Integration**: Built-in support for multiple providers.

## Usage

```typescript
import { auth } from '@kaimosi/auth';
import { authClient } from '@kaimosi/auth/client';

// Get session on server
const session = await auth.api.getSession();

// Client side hook
const { data: session, isPending } = authClient.useSession();
```

## Structure
- `src/`: Main authentication logic and client exports.
- `package.json`: Package-specific dependencies.
- `tsconfig.json`: TypeScript configuration for the package.

## Development

```bash
# Build the package
pnpm build

# Type check
pnpm type-check
```
