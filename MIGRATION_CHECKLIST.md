# Monorepo Migration Checklist

Use this checklist to track your progress during the monorepo migration.

---

## Pre-Migration Setup

- [ ] **Backup current codebase**
  ```bash
  git checkout -b backup/pre-monorepo-migration
  git push origin backup/pre-monorepo-migration
  ```

- [ ] **Create migration branch**
  ```bash
  git checkout -b feature/monorepo-setup
  ```

- [ ] **Install prerequisites**
  - [ ] Node.js >= 20.0.0 installed
  - [ ] pnpm >= 9.0.0 installed
  - [ ] Turborepo CLI installed
  - [ ] Vercel CLI installed (optional)

- [ ] **Review documentation**
  - [ ] Read MONOREPO_SETUP_PLAN.md
  - [ ] Read IMPLEMENTATION_GUIDE.md
  - [ ] Understand target architecture

---

## Phase 1: Foundation Setup

### Workspace Configuration

- [ ] **Install Turborepo**
  ```bash
  pnpm add -D turbo @turbo/gen
  ```

- [ ] **Create directory structure**
  ```bash
  mkdir -p apps packages services tools docs
  ```

- [ ] **Verify configuration files**
  - [ ] `pnpm-workspace.yaml` exists
  - [ ] `turbo.json` exists and configured
  - [ ] Root `tsconfig.json` updated with paths
  - [ ] Root `package.json` updated with scripts

- [ ] **Install dependencies**
  ```bash
  pnpm install
  ```

- [ ] **Test turbo commands**
  ```bash
  turbo --version
  ```

---

## Phase 2: Extract Shared Packages

### UI Package (@kaimosi/ui)

- [ ] **Create package structure**
  ```bash
  mkdir -p packages/ui/src/{components,hooks}
  ```

- [ ] **Create configuration files**
  - [ ] `packages/ui/package.json`
  - [ ] `packages/ui/tsconfig.json`
  - [ ] `packages/ui/src/index.ts`

- [ ] **Move components**
  - [ ] Move all files from `components/ui/` to `packages/ui/src/components/`
  - [ ] Move hooks from `hooks/` to `packages/ui/src/hooks/`
  - [ ] Create barrel exports in `src/index.ts`

- [ ] **Test package**
  ```bash
  pnpm --filter @kaimosi/ui typecheck
  ```

### Types Package (@kaimosi/types)

- [ ] **Create package structure**
  ```bash
  mkdir -p packages/types/src
  ```

- [ ] **Create configuration files**
  - [ ] `packages/types/package.json`
  - [ ] `packages/types/tsconfig.json`
  - [ ] `packages/types/src/index.ts`

- [ ] **Move type files**
  - [ ] Move `shared/types/*` to `packages/types/src/`
  - [ ] Create barrel exports

- [ ] **Test package**
  ```bash
  pnpm --filter @kaimosi/types typecheck
  ```

### Utils Package (@kaimosi/utils)

- [ ] **Create package structure**
  ```bash
  mkdir -p packages/utils/src/{mpesa,validation}
  ```

- [ ] **Create configuration files**
  - [ ] `packages/utils/package.json`
  - [ ] `packages/utils/tsconfig.json`
  - [ ] `packages/utils/src/index.ts`

- [ ] **Move utility files**
  - [ ] Move `lib/utils.ts` to `packages/utils/src/cn.ts`
  - [ ] Move `shared/utils/mpesa/*` to `packages/utils/src/mpesa/`
  - [ ] Move `shared/utils/validation/*` to `packages/utils/src/validation/`
  - [ ] Create barrel exports

- [ ] **Test package**
  ```bash
  pnpm --filter @kaimosi/utils typecheck
  ```

### Database Package (@kaimosi/database)

- [ ] **Create package structure**
  ```bash
  mkdir -p packages/database/src/services packages/database/prisma
  ```

- [ ] **Create configuration files**
  - [ ] `packages/database/package.json`
  - [ ] `packages/database/tsconfig.json`
  - [ ] `packages/database/src/index.ts`

