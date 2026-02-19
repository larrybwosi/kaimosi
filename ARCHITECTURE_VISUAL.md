# Kaimosi Monorepo Architecture - Visual Guide

A visual representation of the monorepo structure and relationships.

---

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     KAIMOSI MONOREPO                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────── APPLICATIONS ────────────────────┐     │
│  │                                                        │     │
│  │  ┌──────────┐  ┌───────────┐  ┌────────────┐       │     │
│  │  │   Web    │  │Marketplace│  │ Properties │       │     │
│  │  │ :3000    │  │  :3001    │  │   :3002    │       │     │
│  │  └────┬─────┘  └─────┬─────┘  └──────┬─────┘       │     │
│  │       │              │                 │              │     │
│  │  ┌────┴──────┐  ┌───┴──────┐                        │     │
│  │  │Print-on-  │  │  Admin   │                        │     │
│  │  │  Demand   │  │  :3004   │                        │     │
│  │  │  :3003    │  └──────────┘                        │     │
│  │  └───────────┘                                       │     │
│  └────────────────────────┬───────────────────────────┘     │
│                            │                                  │
│                            │ use                              │
│                            ▼                                  │
│  ┌──────────────────── PACKAGES ─────────────────────┐      │
│  │                                                     │      │
│  │  ┌────────┐  ┌──────────┐  ┌────────┐  ┌──────┐ │      │
│  │  │   UI   │  │ Database │  │  Auth  │  │ CMS  │ │      │
│  │  └───┬────┘  └────┬─────┘  └───┬────┘  └──┬───┘ │      │
│  │      │            │             │           │      │      │
│  │  ┌───┴────┐  ┌───┴─────┐                          │      │
│  │  │ Types  │  │  Utils  │                          │      │
│  │  └────────┘  └─────────┘                          │      │
│  └─────────────────────────────────────────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Dependency Graph

```
                    ┌──────────────────┐
                    │   @kaimosi/web   │
                    └────────┬─────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                 │
    ┌───────▼──────┐  ┌─────▼─────┐  ┌───────▼──────┐
    │ @kaimosi/ui  │  │@kaimosi/  │  │ @kaimosi/cms │
    │              │  │   auth    │  │              │
    └───────┬──────┘  └─────┬─────┘  └───────┬──────┘
            │               │                 │
            │         ┌─────▼─────┐          │
            │         │@kaimosi/  │          │
            │         │ database  │          │
            │         └─────┬─────┘          │
            │               │                 │
            └───────────────┼─────────────────┘
                            │
                    ┌───────▼────────┐
                    │  @kaimosi/     │
                    │    types       │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │  @kaimosi/     │
                    │    utils       │
                    └────────────────┘
```

### Dependency Rules

- **Apps** depend on **Packages** ✅
- **Packages** can depend on other **Packages** ✅
- **Apps** should NOT depend on other **Apps** ❌
- **Circular dependencies** are NOT allowed ❌

---

## 🎯 Service Responsibilities

```
┌───────────────────────────────────────────────────────────────┐
│                          WEB APP                               │
├───────────────────────────────────────────────────────────────┤
│ Responsibilities:                                              │
│ • Homepage & landing pages                                     │
│ • Attractions & tourism info                                   │
│ • Culture & history content                                    │
│ • Educational institutions                                     │
│ • Events calendar                                              │
│ • Business directory                                           │
│ • Contact & submission forms                                   │
│                                                                │
│ Dependencies: @kaimosi/ui, @kaimosi/cms, @kaimosi/auth       │
│ Port: 3000                                                     │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                      MARKETPLACE APP                           │
├───────────────────────────────────────────────────────────────┤
│ Responsibilities:                                              │
│ • Product catalog & browsing                                   │
│ • Product search & filtering                                   │
│ • Shopping cart management                                     │
│ • Order checkout & processing                                  │
│ • Order tracking                                               │
│ • Customer wishlist                                            │
│                                                                │
│ Dependencies: @kaimosi/ui, @kaimosi/database, @kaimosi/auth  │
│ Port: 3001                                                     │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                      PROPERTIES APP                            │
├───────────────────────────────────────────────────────────────┤
│ Responsibilities:                                              │
│ • Property listings & search                                   │
│ • Advanced filtering (price, location, amenities)             │
│ • Property details & gallery                                   │
│ • Favorites/wishlist                                           │
│ • Property sharing                                             │
│ • Analytics dashboard                                          │
│                                                                │
│ Dependencies: @kaimosi/ui, @kaimosi/database, @kaimosi/auth  │
│ Port: 3002                                                     │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                   PRINT-ON-DEMAND APP                          │
├───────────────────────────────────────────────────────────────┤
│ Responsibilities:                                              │
│ • Product catalog (t-shirts, mugs, etc.)                      │
│ • Design studio (canvas editor)                                │
│ • Template library                                             │
│ • Shopping cart                                                │
│ • M-Pesa payment integration                                   │
│ • Order tracking & management                                  │
│ • Admin dashboard                                              │
│                                                                │
│ Dependencies: @kaimosi/ui, @kaimosi/database, @kaimosi/utils │
│ Port: 3003                                                     │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                        ADMIN APP                               │
├───────────────────────────────────────────────────────────────┤
│ Responsibilities:                                              │
│ • Dashboard overview                                           │
│ • Content management                                           │
│ • User management                                              │
│ • Order management (all apps)                                  │
│ • Analytics & reporting                                        │
│ • Review moderation                                            │
│                                                                │
│ Dependencies: ALL packages (full access)                       │
│ Port: 3004                                                     │
└───────────────────────────────────────────────────────────────┘
```

