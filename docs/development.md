# Development Workflow and Environment Setup

The Kaimosi monorepo provides a streamlined development experience using modern tools and practices.

## Prerequisites

- **Node.js** >= 18.0.0.
- **pnpm** >= 9.0.0.
- **Git**.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/larrybwosi/kaimosi.git
   cd kaimosi
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   - Create a `.env.local` file in each app directory or the root.
   - Refer to each app's documentation for required environment variables.

## Running Applications

### Start All Apps in Parallel

Run all applications and services in development mode:

```bash
pnpm dev
```

### Run a Specific App

If you want to focus on a single application, run it by filtering:

```bash
pnpm --filter @kaimosi/web dev          # Port 3000
pnpm --filter @kaimosi/marketplace dev  # Port 3001
pnpm --filter @kaimosi/properties dev   # Port 3002
pnpm --filter @kaimosi/print-on-demand dev # Port 3003
pnpm --filter @kaimosi/admin dev        # Port 3004
```

## Task Execution

Turbo is used to run tasks efficiently:

- **Build**: `pnpm build` - Build all packages and applications.
- **Lint**: `pnpm lint` - Check for linting errors across the entire monorepo.
- **Type Check**: `pnpm type-check` - Verify TypeScript integrity.
- **Format**: `pnpm format` - Auto-format code using Prettier.

## Shared Packages

Developing with shared packages:

- Modifications in `packages/` are automatically picked up by applications during development.
- For certain changes, you may need to restart the development server or run `pnpm build` to ensure all packages are up to date.

## Code Conventions

- **TypeScript**: Use TypeScript for all new code to ensure type safety.
- **Tailwind CSS**: Use Tailwind for all styling to maintain a consistent UI.
- **Radix UI**: Leverage Radix UI for accessible components.
- **Conventional Commits**: Use conventional commit messages to track changes clearly:
  - `feat`: New feature.
  - `fix`: Bug fix.
  - `docs`: Documentation updates.
  - `style`: Formatting changes.
  - `refactor`: Code refactoring.
  - `test`: Test-related changes.
  - `chore`: Maintenance tasks.

## Troubleshooting

- **Dependency Issues**: Run `pnpm install` or `pnpm clean` to reset the environment.
- **Build Failures**: Check the logs for specific errors and ensure all environment variables are correctly set.
- **Turborepo Caching**: If you encounter issues with cached results, run `pnpm clean` or clear the turbo cache.
- **Next.js Cache**: Delete the `.next` directory in the application folder to clear the Next.js cache.