- [ ] **Move database files**
  - [ ] Move `lib/prisma.ts` to `packages/database/src/client.ts`
  - [ ] Move `shared/db/services/*` to `packages/database/src/services/`
  - [ ] Move Prisma schema to `packages/database/prisma/`
  - [ ] Update Prisma schema path in files

- [ ] **Generate Prisma client**
  ```bash
  pnpm --filter @kaimosi/database db:generate
  ```

- [ ] **Test package**
  ```bash
  pnpm --filter @kaimosi/database typecheck
  ```

### Auth Package (@kaimosi/auth)

- [ ] **Create package structure**
  ```bash
  mkdir -p packages/auth/src
  ```

- [ ] **Create configuration files**
  - [ ] `packages/auth/package.json`
  - [ ] `packages/auth/tsconfig.json`
  - [ ] `packages/auth/src/index.ts`

- [ ] **Move auth files**
  - [ ] Move `lib/auth.ts` to `packages/auth/src/auth.ts`
  - [ ] Move `lib/auth-client.ts` to `packages/auth/src/client.ts`
  - [ ] Create barrel exports

- [ ] **Test package**
  ```bash
  pnpm --filter @kaimosi/auth typecheck
  ```

### CMS Package (@kaimosi/cms)

- [ ] **Create package structure**
  ```bash
  mkdir -p packages/cms/src/schemas
  ```

- [ ] **Create configuration files**
  - [ ] `packages/cms/package.json`
  - [ ] `packages/cms/tsconfig.json`
  - [ ] `packages/cms/src/index.ts`

- [ ] **Move CMS files**
  - [ ] Move `lib/sanity.ts` to `packages/cms/src/client.ts`
  - [ ] Move `lib/sanity-queries.ts` to `packages/cms/src/queries.ts`
  - [ ] Move `sanity/schemas/*` to `packages/cms/src/schemas/`
  - [ ] Create barrel exports

- [ ] **Test package**
  ```bash
  pnpm --filter @kaimosi/cms typecheck
  ```

---

## Phase 3: Create Applications

### Web App (@kaimosi/web)

- [ ] **Create app structure**
  ```bash
  mkdir -p apps/web/{app,components,lib,public}
  ```

- [ ] **Create configuration files**
  - [ ] `apps/web/package.json`
  - [ ] `apps/web/tsconfig.json`
  - [ ] `apps/web/next.config.mjs`
  - [ ] `apps/web/.env.example`

- [ ] **Move pages and features**
  - [ ] Homepage (`app/page.tsx`)
  - [ ] Attractions (`app/attractions/`)
  - [ ] Culture (`app/culture/`)
  - [ ] History (`app/history/`)
  - [ ] Institutions (`app/institutions/`)
  - [ ] Events (`app/events/`)
  - [ ] Directory (`app/directory/`)
  - [ ] Contact (`app/contact/`)
  - [ ] Submit (`app/submit/`)

- [ ] **Move components**
  - [ ] Hero section
  - [ ] Attractions components
  - [ ] Town description/map
  - [ ] Site header/footer
  - [ ] Newsletter section

- [ ] **Update imports**
  - [ ] Replace `@/components/ui/*` with `@kaimosi/ui/*`
  - [ ] Replace `@/lib/utils` with `@kaimosi/utils`
  - [ ] Replace other imports with workspace packages

- [ ] **Install dependencies**
  ```bash
  pnpm install
  ```

- [ ] **Test app**
  ```bash
  pnpm --filter @kaimosi/web dev
  ```

- [ ] **Verify routes**
  - [ ] `/` - Homepage
  - [ ] `/attractions` - Attractions listing
  - [ ] `/attractions/[slug]` - Attraction detail
  - [ ] `/culture` - Culture page
  - [ ] `/history` - History page
  - [ ] `/institutions` - Institutions
  - [ ] `/events` - Events
  - [ ] `/directory/hostels` - Hostels
  - [ ] `/directory/restaurants` - Restaurants
  - [ ] `/directory/stores` - Stores
  - [ ] `/contact` - Contact page
  - [ ] `/submit` - Submit form

### Marketplace App (@kaimosi/marketplace)

- [ ] **Create app structure**
  ```bash
  mkdir -p apps/marketplace/{app,components,lib}
  ```

