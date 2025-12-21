# Propeller Component Library - Agent Guidelines

This document provides comprehensive guidelines for AI agents and developers working on the Propeller component library. Following these patterns ensures consistency, accessibility, and maintainability.

## Project Overview

**Propeller** is a React component library built with:
- **React 19** with TypeScript
- **Tailwind CSS v4** with CSS variables for theming
- **Radix UI** primitives for accessible, unstyled components
- **shadcn/ui** patterns (New York style)
- **Lucide React** for icons
- **Storybook v10** for component documentation and testing

The library provides both **UI primitives** (`src/components/ui/`) and **domain-specific components** (`src/components/chat/`, `src/components/shared/`).

## Architecture & Structure

```
src/
├── components/
│   ├── ui/           # Base UI primitives (buttons, inputs, etc.)
│   ├── chat/         # Chat-specific components
│   └── shared/       # Shared domain components
├── lib/              # Utilities (cn, etc.)
├── hooks/            # Custom React hooks
└── stories/          # Storybook demo pages
```

### Component Organization

- **UI Components** (`ui/`): Headless, composable primitives with variants
- **Domain Components** (`chat/`, `shared/`): Feature-specific implementations
- **Stories**: Every component has a `.stories.tsx` file for documentation and testing

## Component Development Guidelines

### 1. Accessibility-First DOM Patterns

**CRITICAL**: Structure your DOM to make automated accessibility testing conclusive and robust.

#### ✅ Always Define Explicit Background Colors

```tsx
// ❌ Inconclusive contrast - inherited background
<span className="text-sm text-muted-foreground">2 / 5</span>

// ✅ Conclusive contrast - explicit background
<span className="text-sm text-muted-foreground bg-background">2 / 5</span>
```

**Rule**: Any text element should have an explicit `bg-*` class on itself or its immediate parent.

#### ✅ Keep DOM Hierarchies Flat

```tsx
// ❌ Unnecessary nesting makes a11y tools struggle
<div className="wrapper">
  <div className="inner">
    <div className="container">
      <span>Content</span>
    </div>
  </div>
</div>

// ✅ Flatter structure
<div className="container bg-background">
  <span className="text-foreground">Content</span>
</div>
```

**Rule**: Avoid wrapper divs unless they serve a semantic or layout purpose.

#### ✅ Avoid Overlapping Elements

```tsx
// ❌ Absolute positioning creates overlaps
<div className="relative">
  <div className="absolute top-0 left-0">Overlapping text</div>
  <p>Some content</p>
</div>

// ✅ Use flexbox/grid for layout
<div className="flex items-center gap-2">
  <span>Clear text</span>
  <p>Some content</p>
</div>
```

**Rule**: Prefer `flex`, `grid`, and `gap` over `absolute` positioning for text layout.

#### ✅ Define Colors at Component Level

```tsx
// ❌ Color too far from text, hard for tools to detect
<Card>
  <div>
    <span className="text-muted-foreground">Text</span>
  </div>
</Card>

// ✅ Both foreground AND background defined together
<Card className="bg-card text-card-foreground">
  <span className="text-muted-foreground">Text</span>
</Card>
```

**Rule**: Root component should define both `bg-*` and `text-*` classes.

#### ✅ Use Semantic ARIA Roles Correctly

```tsx
// ❌ Missing required child roles
<div role="list">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// ✅ Proper ARIA structure
<div role="list">
  <div role="listitem">Item 1</div>
  <div role="listitem">Item 2</div>
</div>
```

**Rule**: ARIA roles must match their semantic requirements:
- `role="list"` requires `role="listitem"` children
- `role="progressbar"` requires `aria-label` or `aria-labelledby`
- `role="button"` requires accessible name

#### ✅ Provide Accessible Names

```tsx
// ❌ Interactive element without label
<button onClick={handleClick}>
  <Icon />
</button>

// ✅ Accessible label provided
<button onClick={handleClick} aria-label="Close dialog">
  <X className="size-4" />
</button>
```

**Rule**: All interactive elements need accessible names via:
- Visible text content
- `aria-label`
- `aria-labelledby` (referencing visible text)

### 2. Component API Design

#### Props Interface

```tsx
export interface ComponentNameProps {
  // Required props first
  children: React.ReactNode

  // Optional configuration
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"

  // Callbacks
  onAction?: () => void

  // Style overrides
  className?: string
}
```

**Rules**:
- Use explicit types (no `any`)
- Document complex props with JSDoc
- Support `className` for style overrides
- Use Radix UI's `asChild` pattern for composition

#### Variant Patterns

Use `class-variance-authority` for variant management:

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input bg-background",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### 3. Composable Architecture

Build components as **composition primitives**:

```tsx
// ✅ Composable pattern
export function Item({ children, className, ...props }) {
  return (
    <div role="listitem" className={cn(itemVariants(), className)} {...props}>
      {children}
    </div>
  )
}

export function ItemMedia({ children, ...props }) {
  return <div data-slot="item-media" {...props}>{children}</div>
}

export function ItemContent({ children, ...props }) {
  return <div data-slot="item-content" {...props}>{children}</div>
}

// Usage - flexible composition
<Item>
  <ItemMedia><Icon /></ItemMedia>
  <ItemContent>Title</ItemContent>
</Item>
```

**Use `data-slot` attributes** to identify component parts for styling and testing.

## Styling Patterns

### Theme System

Propeller uses **CSS variables** for theming with light/dark mode support:

```tsx
// ✅ Use semantic color tokens
<div className="bg-background text-foreground">
  <p className="text-muted-foreground">Muted text</p>
  <Button className="bg-primary text-primary-foreground">Action</Button>
</div>

// ❌ Don't use arbitrary colors
<div className="bg-white text-black dark:bg-black dark:text-white">
```

**Available semantic tokens**:
- `background` / `foreground`
- `card` / `card-foreground`
- `popover` / `popover-foreground`
- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `muted` / `muted-foreground`
- `accent` / `accent-foreground`
- `destructive` / `destructive-foreground`
- `border`, `input`, `ring`

### Utility Usage

```tsx
// ✅ Use Tailwind's utility-first approach
<div className="flex items-center gap-2 px-4 py-2 rounded-md">

// ❌ Don't create custom CSS classes
<div className="custom-container">
```

**Exception**: Use `@layer components` in CSS for truly reusable patterns not achievable with utilities.

## Storybook Guidelines

### Story Structure

Every component must have a `.stories.tsx` file:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from './ComponentName'

const meta = {
  title: 'Category/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered', // or 'padded' or 'fullscreen'
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>

export default meta
type Story = StoryObj<typeof meta>

// Default story (minimum viable example)
export const Default: Story = {
  args: {
    children: 'Example content',
  },
}

// Variant stories (show different states/configurations)
export const Variant: Story = {
  args: {
    variant: 'outline',
  },
}

// Interactive stories (test user interactions)
export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    await userEvent.click(button)
    await expect(button).toHaveAttribute('aria-pressed', 'true')
  },
}
```

### Testing with Storybook

**Import test utilities**:
```tsx
import { userEvent, within, expect } from 'storybook/test'
```

**Write interaction tests** to improve code coverage:
- Target 100% statements, 100% functions, 100% lines
- Aim for 85%+ branch coverage (100% is ideal but not always practical)
- Use `play` functions to simulate user interactions
- Use `within(canvasElement)` to scope queries
- Prefer `getByRole` and `getByLabelText` for accessibility

**Coverage interpretation**:
- **Statements**: Individual lines of code executed
- **Branches**: Different paths through conditionals (if/else, ternaries)
- **Functions**: Function definitions called
- **Lines**: Physical lines of code executed

**Yellow highlighting** = partially covered branches (only one side of conditional tested)

### Accessibility Testing

Storybook includes `@storybook/addon-a11y` for automated accessibility testing.

**Critical violations** to fix immediately:
- Missing ARIA roles on interactive elements
- Missing accessible names (labels)
- Incorrect ARIA parent-child relationships
- Color contrast failures (below 4.5:1 for normal text)

**Inconclusive results** are acceptable if:
- Manual visual inspection confirms good contrast
- DOM structure is as flat as possible with explicit backgrounds
- The issue is due to complex layering (not a real problem)

## Code Quality Standards

### TypeScript

- Use explicit types (avoid `any`)
- Prefer interfaces for public APIs
- Use type inference for local variables
- Export prop types for documentation

### Component Exports

```tsx
// ✅ Named exports (preferred for components)
export function Button({ ... }) { }

// ✅ Export types
export type { ButtonProps }
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `Button.tsx`)
- Stories: `PascalCase.stories.tsx` (e.g., `Button.stories.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `camelCase.types.ts` or inline in component file

### Import Order

```tsx
// 1. External dependencies
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

// 2. Internal components/UI
import { Button } from '@/components/ui/button'

// 3. Utilities/lib
import { cn } from '@/lib/utils'

// 4. Types
import type { ComponentProps } from './types'
```

## Testing Strategy

### Component Tests (via Storybook)

- **Every component** has stories covering:
  - Default state
  - All variants
  - Interactive states (hover, focus, active, disabled)
  - Edge cases (empty, long text, etc.)

### Coverage Goals

- **Statements**: 100%
- **Branches**: 85%+ (100% ideal)
- **Functions**: 100%
- **Lines**: 100%

### Accessibility Tests

- Run in Storybook's a11y panel
- **Zero critical violations** before shipping
- Address warnings when practical
- Ignore inconclusive results if manually verified

## Working with AI Agents

### When Creating Components

1. **Read existing components** first to match patterns
2. **Use composition** over monolithic components
3. **Add stories immediately** (not as an afterthought)
4. **Test accessibility** in Storybook before considering done
5. **Check coverage** and add interaction tests for gaps

### When Modifying Components

1. **Read the component file** before editing
2. **Check if stories exist** and update them
3. **Verify changes in Storybook** before committing
4. **Run accessibility tests** to catch regressions
5. **Update this document** if patterns change

### Common Mistakes to Avoid

- ❌ Creating components without explicit background colors
- ❌ Using `any` types
- ❌ Missing ARIA roles or labels
- ❌ Skipping stories for "small" components
- ❌ Using arbitrary Tailwind values instead of theme tokens
- ❌ Deep nesting of wrapper divs
- ❌ Absolute positioning for text layout

## Resources

- **Storybook**: [http://localhost:6006](http://localhost:6006) (when running `npm run storybook`)
- **Radix UI Docs**: https://www.radix-ui.com/primitives/docs/overview/introduction
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com/docs
- **Lucide Icons**: https://lucide.dev/icons

## Quick Reference

### Start Development
```bash
npm run dev          # Vite dev server
npm run storybook    # Storybook dev
```

### Build
```bash
npm run build        # Production build
npm run build-storybook  # Build Storybook
```

### Linting
```bash
npm run lint         # ESLint
```

---

**Last Updated**: December 2025
**Maintained by**: Propeller Team
