# Kaimosi Monorepo 🏔️

> A modern, scalable monorepo for the Kaimosi platform - connecting community, commerce, and culture.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9-orange)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.0-red)](https://turbo.build/)

---

## 📖 Overview

Kaimosi is a comprehensive platform showcasing the culture, attractions, businesses, and real estate of the Kaimosi region. This monorepo architecture enables independent deployment of multiple applications while maintaining shared code and consistent standards.

### Applications

- **🌐 Web** - Main public website with attractions, culture, and business directory
- **🛍️ Marketplace** - E-commerce platform for local products
- **🏠 Properties** - Real estate listings and apartment rentals
- **🎨 Print-on-Demand** - Custom design and print ordering service
- **⚙️ Admin** - Unified admin dashboard for content and order management

### Shared Packages

- **🎨 UI** - Reusable React components and design system
- **💾 Database** - Prisma client and data access services
- **🔐 Auth** - Authentication and authorization
- **📝 Types** - Shared TypeScript type definitions
- **🛠️ Utils** - Common utilities and helpers
- **📰 CMS** - Sanity CMS integration

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0 ([Install pnpm](https://pnpm.io/installation))
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/larrybwosi/kaimosi.git
cd kaimosi

# Install all dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Generate Prisma client
pnpm --filter @kaimosi/database db:generate

# Start development servers for all apps
pnpm dev
```

### Development

```bash
# Run all apps (ports 3000-3004)
pnpm dev

# Run specific app
pnpm --filter @kaimosi/web dev              # Port 3000
pnpm --filter @kaimosi/marketplace dev      # Port 3001
pnpm --filter @kaimosi/properties dev       # Port 3002
pnpm --filter @kaimosi/print-on-demand dev  # Port 3003
pnpm --filter @kaimosi/admin dev            # Port 3004

# Build all apps and packages
pnpm build

# Type check
pnpm typecheck

# Lint
pnpm lint
```

---

## 📁 Project Structure

```
kaimosi/
├── apps/                      # Applications
│   ├── web/                   # Main website (Port 3000)
│   ├── marketplace/           # E-commerce (Port 3001)
│   ├── properties/            # Real estate (Port 3002)
│   ├── print-on-demand/      # POD service (Port 3003)
│   └── admin/                # Admin dashboard (Port 3004)
│
├── packages/                  # Shared packages
│   ├── ui/                   # UI components library
│   ├── database/             # Prisma & data services
│   ├── auth/                 # Authentication
│   ├── types/                # TypeScript types
│   ├── utils/                # Utilities & helpers
│   └── cms/                  # Sanity CMS integration
│
├── docs/                     # Documentation
├── tools/                    # Development tools
│
├── pnpm-workspace.yaml       # Workspace configuration
├── turbo.json                # Turborepo configuration
├── tsconfig.json             # TypeScript base config
└── package.json              # Root dependencies
```

---

## 📚 Documentation

### Getting Started
- **[🎯 Setup Plan](./MONOREPO_SETUP_PLAN.md)** - Complete architecture and migration plan
- **[📖 Implementation Guide](./IMPLEMENTATION_GUIDE.md)** - Step-by-step setup instructions
- **[✅ Migration Checklist](./MIGRATION_CHECKLIST.md)** - Track your migration progress
- **[⚡ Quick Reference](./QUICK_REFERENCE.md)** - Essential commands and patterns

### Architecture
- **[🏗️ Architecture Visual](./ARCHITECTURE_VISUAL.md)** - Visual diagrams and data flow
- **[📋 Package Templates](./PACKAGE_TEMPLATES.md)** - Templates for creating new packages/apps
- **[🗂️ Monorepo Architecture](./MONOREPO_ARCHITECTURE.md)** - Detailed architecture guide

### Features
- **[🏢 Apartment Features](./APARTMENT_FEATURE_GUIDE.md)** - Property listing features
- **[📝 Content Management](./CONTENT_MANAGEMENT_GUIDE.md)** - CMS guide
- **[💳 M-Pesa Integration](./MPESA_INTEGRATION.md)** - Payment integration
- **[💾 Database Setup](./DATABASE_SETUP.md)** - Database configuration
- **[🔧 Schema Maintenance](./SCHEMA_MAINTENANCE.md)** - Schema management

### Deployment
- **[🚀 Deployment Guide](./DEPLOYMENT.md)** - Production deployment
- **[☁️ Sanity Deployment](./SANITY_DEPLOYMENT_GUIDE.md)** - CMS deployment

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **State Management**: React 19.2 (useContext, SWR)

### Backend
- **Database**: PostgreSQL with Prisma
- **Authentication**: Better Auth
- **CMS**: Sanity
- **File Storage**: Vercel Blob (optional)

### DevOps
- **Monorepo**: pnpm Workspaces + Turborepo
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel
- **Package Manager**: pnpm 9

### Integrations
- **Payments**: M-Pesa
- **Maps**: Maplibre GL
- **Analytics**: Vercel Analytics

---

## 💻 Development Workflow

### Working on Features

```bash
# 1. Create feature branch
git checkout -b feature/your-feature

# 2. Make changes in specific app
cd apps/web
# ... edit files ...

# 3. Test locally
pnpm --filter @kaimosi/web dev

# 4. Type check and lint
pnpm --filter @kaimosi/web typecheck
pnpm --filter @kaimosi/web lint

# 5. Commit with conventional commits
git add .
git commit -m "feat(web): add new feature"

# 6. Push and create PR
git push origin feature/your-feature
```

### Adding Dependencies

```bash
# Add to specific app
pnpm --filter @kaimosi/web add package-name

# Add to shared package
pnpm --filter @kaimosi/ui add package-name

# Add workspace dependency (edit package.json)
{
  "dependencies": {
    "@kaimosi/ui": "workspace:*"
  }
}
```

### Database Operations

```bash
# Generate Prisma client
pnpm --filter @kaimosi/database db:generate

# Create migration
pnpm --filter @kaimosi/database db:migrate

# Push schema changes
pnpm --filter @kaimosi/database db:push

# Open Prisma Studio
pnpm --filter @kaimosi/database db:studio
```

---

## 🎯 Import Patterns

### From Applications

```typescript
// Local imports (same app)
import { Header } from '@/components/header';
import { api } from '@/lib/api';

// Shared UI components
import { Button } from '@kaimosi/ui/components/button';
import { Card } from '@kaimosi/ui/components/card';
import { useToast } from '@kaimosi/ui/hooks/use-toast';

// Database services
import { prisma } from '@kaimosi/database';
import { propertyService } from '@kaimosi/database/services/property';

// Authentication
import { auth } from '@kaimosi/auth';

// Types
import type { Property, User } from '@kaimosi/types';

// Utilities
import { cn } from '@kaimosi/utils';
import { mpesaService } from '@kaimosi/utils/mpesa';

// CMS
import { sanityClient } from '@kaimosi/cms';
```

---

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Test specific package
pnpm --filter @kaimosi/web test

# Watch mode
pnpm --filter @kaimosi/web test --watch

# Coverage
pnpm test --coverage
```

---

## 🚢 Deployment

### Vercel Deployment

Each app deploys independently to Vercel:

```bash
# Deploy web app
cd apps/web
vercel --prod

# Deploy marketplace
cd apps/marketplace
vercel --prod

# Deploy all apps
./scripts/deploy-all.sh
```

### Environment Variables

Required environment variables per app:

```env
# Database
DATABASE_URL=postgresql://...

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token

# Authentication
AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=https://your-domain.com

# M-Pesa (Print-on-Demand)
MPESA_CONSUMER_KEY=your-key
MPESA_CONSUMER_SECRET=your-secret
MPESA_SHORTCODE=your-shortcode
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Run tests and linting** (`pnpm typecheck && pnpm lint`)
5. **Commit with conventional commits** (`git commit -m 'feat: add amazing feature'`)
6. **Push to your branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Commit Convention

```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, test, chore
Scopes: web, marketplace, properties, print-on-demand, admin, ui, database, auth

Examples:
feat(web): add attractions gallery
fix(marketplace): resolve cart calculation bug
docs(monorepo): update setup guide
```

---

## 📊 Monorepo Benefits

- ✅ **Code Sharing** - Share UI components, utilities, and types
- ✅ **Consistent Standards** - Unified TypeScript, ESLint, and Prettier configs
- ✅ **Atomic Changes** - Change shared code and all apps in one commit
- ✅ **Independent Deployment** - Deploy each app separately
- ✅ **Fast Builds** - Turborepo caching and parallel execution
- ✅ **Type Safety** - End-to-end type safety across all apps
- ✅ **Easy Refactoring** - Refactor with confidence across entire codebase

---

## 🔍 Troubleshooting

### Module Not Found

```bash
# Reinstall dependencies
pnpm install

# Clear cache
rm -rf node_modules .next
pnpm install
```

### Type Errors

```bash
# Regenerate types
pnpm --filter @kaimosi/database db:generate

# Restart TypeScript server (VS Code)
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Build Failures

```bash
# Clean and rebuild
pnpm clean
pnpm install
pnpm build
```

See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for more troubleshooting tips.

---

## 📈 Performance

- **Build Time**: < 5 minutes for full build
- **Dev Server Start**: < 10 seconds
- **Hot Reload**: < 1 second
- **Cache Hit Rate**: ~80% with Turborepo

---

## 🌟 Features

### Web App
- 🏔️ Attractions and tourism information
- 📚 Culture and history content
- 🏫 Educational institutions directory
- 📅 Events calendar
- 🏪 Business directory (hostels, restaurants, stores)

### Marketplace
- 🛒 Product catalog and search
- 🛍️ Shopping cart and checkout
- 📦 Order tracking
- ⭐ Product reviews and ratings

### Properties
- 🏠 Property listings with advanced search
- 📍 Location-based filtering
- ❤️ Favorites and wishlists
- 📊 Property analytics
- 🔗 Property sharing

### Print-on-Demand
- 🎨 Design studio with canvas editor
- 👕 Custom products (t-shirts, mugs, posters)
- 📐 Template library
- 💳 M-Pesa payment integration
- 📦 Order tracking and management

### Admin Dashboard
- 📊 Overview analytics
- ✏️ Content management
- 👥 User management
- 📦 Order management (all apps)
- 📝 Review moderation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 👥 Team

- **Repository**: [larrybwosi/kaimosi](https://github.com/larrybwosi/kaimosi)
- **Issues**: [GitHub Issues](https://github.com/larrybwosi/kaimosi/issues)
- **Discussions**: [GitHub Discussions](https://github.com/larrybwosi/kaimosi/discussions)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and Turborepo
- Prisma for database toolkit
- Sanity for headless CMS
- Radix UI for accessible components
- Open source community

---

## 📞 Support

Need help? Check out:

1. **[Quick Reference](./QUICK_REFERENCE.md)** - Common commands and patterns
2. **[Implementation Guide](./IMPLEMENTATION_GUIDE.md)** - Detailed setup instructions
3. **[GitHub Discussions](https://github.com/larrybwosi/kaimosi/discussions)** - Ask questions
4. **[GitHub Issues](https://github.com/larrybwosi/kaimosi/issues)** - Report bugs

---

<div align="center">

**Built with ❤️ for the Kaimosi community**

[⭐ Star this repo](https://github.com/larrybwosi/kaimosi) • [🐛 Report Bug](https://github.com/larrybwosi/kaimosi/issues) • [💡 Request Feature](https://github.com/larrybwosi/kaimosi/issues)

</div>
