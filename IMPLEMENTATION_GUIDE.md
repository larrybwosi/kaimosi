# Monorepo Implementation Guide

## Quick Start Implementation

Follow these steps to transform your current flat structure into a scalable monorepo.

---

## Prerequisites

Ensure you have:
- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0 (install: `npm install -g pnpm`)
- **Git** configured
- **Vercel CLI** (install: `npm install -g vercel`)

---

## Phase 1: Foundation Setup (Day 1-2)

### Step 1: Install Turborepo

```bash
# From repository root
pnpm add -D turbo @turbo/gen

# Verify installation
turbo --version
```

### Step 2: Create Directory Structure

```bash
# Create main directories
mkdir -p apps packages services tools docs

# Create app directories
mkdir -p apps/web apps/marketplace apps/properties apps/print-on-demand apps/admin

# Create package directories
mkdir -p packages/ui packages/database packages/auth packages/types packages/utils packages/cms packages/config
```

### Step 3: Verify Workspace Files

The following files should now exist:
- ✅ `pnpm-workspace.yaml`
- ✅ `turbo.json`

### Step 4: Update Root package.json

```bash
# Back up existing package.json
cp package.json package.json.backup

# Update package.json with workspace configuration
```

Add to root `package.json`:

```json
{
  "name": "kaimosi-monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck",
    "test": "turbo test",
    "clean": "turbo clean && rm -rf node_modules .next dist",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\""
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "@turbo/gen": "^2.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0"
  },
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=20",
    "pnpm": ">=9"
  }
}
```

### Step 5: Update Root tsconfig.json

