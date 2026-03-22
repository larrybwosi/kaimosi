# @kaimosi/ui - Reusable React Component Library

Shared React components and design system for the Kaimosi monorepo.

## Features
- **🎨 Design System**: Radix UI based accessible components.
- **⛰️ Tailwind CSS**: Consistent styling for all applications.
- **🧩 Component Library**: Reusable UI components like Buttons, Cards, Modals, and more.
- **🏗️ Layout Patterns**: Common layouts and UI elements.

## Usage

```typescript
import { Button } from '@kaimosi/ui/components/button';
import { Card } from '@kaimosi/ui/components/card';
import { useToast } from '@kaimosi/ui/hooks/use-toast';

// Use shared components in Next.js pages
const Page = () => (
  <Card>
    <Button variant="primary">Click Me</Button>
  </Card>
);
```

## Structure
- `src/components/`: Reusable React components.
- `src/hooks/`: Custom React hooks for UI logic.
- `package.json`: Package-specific dependencies.
- `tsconfig.json`: TypeScript configuration for the package.

## Development

```bash
# Build the package
pnpm build

# Type check
pnpm type-check
```
