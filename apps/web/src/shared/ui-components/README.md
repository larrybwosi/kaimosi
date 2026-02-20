# @kaimosi/ui - Shared UI Components Library

A collection of reusable React components built with Tailwind CSS and Radix UI primitives. Used across all Kaimosi services.

## Features
- **Component Library**: Pre-built, accessible components
- **Tailwind Styling**: Utility-first CSS framework
- **Radix UI Primitives**: Low-level, unstyled components
- **TypeScript**: Full type safety
- **Dark Mode**: Built-in theme support

## Installation

```bash
# From monorepo root (automatically installed)
pnpm install

# Use in your service
import { Button } from '@kaimosi/ui/components/button';
```

## Structure

```
shared/ui-components/
├── src/
│   ├── components/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   └── ... more components
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   └── use-theme.ts
│   ├── styles/
│   │   └── globals.css
│   └── index.ts                 # Main export file
├── tests/
├── package.json
└── tsconfig.json
```

## Usage

```tsx
import { Button } from '@kaimosi/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kaimosi/ui/components/card';
import { Input } from '@kaimosi/ui/components/input';

export default function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Type something..." />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## Adding Components

1. Create new component in `src/components/{component-name}.tsx`
2. Add export to `src/index.ts`
3. Add unit tests in `tests/{component-name}.test.tsx`
4. Update this README with usage examples
5. Commit and publish

## Component Guidelines

- **Accessibility**: All components must support keyboard navigation and screen readers
- **Responsive**: Mobile-first approach using Tailwind breakpoints
- **Type Safe**: Full TypeScript support with proper prop types
- **Documented**: Include JSDoc comments for complex props
- **Tested**: Minimum 80% code coverage
- **Unstyled Variants**: Provide unstyled prop for maximum flexibility

## Versioning

Follow semantic versioning:
- **Patch (x.x.Y)**: Bug fixes, style updates
- **Minor (x.Y.0)**: New components, new props
- **Major (Y.0.0)**: Breaking changes, removed components

## Publishing

```bash
# From monorepo root
pnpm -F @kaimosi/ui build
pnpm -F @kaimosi/ui publish  # (if using npm registry)
```

## References

- [Radix UI Components](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Best Practices](https://react.dev/)