Replace `tsconfig.json` with:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@kaimosi/ui": ["./packages/ui/src"],
      "@kaimosi/ui/*": ["./packages/ui/src/*"],
      "@kaimosi/database": ["./packages/database/src"],
      "@kaimosi/database/*": ["./packages/database/src/*"],
      "@kaimosi/auth": ["./packages/auth/src"],
      "@kaimosi/auth/*": ["./packages/auth/src/*"],
      "@kaimosi/types": ["./packages/types/src"],
      "@kaimosi/types/*": ["./packages/types/src/*"],
      "@kaimosi/utils": ["./packages/utils/src"],
      "@kaimosi/utils/*": ["./packages/utils/src/*"],
      "@kaimosi/cms": ["./packages/cms/src"],
      "@kaimosi/cms/*": ["./packages/cms/src/*"],
      "@kaimosi/config/*": ["./packages/config/*"]
    }
  },
  "exclude": ["node_modules", "dist", "build", ".next"]
}
```

---

## Phase 2: Extract Shared UI Package (Day 2-3)

### Step 1: Create UI Package Structure

```bash
cd packages/ui
mkdir -p src/components src/hooks
```

### Step 2: Create package.json

Create `packages/ui/package.json`:

```json
{
  "name": "@kaimosi/ui",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./components/*": "./src/components/*.tsx",
    "./hooks/*": "./src/hooks/*.ts"
  },
  "scripts": {
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "@radix-ui/react-accordion": "1.2.2",
    "@radix-ui/react-alert-dialog": "1.1.4",
    "@radix-ui/react-avatar": "1.1.2",
    "@radix-ui/react-checkbox": "1.1.3",
    "@radix-ui/react-dialog": "1.1.4",
    "@radix-ui/react-dropdown-menu": "2.1.4",
    "@radix-ui/react-label": "2.1.1",
    "@radix-ui/react-popover": "1.1.4",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-separator": "1.1.1",
    "@radix-ui/react-slot": "1.1.1",
    "@radix-ui/react-switch": "1.1.2",
    "@radix-ui/react-tabs": "1.1.2",
    "@radix-ui/react-toast": "1.2.4",
    "@radix-ui/react-tooltip": "1.1.6",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.454.0",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "@types/react": "latest",
    "@types/react-dom": "^19",
    "typescript": "^5"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

### Step 3: Create tsconfig.json

Create `packages/ui/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 4: Move UI Components

```bash
# Move all UI components
cp -r ../../components/ui/* src/components/

# Move hooks
cp -r ../../hooks/* src/hooks/
```

### Step 5: Create Barrel Export

Create `packages/ui/src/index.ts`:

```typescript
// Components
export * from './components/accordion';
export * from './components/alert';
export * from './components/alert-dialog';
export * from './components/avatar';
export * from './components/badge';
export * from './components/button';
export * from './components/card';
export * from './components/checkbox';
export * from './components/dialog';
export * from './components/dropdown-menu';
export * from './components/form';
export * from './components/input';
export * from './components/label';
export * from './components/popover';
export * from './components/select';
export * from './components/separator';
export * from './components/sheet';
export * from './components/switch';
export * from './components/table';
export * from './components/tabs';
export * from './components/textarea';
export * from './components/toast';
export * from './components/toaster';
export * from './components/tooltip';

// Hooks
export * from './hooks/use-toast';
export * from './hooks/use-mobile';
```

### Step 6: Install Dependencies

```bash
# From root
pnpm install
```

---

## Phase 3: Extract Types Package (Day 3)

### Step 1: Create Types Package

```bash
cd packages/types
mkdir -p src
```

### Step 2: Create package.json

Create `packages/types/package.json`:

```json
{
  "name": "@kaimosi/types",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}
```

### Step 3: Create tsconfig.json

Create `packages/types/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 4: Move Type Files

```bash
# Move existing types
cp -r ../../shared/types/* src/
```

### Step 5: Create index.ts

Create `packages/types/src/index.ts`:

```typescript
export * from './property.types';
export * from './marketplace.types';
export * from './pod.types';
export * from './user.types';
export * from './apartment.types';
```

---

## Phase 4: Extract Utils Package (Day 3-4)

### Step 1: Create Utils Package

```bash
cd packages/utils
mkdir -p src/mpesa src/validation
```

### Step 2: Create package.json

Create `packages/utils/package.json`:

```json
{
  "name": "@kaimosi/utils",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./mpesa": "./src/mpesa/index.ts",
    "./validation": "./src/validation/index.ts"
  },
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "zod": "4.3.6",
    "date-fns": "4.1.0"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}
```

### Step 3: Move Utility Files

```bash
# Move utils
cp ../../lib/utils.ts src/cn.ts
cp -r ../../shared/utils/mpesa/* src/mpesa/
cp -r ../../shared/utils/validation/* src/validation/
```

### Step 4: Create index.ts

Create `packages/utils/src/index.ts`:

```typescript
export * from './cn';
export * from './date';
export * from './validation';
export * from './mpesa';
```

---

## Phase 5: Extract Database Package (Day 4-5)

### Step 1: Create Database Package

```bash
cd packages/database
mkdir -p src/services prisma
```

### Step 2: Create package.json

Create `packages/database/package.json`:

```json
{
  "name": "@kaimosi/database",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./services/*": "./src/services/*.ts"
  },
  "scripts": {
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@prisma/client": "5.22.0",
    "prisma": "5.22.0",
    "@kaimosi/types": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}
```

### Step 3: Move Database Files

```bash
# Move Prisma schema
cp ../../prisma/schema.prisma prisma/

# Move database services
cp ../../lib/prisma.ts src/client.ts
cp -r ../../shared/db/services/* src/services/
```

### Step 4: Create index.ts

Create `packages/database/src/index.ts`:

```typescript
export * from './client';
export * from './services';
```

---

## Phase 6: Extract Auth Package (Day 5)

### Step 1: Create Auth Package

```bash
cd packages/auth
mkdir -p src
```

### Step 2: Create package.json

Create `packages/auth/package.json`:

```json
{
  "name": "@kaimosi/auth",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./client": "./src/client.ts"
  },
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "better-auth": "1.4.11",
    "@kaimosi/database": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}
```

### Step 3: Move Auth Files

```bash
# Move auth configuration
cp ../../lib/auth.ts src/auth.ts
cp ../../lib/auth-client.ts src/client.ts
```

### Step 4: Create index.ts

Create `packages/auth/src/index.ts`:

```typescript
export * from './auth';
export * from './client';
```

---

## Phase 7: Extract CMS Package (Day 5-6)

### Step 1: Create CMS Package

```bash
cd packages/cms
mkdir -p src/schemas
```

### Step 2: Create package.json

Create `packages/cms/package.json`:

```json
{
  "name": "@kaimosi/cms",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./queries": "./src/queries.ts",
    "./schemas": "./src/schemas/index.ts"
  },
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@sanity/client": "^7.15.0",
    "@sanity/image-url": "1.2.0",
    "next-sanity": "12.1.0",
    "sanity": "4.22.0"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}
```

### Step 3: Move CMS Files

```bash
# Move Sanity client
cp ../../lib/sanity.ts src/client.ts
cp ../../lib/sanity-queries.ts src/queries.ts

# Move schemas
cp -r ../../sanity/schemas/* src/schemas/
```

### Step 4: Create index.ts

Create `packages/cms/src/index.ts`:

```typescript
export * from './client';
export * from './queries';
export * from './schemas';
```

---

## Phase 8: Create Web App (Day 6-7)

### Step 1: Create Web App Structure

```bash
cd apps/web
mkdir -p app components lib public
```

### Step 2: Create package.json

Create `apps/web/package.json`:

```json
{
  "name": "@kaimosi/web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "16.1.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "@kaimosi/ui": "workspace:*",
    "@kaimosi/cms": "workspace:*",
    "@kaimosi/auth": "workspace:*",
    "@kaimosi/types": "workspace:*",
    "@kaimosi/utils": "workspace:*",
    "maplibre-gl": "5.15.0"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "latest",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "tailwindcss": "^4.1.9",
    "postcss": "^8.5",
    "@tailwindcss/postcss": "^4.1.9"
  }
}
```

### Step 3: Create tsconfig.json

Create `apps/web/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 4: Create next.config.mjs

Create `apps/web/next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    '@kaimosi/ui',
    '@kaimosi/cms',
    '@kaimosi/auth',
    '@kaimosi/types',
    '@kaimosi/utils'
  ],
};

export default nextConfig;
```

### Step 5: Move Web Pages

```bash
# Move marketing pages
mkdir -p app/(marketing)
cp -r ../../app/page.tsx app/(marketing)/page.tsx
cp -r ../../app/contact app/
cp -r ../../app/submit app/

# Move attractions
cp -r ../../app/attractions app/

# Move culture & history
cp -r ../../app/culture app/
cp -r ../../app/history app/

# Move institutions
cp -r ../../app/institutions app/

# Move events
cp -r ../../app/events app/

# Move directory
cp -r ../../app/directory app/

# Move relevant components
cp -r ../../components/attraction-* components/
cp -r ../../components/hero-section.tsx components/
cp -r ../../components/town-* components/
cp -r ../../components/featured-* components/
cp -r ../../components/site-* components/
```

### Step 6: Update Imports

Update all import statements in the web app:

```typescript
// Before
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

// After
import { Button } from '@kaimosi/ui/components/button';
import { formatDate } from '@kaimosi/utils';
```

---

## Phase 9: Test & Validate (Day 7-8)

### Step 1: Install All Dependencies

```bash
# From root
pnpm install
```

### Step 2: Build Packages

```bash
# Build all shared packages
pnpm --filter "@kaimosi/*" typecheck
```

### Step 3: Test Web App

```bash
# Run web app
pnpm --filter @kaimosi/web dev

# Should start on http://localhost:3000
```

### Step 4: Verify Routes

Test these routes:
- [ ] http://localhost:3000 (Homepage)
- [ ] http://localhost:3000/attractions
- [ ] http://localhost:3000/culture
- [ ] http://localhost:3000/institutions
- [ ] http://localhost:3000/events
- [ ] http://localhost:3000/directory/hostels
- [ ] http://localhost:3000/contact

---

## Phase 10: Repeat for Other Apps (Day 8-14)

Repeat the app creation process for:
1. **Marketplace** (`apps/marketplace`)
2. **Properties** (`apps/properties`)
3. **Print-on-Demand** (`apps/print-on-demand`)
4. **Admin** (`apps/admin`)

Each follows the same pattern:
1. Create directory structure
2. Create package.json
3. Create tsconfig.json
4. Create next.config.mjs
5. Move pages and components
6. Update imports
7. Test

---

## Troubleshooting

### Issue: "Module not found"

**Solution**: Check that:
1. Package names match in `package.json`
2. Path aliases are correct in `tsconfig.json`
3. Exports are defined in package `package.json`
4. You ran `pnpm install`

### Issue: "Type errors"

**Solution**:
1. Run `pnpm install` to link workspace packages
2. Restart TypeScript server in your editor
3. Check that shared types are exported properly

### Issue: "Build fails"

**Solution**:
1. Check `turbo.json` task dependencies
2. Ensure shared packages have no circular dependencies
3. Verify all imports are correct

### Issue: "Slow builds"

**Solution**:
1. Use Turbo cache: `turbo build --cache`
2. Build only changed packages: `turbo build --filter=[HEAD^1]`
3. Use remote caching (Vercel or custom)

---

## Next Steps After Implementation

1. **Set up CI/CD**
   - Create GitHub Actions workflows
   - Configure Vercel deployments
   - Set up environment variables

2. **Add Tests**
   - Unit tests for packages
   - Integration tests for apps
   - E2E tests with Playwright

3. **Documentation**
   - API documentation
   - Component documentation (Storybook)
   - Developer guides

4. **Monitoring**
   - Error tracking (Sentry)
   - Analytics
   - Performance monitoring

---

## Support

If you encounter issues:
1. Check this guide thoroughly
2. Review the [MONOREPO_SETUP_PLAN.md](./MONOREPO_SETUP_PLAN.md)
3. Review Turborepo docs: https://turbo.build/repo/docs
4. Check pnpm workspace docs: https://pnpm.io/workspaces

---

**Happy Building!** 🚀
