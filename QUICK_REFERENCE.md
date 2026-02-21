# Monorepo Quick Reference

Essential commands and patterns for daily development in the Kaimosi monorepo.

---

## 🚀 Common Commands

### Development

```bash
# Run all apps
pnpm dev

# Run specific app
pnpm --filter @kaimosi/web dev
pnpm --filter @kaimosi/marketplace dev
pnpm --filter @kaimosi/properties dev
pnpm --filter @kaimosi/print-on-demand dev
pnpm --filter @kaimosi/admin dev

# Run app with custom port
PORT=4000 pnpm --filter @kaimosi/web dev

# Run multiple specific apps
pnpm --filter @kaimosi/web --filter @kaimosi/marketplace dev
```

### Building

```bash
# Build everything
pnpm build

# Build specific app
pnpm --filter @kaimosi/web build

# Build shared packages only
pnpm --filter "@kaimosi/*" --filter "!@kaimosi/web" build

# Build changed packages only
pnpm build --filter=[HEAD^1]
```

### Testing & Quality

```bash
# Type check all
pnpm typecheck

# Type check specific package
pnpm --filter @kaimosi/ui typecheck

# Lint all
pnpm lint

# Lint specific app
pnpm --filter @kaimosi/web lint

# Format code
pnpm format
```

### Package Management

```bash
# Install all dependencies
pnpm install

# Add dependency to app
pnpm --filter @kaimosi/web add react-query

# Add dev dependency
pnpm --filter @kaimosi/web add -D @types/node

# Add workspace dependency (edit package.json)
# "@kaimosi/ui": "workspace:*"
pnpm install

# Remove dependency
pnpm --filter @kaimosi/web remove react-query

# Update dependencies
pnpm update

# Update specific dependency
pnpm --filter @kaimosi/web update next@latest
```

### Workspace Info

```bash
# List all packages
pnpm ls -r --depth=0

# List specific package dependencies
pnpm list @kaimosi/ui

# Check for dependency issues
pnpm why @kaimosi/ui

# Show outdated packages
pnpm outdated
```

### Database

```bash
# Generate Prisma client
pnpm --filter @kaimosi/database db:generate

# Run migrations
pnpm --filter @kaimosi/database db:migrate

# Push schema changes
pnpm --filter @kaimosi/database db:push

# Open Prisma Studio
pnpm --filter @kaimosi/database db:studio
```

### Cleaning

```bash
# Clean build artifacts
pnpm clean

# Remove all node_modules
rm -rf node_modules apps/*/node_modules packages/*/node_modules

# Clean and reinstall
pnpm clean && pnpm install

# Clear turbo cache
rm -rf node_modules/.cache/turbo

# Prune pnpm store
pnpm store prune
```

---

## 📦 Package Structure

```
kaimosi/
├── apps/                    # User-facing applications
│   ├── web/                 # Main website (port 3000)
│   ├── marketplace/         # E-commerce (port 3001)
│   ├── properties/          # Real estate (port 3002)
│   ├── print-on-demand/    # POD service (port 3003)
│   └── admin/              # Admin dashboard (port 3004)
│
└── packages/               # Shared packages
    ├── ui/                 # UI components
    ├── database/           # Database & Prisma
    ├── auth/              # Authentication
    ├── types/             # TypeScript types
    ├── utils/             # Utilities
    └── cms/               # Sanity CMS
```

---

## 🎯 Import Patterns

### From Apps

```typescript
// Local imports (same app)
import { Component } from '@/components/component';
import { helper } from '@/lib/helper';

// Shared UI components
import { Button } from '@kaimosi/ui/components/button';
import { Card } from '@kaimosi/ui/components/card';
import { useToast } from '@kaimosi/ui/hooks/use-toast';

// Database
import { prisma } from '@kaimosi/database';
import { propertyService } from '@kaimosi/database/services/property';

// Auth
import { auth } from '@kaimosi/auth';
import { authClient } from '@kaimosi/auth/client';

// Types
import type { Property, User } from '@kaimosi/types';

// Utils
import { cn } from '@kaimosi/utils';
import { mpesaService } from '@kaimosi/utils/mpesa';

// CMS
import { sanityClient } from '@kaimosi/cms';
import { attractionQuery } from '@kaimosi/cms/queries';
```

### From Packages

```typescript
// UI components can import from other packages
import { cn } from '@kaimosi/utils';
import type { ButtonVariant } from '@kaimosi/types';

// Database can import types
import type { Property } from '@kaimosi/types';

// BUT: Avoid circular dependencies!
// Don't: types importing from database
// Don't: utils importing from UI
```

---

## 🔄 Git Workflow

### Feature Development

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes in specific app
cd apps/web
# ... make changes ...

# Test your changes
pnpm --filter @kaimosi/web dev

# Type check and lint
pnpm --filter @kaimosi/web typecheck
pnpm --filter @kaimosi/web lint

# Commit changes
git add .
git commit -m "feat(web): add new feature"

