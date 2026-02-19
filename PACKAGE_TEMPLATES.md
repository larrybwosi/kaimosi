# Package Configuration Templates

Quick reference templates for creating new packages and apps in the monorepo.

---

## Shared Package Template

### Directory Structure

```
packages/{package-name}/
├── src/
│   ├── index.ts
│   └── ...
├── package.json
├── tsconfig.json
└── README.md
```

### package.json Template

```json
{
  "name": "@kaimosi/{package-name}",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^22"
  }
}
```

### tsconfig.json Template

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

### README.md Template

```markdown
# @kaimosi/{package-name}

Brief description of what this package does.

## Installation

This package is part of the Kaimosi monorepo and uses workspace dependencies.

## Usage

\`\`\`typescript
import { something } from '@kaimosi/{package-name}';

// Usage example
\`\`\`

## API

### `functionName(param: Type): ReturnType`

Description of what this function does.

## Development

\`\`\`bash
# Type checking
pnpm --filter @kaimosi/{package-name} typecheck

# Linting
pnpm --filter @kaimosi/{package-name} lint
\`\`\`
```

---

## Next.js App Template

### Directory Structure

```
apps/{app-name}/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── lib/
├── public/
├── package.json
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
└── README.md
```

### package.json Template

```json
{
  "name": "@kaimosi/{app-name}",
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
    "@kaimosi/types": "workspace:*",
    "@kaimosi/utils": "workspace:*"
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

### tsconfig.json Template

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
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### next.config.mjs Template

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    '@kaimosi/ui',
    '@kaimosi/types',
    '@kaimosi/utils'
  ],
};

export default nextConfig;
```

### postcss.config.mjs Template

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### app/layout.tsx Template

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'App Name - Kaimosi',
  description: 'App description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### app/page.tsx Template

```typescript
export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">Welcome</h1>
    </main>
  );
}
```

### app/globals.css Template

```css
@import 'tailwindcss';

@theme inline {
  --color-background: #ffffff;
  --color-foreground: #0a0a0a;
}
```

### README.md Template

```markdown
# {App Name}

Brief description of what this app does.

## Getting Started

\`\`\`bash
# Development
pnpm --filter @kaimosi/{app-name} dev

# Build
pnpm --filter @kaimosi/{app-name} build

# Start production
pnpm --filter @kaimosi/{app-name} start
\`\`\`

## Features

- Feature 1
- Feature 2
- Feature 3

## Routes

- \`/\` - Home page
- \`/about\` - About page

## Environment Variables

\`\`\`env
DATABASE_URL=
NEXT_PUBLIC_API_URL=
\`\`\`

## Deployment

This app is deployed to Vercel. See [DEPLOYMENT.md](../../DEPLOYMENT.md) for details.
```

---

## UI Component Package Template

### package.json

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
    "@radix-ui/react-slot": "1.1.1",
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

---

## Database Package Template

### package.json

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

### src/client.ts

```typescript
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
```

### src/index.ts

```typescript
export { prisma } from './client';
export * from './services';
```

---

## Auth Package Template

### package.json

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

---

## Utility Package Template

### package.json

```json
{
  "name": "@kaimosi/utils",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
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

### src/cn.ts

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### src/index.ts

```typescript
export * from './cn';
export * from './validation';
```

---

## Types Package Template

### package.json

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

### src/index.ts

```typescript
// Common types
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Export domain-specific types
export * from './property.types';
export * from './marketplace.types';
```

---

## CMS Package Template

### package.json

```json
{
  "name": "@kaimosi/cms",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./queries": "./src/queries.ts"
  },
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@sanity/client": "^7.15.0",
    "@sanity/image-url": "1.2.0",
    "next-sanity": "12.1.0"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}
```

---

## Quick Commands Reference

### Create New Package

```bash
# Create directory
mkdir -p packages/{package-name}/src

# Copy template files
# Edit package.json, tsconfig.json, README.md

# Install dependencies
pnpm install

# Test
pnpm --filter @kaimosi/{package-name} typecheck
```

### Create New App

```bash
# Create directory
mkdir -p apps/{app-name}/{app,components,lib,public}

# Copy template files
# Edit package.json, tsconfig.json, next.config.mjs

# Install dependencies
pnpm install

# Test
pnpm --filter @kaimosi/{app-name} dev
```

### Add Dependency to Package

```bash
# Add regular dependency
pnpm --filter @kaimosi/{package-name} add {dependency}

# Add dev dependency
pnpm --filter @kaimosi/{package-name} add -D {dependency}

# Add workspace dependency
# Edit package.json and add: "@kaimosi/{other-package}": "workspace:*"
pnpm install
```

---

## Best Practices

1. **Naming Convention**
   - Apps: `@kaimosi/{app-name}` (e.g., `@kaimosi/web`)
   - Packages: `@kaimosi/{package-name}` (e.g., `@kaimosi/ui`)
   - Use kebab-case for names

2. **Version Management**
   - Start at `0.1.0` for new packages
   - Use workspace protocol: `workspace:*`
   - Don't manually update versions

3. **Dependencies**
   - Put shared dependencies in root when possible
   - Use `peerDependencies` for react, react-dom in UI packages
   - Keep package dependencies minimal

4. **Exports**
   - Always export through `src/index.ts`
   - Use barrel exports for public API
   - Use subpath exports for optional features

5. **TypeScript**
   - Extend root tsconfig.json
   - Enable strict mode
   - Use `@kaimosi/*` imports

6. **Documentation**
   - Every package needs README.md
   - Document all exported functions
   - Include usage examples

---

**Last Updated**: February 2026