- [ ] **Create configuration files**
  - [ ] `apps/marketplace/package.json`
  - [ ] `apps/marketplace/tsconfig.json`
  - [ ] `apps/marketplace/next.config.mjs`

- [ ] **Move pages and features**
  - [ ] Main page (`app/marketplace/page.tsx`)
  - [ ] Products (`app/marketplace/products/`)
  - [ ] Cart (create from scratch or move if exists)
  - [ ] Checkout (create from scratch or move if exists)
  - [ ] Orders (create from scratch or move if exists)

- [ ] **Move components**
  - [ ] Product grid
  - [ ] Product detail
  - [ ] Category filter
  - [ ] Marketplace search
  - [ ] Discount banner

- [ ] **Move lib files**
  - [ ] `lib/actions/marketplace.ts`

- [ ] **Update imports**
  - [ ] Update to use workspace packages

- [ ] **Test app**
  ```bash
  pnpm --filter @kaimosi/marketplace dev
  ```

- [ ] **Verify routes**
  - [ ] `/` - Product listings
  - [ ] `/products/[slug]` - Product detail

### Properties App (@kaimosi/properties)

- [ ] **Create app structure**
  ```bash
  mkdir -p apps/properties/{app,components,lib}
  ```

- [ ] **Create configuration files**
  - [ ] `apps/properties/package.json`
  - [ ] `apps/properties/tsconfig.json`
  - [ ] `apps/properties/next.config.mjs`

- [ ] **Move pages and features**
  - [ ] Browse (`app/properties/page.tsx`)
  - [ ] Property detail (`app/properties/[id]/`)
  - [ ] Favorites (`app/properties/favorites/`)
  - [ ] Analytics (`app/properties/analytics/`)
  - [ ] Share (`app/properties/share/`)

- [ ] **Move components**
  - [ ] Property card
  - [ ] Property gallery
  - [ ] Search filters
  - [ ] Apartment components from `app/(services)/apartments/`

- [ ] **Update imports**
  - [ ] Update to use workspace packages

- [ ] **Test app**
  ```bash
  pnpm --filter @kaimosi/properties dev
  ```

- [ ] **Verify routes**
  - [ ] `/` - Property listings
  - [ ] `/[id]` - Property detail
  - [ ] `/favorites` - Favorites
  - [ ] `/analytics` - Analytics
  - [ ] `/share/[token]` - Shared property

### Print-on-Demand App (@kaimosi/print-on-demand)

- [ ] **Create app structure**
  ```bash
  mkdir -p apps/print-on-demand/{app,components,lib}
  ```

- [ ] **Create configuration files**
  - [ ] `apps/print-on-demand/package.json`
  - [ ] `apps/print-on-demand/tsconfig.json`
  - [ ] `apps/print-on-demand/next.config.mjs`

- [ ] **Move pages and features**
  - [ ] Main page (`app/print-on-demand/page.tsx`)
  - [ ] Products (`app/print-on-demand/products/`)
  - [ ] Studio (`app/print-on-demand/studio/`)
  - [ ] Templates (`app/print-on-demand/templates/`)
  - [ ] Cart (`app/print-on-demand/cart/`)
  - [ ] Checkout (`app/print-on-demand/checkout/`)
  - [ ] Orders (`app/print-on-demand/orders/`)
  - [ ] Payment status (`app/print-on-demand/payment-status/`)
  - [ ] Admin (`app/print-on-demand/admin/`)

- [ ] **Move components**
  - [ ] Design canvas
  - [ ] Design header
  - [ ] Tools panel
  - [ ] Layers panel
  - [ ] Properties panel
  - [ ] Product card
  - [ ] Template grid
  - [ ] Order card
  - [ ] Admin components

- [ ] **Move API routes**
  - [ ] Orders API (`app/api/print-on-demand/orders/`)
  - [ ] M-Pesa API (`app/api/print-on-demand/payments/mpesa/`)

- [ ] **Update imports**
  - [ ] Update to use workspace packages
  - [ ] Use `@kaimosi/utils/mpesa` for M-Pesa

- [ ] **Test app**
  ```bash
  pnpm --filter @kaimosi/print-on-demand dev
  ```