---

## 📚 Package Responsibilities

```
┌─────────────────────────────────────────────────────────────┐
│                      @kaimosi/ui                             │
├─────────────────────────────────────────────────────────────┤
│ Contains:                                                    │
│ • All UI components (Button, Card, Dialog, etc.)           │
│ • Shared React hooks (useToast, useMobile)                 │
│ • Theme provider                                            │
│ • Tailwind utilities                                        │
│                                                             │
│ Used by: ALL apps                                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    @kaimosi/database                         │
├─────────────────────────────────────────────────────────────┤
│ Contains:                                                    │
│ • Prisma client configuration                               │
│ • Data access services (property, marketplace, POD)        │
│ • Database utilities                                        │
│ • Prisma schema & migrations                                │
│                                                             │
│ Used by: Marketplace, Properties, Print-on-Demand, Admin    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      @kaimosi/auth                           │
├─────────────────────────────────────────────────────────────┤
│ Contains:                                                    │
│ • Better-auth configuration                                 │
│ • Auth client & server utilities                            │
│ • Session management                                        │
│ • Auth middleware                                           │
│                                                             │
│ Used by: ALL apps (authentication required)                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      @kaimosi/types                          │
├─────────────────────────────────────────────────────────────┤
│ Contains:                                                    │
│ • Property types                                            │
│ • Marketplace types                                         │
│ • Print-on-Demand types                                     │
│ • User types                                                │
│ • Common shared types                                       │
│                                                             │
│ Used by: ALL apps and packages                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      @kaimosi/utils                          │
├─────────────────────────────────────────────────────────────┤
│ Contains:                                                    │
│ • cn() utility (className merging)                          │
│ • Date formatting utilities                                 │
│ • Validation schemas (Zod)                                  │
│ • M-Pesa integration                                        │
│ • Common helper functions                                   │
│                                                             │
│ Used by: ALL apps and packages                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       @kaimosi/cms                           │
├─────────────────────────────────────────────────────────────┤
│ Contains:                                                    │
│ • Sanity client configuration                               │
│ • GROQ queries                                              │
│ • Schema definitions                                        │
│ • Image URL builder                                         │
│                                                             │
│ Used by: Web, Admin                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Example: Property Listing

```
1. User visits Properties App
   └─> apps/properties/app/page.tsx

2. App imports UI components
   └─> @kaimosi/ui/components/card

3. App imports types
   └─> @kaimosi/types (Property type)

4. App fetches data from database
   └─> @kaimosi/database/services/property
       └─> Uses Prisma client
           └─> @kaimosi/database/client

5. App checks authentication
   └─> @kaimosi/auth
       └─> Uses database for user session
           └─> @kaimosi/database

6. App formats data
   └─> @kaimosi/utils (date formatting, etc.)

7. App renders UI
   └─> Uses @kaimosi/ui components
       └─> Uses @kaimosi/utils/cn for styling
```

---

## 🌊 Request Flow Diagram

```
┌──────────────┐
│   Browser    │
└──────┬───────┘
       │
       │ HTTP Request
       ▼
┌──────────────────┐
│   Next.js App    │  (e.g., @kaimosi/web)
│   (Port 3000)    │
└──────┬───────────┘
       │
       ├─────────────────┐
       │                 │
       ▼                 ▼
┌─────────────┐   ┌──────────────┐
│  Components │   │  API Routes  │
│             │   │              │
│ (@kaimosi/  │   │ (Server      │
│     ui)     │   │  Actions)    │
└─────────────┘   └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │  Database    │
                  │  Services    │
                  │              │
                  │ (@kaimosi/   │
                  │  database)   │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │   Prisma     │
                  │   Client     │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │  PostgreSQL  │
                  │   Database   │
                  └──────────────┘
