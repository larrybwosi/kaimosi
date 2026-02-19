# Next Steps - Getting Your Monorepo Running

The monorepo structure is complete! Follow these steps to get everything running.

## Step 1: Install Dependencies (5 minutes)

```bash
# Make sure you have pnpm installed
npm install -g pnpm

# Install all dependencies
pnpm install
```

This will install dependencies for:
- All 5 applications
- All 6 shared packages
- Root development tools

## Step 2: Set Up Environment Variables (5 minutes)

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your values:

```env
# Minimum required for development
DATABASE_URL="postgresql://user:password@localhost:5432/kaimosi"

# Optional - for full functionality
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN=""
```

## Step 3: Set Up Database (2 minutes)

```bash
# Generate Prisma client
pnpm db:generate

# Push database schema (creates tables)
pnpm db:push
```

This will:
- Generate the Prisma client in `@kaimosi/database`
- Create all database tables from your schema
- Make the database ready for use

## Step 4: Start Development (1 minute)

```bash
# Start all 5 applications at once
pnpm dev
```

This will start:
- Web: http://localhost:3000
- Marketplace: http://localhost:3001
- Properties: http://localhost:3002
- Print-on-Demand: http://localhost:3003
- Admin: http://localhost:3004

## Step 5: Verify Everything Works (5 minutes)

Open each application in your browser and verify:

1. **Web (3000)**: Homepage loads with green primary color
2. **Marketplace (3001)**: Marketplace homepage with "Browse Products" button
3. **Properties (3002)**: Properties homepage with map icon
4. **Print-on-Demand (3003)**: Print studio homepage loads
5. **Admin (3004)**: Admin dashboard homepage loads

All apps should have consistent styling and working buttons.

## Step 6: Test Package Imports (Optional)

Create a test page to verify package imports work:

```typescript
// In apps/web/src/app/test/page.tsx
import { Button } from '@kaimosi/ui';
import { formatCurrency } from '@kaimosi/utils';
import { prisma } from '@kaimosi/database';

export default function TestPage() {
  const price = formatCurrency(1000);
  
  return (
    <div className="p-8">
      <h1>Package Test</h1>
      <Button>UI Package Works!</Button>
      <p>Utils Package: {price}</p>
    </div>
  );
}
```

Visit http://localhost:3000/test to verify.

## Step 7: Explore the Structure

Take a tour of the codebase:

```bash
# View all packages
ls packages/

# View all apps
ls apps/

# Check package.json of any app
cat apps/web/package.json

# See how packages reference each other
grep "workspace:" apps/web/package.json
```

## Common Issues & Solutions

### Issue: "Cannot find module '@kaimosi/ui'"

**Solution:**
```bash
pnpm install
# Restart your dev server
```

### Issue: "Prisma Client not generated"

**Solution:**
```bash
pnpm db:generate
```

### Issue: "Port already in use"

**Solution:**
```bash
# Kill the process using the port
lsof -ti:3000 | xargs kill -9

# Or change the port in package.json
"dev": "next dev -p 3005"
```

### Issue: Type errors in IDE

**Solution:**
1. Restart TypeScript server (VS Code: Cmd+Shift+P → "Restart TS Server")
2. Or restart your IDE

### Issue: Build fails

**Solution:**
```bash
pnpm clean
pnpm install
pnpm build
```

## Understanding the Workflow

### Adding a New Feature to Web App

```bash
# 1. Navigate to the app
cd apps/web

# 2. Create your component
# apps/web/src/components/hero.tsx

# 3. Import shared packages
import { Button } from '@kaimosi/ui';
import { formatDate } from '@kaimosi/utils';

# 4. Test locally
pnpm dev

# 5. Build to verify
pnpm build
```

### Creating a New Shared Component

```bash
# 1. Navigate to UI package
cd packages/ui

# 2. Create component
# packages/ui/src/badge.tsx

# 3. Export it
# packages/ui/src/index.ts
export * from './badge';

# 4. Use in any app
# apps/web/src/app/page.tsx
import { Badge } from '@kaimosi/ui';
```

### Working with Database

```bash
# 1. Edit schema
# packages/database/prisma/schema.prisma

# 2. Push changes
cd packages/database
pnpm db:push

# 3. Generate client
pnpm db:generate

# 4. Use in any app
import { prisma } from '@kaimosi/database';
const users = await prisma.user.findMany();
```

## Development Tips

### Run Specific Apps

```bash
# Only web app
pnpm --filter @kaimosi/web dev

# Web and marketplace
pnpm --filter @kaimosi/web --filter @kaimosi/marketplace dev
```

### Type Checking

```bash
# Check all apps and packages
pnpm type-check

# Check specific app
pnpm --filter @kaimosi/web type-check
```

### Building

```bash
# Build everything
pnpm build

# Build specific app
pnpm --filter @kaimosi/web build
```

### Database Management

```bash
# Open Prisma Studio
pnpm db:studio

# Create migration
cd packages/database
pnpm db:migrate

# Reset database
cd packages/database
pnpm db:reset
```

## Testing Your Changes

Before committing:

```bash
# 1. Type check
pnpm type-check

# 2. Lint
pnpm lint

# 3. Build
pnpm build

# 4. Test all apps run
pnpm dev
```

## Deployment (When Ready)

Each app deploys independently to Vercel:

1. Connect repo to Vercel
2. Create 5 separate projects (one per app)
3. Configure each:
   - Root Directory: `apps/web` (or respective app)
   - Framework: Next.js
   - Build Command: Auto-detected
4. Add environment variables
5. Deploy!

See DEPLOYMENT.md for detailed instructions.

## Learning Resources

- **Architecture**: Read MONOREPO_ARCHITECTURE.md
- **Patterns**: Read IMPLEMENTATION_GUIDE.md  
- **Commands**: Read QUICK_REFERENCE.md
- **Status**: Read MIGRATION_STATUS.md

## Getting Help

1. Check QUICK_REFERENCE.md for commands
2. Check this file for common issues
3. Check GitHub Issues
4. Ask in GitHub Discussions

## Success Checklist

After completing these steps, you should have:

- [x] All dependencies installed
- [x] Environment variables configured
- [x] Database set up and running
- [x] All 5 apps running on different ports
- [x] Each app accessible in browser
- [x] Shared packages working across apps
- [x] Hot reload working
- [x] TypeScript types working
- [x] Ready to start development

## What's Next?

Now that the infrastructure is ready:

1. **Start migrating existing content** from old structure
2. **Build out features** in each app
3. **Add more shared components** to @kaimosi/ui
4. **Implement API routes** in each app
5. **Add tests** for critical functionality
6. **Deploy to staging** for testing
7. **Deploy to production** when ready

## Quick Command Reference

```bash
# Development
pnpm dev                    # Run all apps
pnpm dev --filter web       # Run specific app

# Building
pnpm build                  # Build everything
pnpm clean                  # Clean build artifacts

# Database
pnpm db:generate           # Generate Prisma client
pnpm db:push               # Push schema changes
pnpm db:studio             # Open database GUI

# Quality
pnpm type-check            # Check TypeScript types
pnpm lint                  # Lint all code
pnpm format                # Format all code

# Troubleshooting
pnpm clean && pnpm install # Nuclear reset
```

---

**You're ready to go!** Start with `pnpm dev` and begin building amazing features.

For detailed information, see:
- GETTING_STARTED.md
- IMPLEMENTATION_GUIDE.md
- QUICK_REFERENCE.md