- [ ] **Verify routes**
  - [ ] `/` - Product catalog
  - [ ] `/products` - Products listing
  - [ ] `/studio` - Design studio
  - [ ] `/templates` - Templates
  - [ ] `/cart` - Cart
  - [ ] `/checkout` - Checkout
  - [ ] `/orders` - Orders
  - [ ] `/payment-status` - Payment status
  - [ ] `/admin` - Admin dashboard

### Admin App (@kaimosi/admin)

- [ ] **Create app structure**
  ```bash
  mkdir -p apps/admin/{app,components,lib}
  ```

- [ ] **Create configuration files**
  - [ ] `apps/admin/package.json`
  - [ ] `apps/admin/tsconfig.json`
  - [ ] `apps/admin/next.config.mjs`

- [ ] **Move pages and features**
  - [ ] Dashboard (`app/dashboard/page.tsx`)
  - [ ] Review (`app/dashboard/review/`)

- [ ] **Create admin features**
  - [ ] Content management
  - [ ] User management
  - [ ] Order management
  - [ ] Analytics

- [ ] **Update imports**
  - [ ] Update to use workspace packages

- [ ] **Test app**
  ```bash
  pnpm --filter @kaimosi/admin dev
  ```

- [ ] **Verify routes**
  - [ ] `/dashboard` - Overview
  - [ ] `/dashboard/review/[id]` - Review detail

---

## Phase 4: Testing & Validation

### Package Testing

- [ ] **Type checking**
  ```bash
  pnpm typecheck
  ```

- [ ] **Linting**
  ```bash
  pnpm lint
  ```

- [ ] **Build all packages**
  ```bash
  pnpm build
  ```

### Application Testing

- [ ] **Run all apps simultaneously**
  ```bash
  pnpm dev
  ```

- [ ] **Test web app**
  - [ ] All routes load correctly
  - [ ] Components render properly
  - [ ] Data fetching works
  - [ ] Forms submit successfully

- [ ] **Test marketplace app**
  - [ ] Products load
  - [ ] Search works
  - [ ] Filters function
  - [ ] Cart operations work

- [ ] **Test properties app**
  - [ ] Properties load
  - [ ] Filters work
  - [ ] Favorites function
  - [ ] Analytics display

- [ ] **Test print-on-demand app**
  - [ ] Products load
  - [ ] Design studio works
  - [ ] Templates load
  - [ ] Orders function
  - [ ] M-Pesa integration works
  - [ ] Admin dashboard accessible

- [ ] **Test admin app**
  - [ ] Dashboard loads
  - [ ] Content management works
  - [ ] Authentication required

---

## Phase 5: Documentation & Cleanup

### Documentation

- [ ] **Update README.md**
  - [ ] Add monorepo structure
  - [ ] Add development commands
  - [ ] Add deployment instructions

- [ ] **Create app-specific READMEs**
  - [ ] `apps/web/README.md`
  - [ ] `apps/marketplace/README.md`
  - [ ] `apps/properties/README.md`
  - [ ] `apps/print-on-demand/README.md`
  - [ ] `apps/admin/README.md`

- [ ] **Create package READMEs**
  - [ ] `packages/ui/README.md`
  - [ ] `packages/database/README.md`
  - [ ] `packages/auth/README.md`
  - [ ] `packages/types/README.md`
  - [ ] `packages/utils/README.md`
  - [ ] `packages/cms/README.md`

- [ ] **Update existing documentation**
  - [ ] Update architecture docs
  - [ ] Update deployment guides
  - [ ] Update feature guides

### Cleanup

- [ ] **Remove old files**
  - [ ] Old `components/` directory (after verifying migration)
  - [ ] Old `lib/` directory (after verifying migration)
  - [ ] Old `shared/` directory (after verifying migration)
  - [ ] Old app routes (after verifying migration)

- [ ] **Update .gitignore**
  - [ ] Add package-specific ignores
  - [ ] Add build outputs

- [ ] **Clean dependencies**
  ```bash
  pnpm install --shamefully-hoist=false
  pnpm dedupe
  ```

---

## Phase 6: CI/CD & Deployment

### GitHub Actions