```

---

## 🚀 Build Pipeline

```
┌─────────────────────────────────────────────────────┐
│                   Turborepo                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Step 1: Build Shared Packages                     │
│  ┌────────────────────────────────────────┐       │
│  │  @kaimosi/types                        │       │
│  │         ↓                               │       │
│  │  @kaimosi/utils                        │       │
│  │         ↓                               │       │
│  │  @kaimosi/ui                           │       │
│  │         ↓                               │       │
│  │  @kaimosi/database                     │       │
│  │         ↓                               │       │
│  │  @kaimosi/auth                         │       │
│  │         ↓                               │       │
│  │  @kaimosi/cms                          │       │
│  └────────────────────────────────────────┘       │
│                     ↓                               │
│  Step 2: Build Applications (in parallel)          │
│  ┌────────────────────────────────────────┐       │
│  │  @kaimosi/web          ┐               │       │
│  │  @kaimosi/marketplace  │ Parallel      │       │
│  │  @kaimosi/properties   │ Build         │       │
│  │  @kaimosi/print-on-demand ┐            │       │
│  │  @kaimosi/admin        ┘               │       │
│  └────────────────────────────────────────┘       │
│                     ↓                               │
│  Step 3: Cache Results                              │
│  └─> .turbo/cache/                                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 📂 File System Layout

```
kaimosi/
│
├── apps/                          # Applications
│   ├── web/                       # Web app
│   │   ├── app/
│   │   │   ├── (marketing)/
│   │   │   │   └── page.tsx
│   │   │   ├── attractions/
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   ├── lib/
│   │   ├── public/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── next.config.mjs
│   │
│   ├── marketplace/               # Marketplace app
│   ├── properties/                # Properties app
│   ├── print-on-demand/          # POD app
│   └── admin/                     # Admin app
│
├── packages/                      # Shared packages
│   ├── ui/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── database/
│   │   ├── src/
│   │   │   ├── client.ts
│   │   │   └── services/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── package.json
│   │
│   ├── auth/
│   ├── types/
│   ├── utils/
│   └── cms/
│
├── docs/                          # Documentation
├── tools/                         # Dev tools
├── .github/                       # CI/CD
│
├── pnpm-workspace.yaml           # Workspace config
├── turbo.json                     # Turbo config
├── tsconfig.json                  # TypeScript config
├── package.json                   # Root package
└── README.md                      # Main README
```

---

## 🔌 Integration Points

### External Services

```
┌──────────────────────────────────────────────────┐
│             Kaimosi Monorepo                     │
├──────────────────────────────────────────────────┤
│                                                  │
│  Apps              Packages                      │
│  ├── web          ├── ui                         │
│  ├── marketplace  ├── database ───┐            │
│  ├── properties   ├── auth        │            │
│  ├── POD          ├── cms ─────┐  │            │
│  └── admin        └── utils     │  │            │
│                                  │  │            │
└──────────────────────────────────┼──┼────────────┘
                                   │  │
                        ┌──────────┘  └─────────┐
                        │                        │
                        ▼                        ▼
              ┌──────────────┐         ┌─────────────┐
              │   Sanity     │         │ PostgreSQL  │
              │     CMS      │         │  Database   │
              └──────────────┘         └─────────────┘

                        ┌───────────────┐
                        │    M-Pesa     │
                        │   Payment     │
                        └───────────────┘
                                ▲
                                │
                    ┌───────────┴──────────┐
                    │   @kaimosi/utils/    │
                    │      mpesa           │
                    └──────────────────────┘
```

---

## 🎨 Component Hierarchy

```
App Component Tree
└── RootLayout (@/app/layout.tsx)
    ├── ThemeProvider (@kaimosi/ui)
    ├── Header (local component)
    │   ├── Button (@kaimosi/ui)
    │   └── UserMenu (local)
    │       └── Avatar (@kaimosi/ui)
    ├── Main Content
    │   ├── Card (@kaimosi/ui)
    │   ├── Dialog (@kaimosi/ui)
    │   └── Custom Component (local)
    └── Footer (local component)
        └── Newsletter (local)
            ├── Input (@kaimosi/ui)
            └── Button (@kaimosi/ui)
```

---

## 🔐 Authentication Flow

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │ 1. Login Request
       ▼
┌──────────────────┐
│   App (Client)   │
│                  │
│ @kaimosi/auth/   │
│    client        │
└──────┬───────────┘
       │ 2. Auth API Call
       ▼
┌──────────────────┐
│  Auth Server     │
│                  │
│ @kaimosi/auth    │
└──────┬───────────┘
       │ 3. Verify Credentials
       ▼
┌──────────────────┐
│   Database       │
│                  │
│ @kaimosi/        │
│   database       │
└──────┬───────────┘
       │ 4. Return Session
       ▼
┌──────────────────┐
│   App (Client)   │
│                  │
│ Authenticated    │
│ State            │
└──────────────────┘
```

---

**This visual guide helps you understand the monorepo structure at a glance!**

For implementation details, see:
- [MONOREPO_SETUP_PLAN.md](./MONOREPO_SETUP_PLAN.md)
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