# Push and create PR
git push origin feature/new-feature
```

### Commit Message Convention

```
<type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code refactoring
- test: Tests
- chore: Maintenance

Scopes:
- web, marketplace, properties, print-on-demand, admin
- ui, database, auth, types, utils, cms
- monorepo, ci, deploy

Examples:
feat(web): add attractions gallery
fix(marketplace): resolve cart calculation bug
docs(monorepo): update setup guide
refactor(ui): simplify button component
chore(database): update Prisma schema
```

---

## 🐛 Troubleshooting

### "Module not found" Errors

```bash
# Solution 1: Reinstall dependencies
pnpm install

# Solution 2: Clear cache and reinstall
rm -rf node_modules .next
pnpm install

# Solution 3: Check tsconfig.json paths
# Ensure workspace aliases are configured

# Solution 4: Restart TypeScript server
# In VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Type Errors

```bash
# Generate types
pnpm --filter @kaimosi/database db:generate

# Type check
pnpm typecheck

# Restart editor TypeScript server
```

### Build Failures

```bash
# Clean and rebuild
pnpm clean
pnpm install
pnpm build

# Build with verbose output
pnpm --filter @kaimosi/web build --verbose

# Check for circular dependencies
pnpm ls -r
```

### Dev Server Won't Start

```bash
# Check port availability
lsof -i :3000

# Kill process on port
kill -9 $(lsof -t -i:3000)

# Start with different port
PORT=4000 pnpm --filter @kaimosi/web dev

# Clear Next.js cache
rm -rf apps/web/.next
```

### Database Issues

```bash
# Reset database
pnpm --filter @kaimosi/database db:push --force-reset

# Regenerate client
pnpm --filter @kaimosi/database db:generate

# Check connection
pnpm --filter @kaimosi/database db:studio
```

---

## 📁 File Organization

### App Structure

```
apps/web/
├── app/                    # Next.js app directory
│   ├── (marketing)/       # Route group
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── attractions/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # App-specific components
│   ├── hero-section.tsx
│   └── attractions/
│       └── card.tsx
├── lib/                   # App utilities
│   ├── api.ts
│   └── constants.ts
├── public/               # Static assets
│   └── images/
├── package.json
├── tsconfig.json
└── next.config.mjs
```

### Package Structure

```
packages/ui/
├── src/
│   ├── components/       # React components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── hooks/           # Custom hooks
│   │   ├── use-toast.ts
│   │   └── use-mobile.ts
│   └── index.ts         # Barrel export
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔧 Configuration Files

### Root Files

| File | Purpose |
|------|---------|
| `pnpm-workspace.yaml` | Workspace configuration |
| `turbo.json` | Turborepo tasks |
| `tsconfig.json` | TypeScript base config |
| `package.json` | Root dependencies & scripts |

### App Files

| File | Purpose |
|------|---------|
| `package.json` | App dependencies |
| `tsconfig.json` | App TypeScript config |
| `next.config.mjs` | Next.js configuration |
| `postcss.config.mjs` | PostCSS/Tailwind config |

### Package Files

| File | Purpose |
|------|---------|
| `package.json` | Package dependencies & exports |
| `tsconfig.json` | Package TypeScript config |
| `README.md` | Package documentation |

---

## 🚢 Deployment

### Vercel Deployment

```bash
# Login to Vercel
vercel login

# Link project (from app directory)
cd apps/web
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add DATABASE_URL
```

### Deploy Multiple Apps

```bash
# Each app deploys independently
cd apps/web && vercel --prod
cd apps/marketplace && vercel --prod
cd apps/properties && vercel --prod
cd apps/print-on-demand && vercel --prod
cd apps/admin && vercel --prod
```

---

## 💡 Tips & Best Practices

### Development

- ✅ Use `pnpm` instead of `npm` or `yarn`
- ✅ Run apps individually during development
- ✅ Use workspace aliases for imports
- ✅ Test locally before pushing
- ✅ Type check before committing

### Code Organization

- ✅ Keep app-specific code in apps/
- ✅ Share only truly reusable code
- ✅ One concern per package
- ✅ Avoid circular dependencies
- ✅ Use barrel exports

### Performance

- ✅ Use Turbo cache for faster builds
- ✅ Build only changed packages
- ✅ Use incremental TypeScript compilation
- ✅ Lazy load heavy dependencies

### Debugging

- ✅ Check terminal output carefully
- ✅ Use TypeScript server in editor
- ✅ Verify environment variables
- ✅ Test in isolation
- ✅ Use console.log("[v0] ...") for debugging

---

## 📚 Resources

- [Turborepo Docs](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Better Auth Docs](https://www.better-auth.com/docs)

---

## 🆘 Get Help

1. Check this quick reference
2. Review [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
3. Review [MONOREPO_SETUP_PLAN.md](./MONOREPO_SETUP_PLAN.md)
4. Check Turborepo troubleshooting
5. Ask the team 

---

**Last Updated**: February 2026

**Keep this reference handy!** Bookmark it for quick access during development.