- [ ] **Create CI workflow**
  - [ ] `.github/workflows/ci.yml`
  - [ ] Type checking
  - [ ] Linting
  - [ ] Testing
  - [ ] Building

- [ ] **Create deployment workflows**
  - [ ] `.github/workflows/deploy-web.yml`
  - [ ] `.github/workflows/deploy-marketplace.yml`
  - [ ] `.github/workflows/deploy-properties.yml`
  - [ ] `.github/workflows/deploy-print-on-demand.yml`
  - [ ] `.github/workflows/deploy-admin.yml`

- [ ] **Test workflows**
  - [ ] Push to branch and verify CI runs
  - [ ] Verify builds succeed
  - [ ] Verify deployments work

### Vercel Configuration

- [ ] **Create Vercel projects**
  - [ ] Web app project
  - [ ] Marketplace app project
  - [ ] Properties app project
  - [ ] Print-on-demand app project
  - [ ] Admin app project

- [ ] **Configure environment variables**
  - [ ] Database URLs
  - [ ] Sanity configuration
  - [ ] M-Pesa credentials
  - [ ] Auth secrets

- [ ] **Configure custom domains** (optional)
  - [ ] Web app domain
  - [ ] Marketplace domain
  - [ ] Properties domain
  - [ ] Print-on-demand domain
  - [ ] Admin domain

- [ ] **Test deployments**
  - [ ] Deploy web app
  - [ ] Deploy marketplace app
  - [ ] Deploy properties app
  - [ ] Deploy print-on-demand app
  - [ ] Deploy admin app

---

## Phase 7: Monitoring & Optimization

### Performance

- [ ] **Analyze bundle sizes**
  ```bash
  pnpm --filter @kaimosi/web build --analyze
  ```

- [ ] **Check build times**
  - [ ] Measure baseline build time
  - [ ] Optimize if > 5 minutes

- [ ] **Test dev server startup**
  - [ ] Should start < 10 seconds
  - [ ] Hot reload should work < 1 second

### Monitoring

- [ ] **Set up error tracking** (optional)
  - [ ] Sentry integration
  - [ ] Error monitoring

- [ ] **Set up analytics** (optional)
  - [ ] Vercel Analytics
  - [ ] Custom analytics

- [ ] **Set up performance monitoring** (optional)
  - [ ] Core Web Vitals
  - [ ] Performance metrics

---

## Final Verification

### Code Quality

- [ ] All TypeScript errors resolved
- [ ] All ESLint warnings addressed
- [ ] All imports using workspace aliases
- [ ] No circular dependencies
- [ ] No unused dependencies

### Functionality

- [ ] All apps running independently
- [ ] All routes accessible
- [ ] All features working
- [ ] Database connections working
- [ ] Authentication working
- [ ] API routes functional

### Documentation

- [ ] README complete and accurate
- [ ] All guides up to date
- [ ] Developer onboarding tested
- [ ] Deployment docs verified

### Team Readiness

- [ ] Team trained on monorepo structure
- [ ] Development workflows documented
- [ ] Deployment process documented
- [ ] Troubleshooting guide available

---

## Post-Migration Tasks

- [ ] **Merge to main branch**
  ```bash
  git checkout main
  git merge feature/monorepo-setup
  git push origin main
  ```

- [ ] **Tag release**
  ```bash
  git tag -a v1.0.0-monorepo -m "Monorepo migration complete"
  git push origin v1.0.0-monorepo
  ```

- [ ] **Notify team**
  - [ ] Send migration announcement
  - [ ] Schedule knowledge sharing session
  - [ ] Provide support during transition

- [ ] **Monitor for issues**
  - [ ] Watch for deployment issues
  - [ ] Monitor error rates
  - [ ] Check performance metrics

---

## Success Metrics

- ✅ All apps deployable independently
- ✅ Build time < 5 minutes
- ✅ Dev server start < 10 seconds
- ✅ Zero TypeScript errors
- ✅ Zero ESLint errors
- ✅ All tests passing
- ✅ Documentation complete
- ✅ Team onboarded

---

**Migration Status**: ⏳ In Progress

**Last Updated**: [Date]

**Completed By**: [Name]
