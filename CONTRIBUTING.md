# Contributing to Propeller

Thank you for your interest in contributing to Propeller! This guide will help you understand our development workflow, design conventions, and quality standards.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Component Development](#component-development)
- [Design Conventions](#design-conventions)
- [Accessibility Requirements](#accessibility-requirements)
- [Testing Standards](#testing-standards)
- [Pull Request Process](#pull-request-process)
- [Code Review Guidelines](#code-review-guidelines)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Familiarity with React, TypeScript, and Tailwind CSS
- Understanding of accessibility principles (WCAG 2.1 AA)

### Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Start Storybook: `npm run storybook`
4. Read [AGENTS.md](./AGENTS.md) for detailed technical patterns

### Before You Start

- Check existing issues and PRs to avoid duplicate work
- Open an issue to discuss major changes before implementing
- Review existing components to understand patterns

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/component-name
# or
git checkout -b fix/issue-description
```

### 2. Development Cycle

**Always follow this order to catch errors early:**

1. **Write the component** with TypeScript types
2. **Write the stories** with examples and interaction tests
3. **Run `npm run build`** to catch TypeScript/JSX errors
4. **Run `npm run lint`** to catch style issues
5. **Test in Storybook** (`npm run storybook`)
6. **Check accessibility** in Storybook's a11y panel
7. **Verify test coverage** (`npm test`)

### 3. Common Build Errors to Avoid

```tsx
// ❌ JSX in JSDoc comments breaks the parser
/**
 * Example: <Component>{children}</Component>
 */

// ✅ Use plain text instead
/**
 * Example: Pass JSX content as children
 */
```

```tsx
// ❌ Unused imports fail linting
import { ComponentA, ComponentB } from './component'
// only using ComponentA

// ✅ Remove unused imports
import { ComponentA } from './component'
```

## Component Development

### File Structure

For a new component called `MyComponent`:

```
src/components/ui/
├── my-component.tsx        # Component implementation
└── my-component.stories.tsx # Storybook stories
```

### Component Template

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const myComponentVariants = cva(
  "base-classes-here bg-background text-foreground",
  {
    variants: {
      variant: {
        default: "variant-specific-classes",
        outline: "border border-input",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {
  // Add component-specific props
}

export function MyComponent({
  className,
  variant,
  size,
  ...props
}: MyComponentProps) {
  return (
    <div
      className={cn(myComponentVariants({ variant, size }), className)}
      {...props}
    />
  )
}
```

### Stories Template

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from 'storybook/test'
import { MyComponent } from './my-component'

const meta = {
  title: 'UI/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Example content',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <MyComponent variant="default">Default</MyComponent>
      <MyComponent variant="outline">Outline</MyComponent>
    </div>
  ),
}

export const Interactive: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const element = canvas.getByText('Click me')
    await userEvent.click(element)
    // Add assertions here
  },
}
```

## Design Conventions

### 1. Accessibility-First DOM Structure

**Critical**: Structure your DOM to make automated accessibility testing conclusive.

#### Always Define Explicit Background Colors

```tsx
// ❌ Inconclusive contrast - inherited background
<span className="text-sm text-muted-foreground">2 / 5</span>

// ✅ Conclusive contrast - explicit background
<span className="text-sm text-muted-foreground bg-background">2 / 5</span>
```

**Rule**: Any text element should have an explicit `bg-*` class on itself or its immediate parent.

#### Keep DOM Hierarchies Flat

```tsx
// ❌ Unnecessary nesting
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

#### Avoid Overlapping Elements

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

### 2. Semantic Color Tokens

**Always use semantic tokens** from the theme system:

```tsx
// ✅ Semantic tokens (adapt to light/dark mode)
<div className="bg-background text-foreground">
  <p className="text-muted-foreground">Muted text</p>
</div>

// ❌ Arbitrary colors (don't adapt to theme)
<div className="bg-white text-black dark:bg-black dark:text-white">
```

**Available tokens**: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`

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

### 4. Variant Management

Use `class-variance-authority` for variants:

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

## Accessibility Requirements

All components must meet **WCAG 2.1 AA** standards.

### Required Checks

- [ ] Semantic HTML elements used correctly
- [ ] ARIA roles and attributes applied properly
- [ ] All interactive elements have accessible names
- [ ] Color contrast meets 4.5:1 minimum (normal text)
- [ ] Keyboard navigation works correctly
- [ ] Focus indicators are visible
- [ ] Screen reader announcements are appropriate

### ARIA Role Requirements

```tsx
// ❌ Missing required child roles
<div role="list">
  <div>Item 1</div>
</div>

// ✅ Proper ARIA structure
<div role="list">
  <div role="listitem">Item 1</div>
</div>
```

**Common role requirements**:
- `role="list"` requires `role="listitem"` children
- `role="progressbar"` requires `aria-label` or `aria-labelledby`
- `role="button"` requires accessible name

### Accessible Names

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

**Provide accessible names via**:
- Visible text content (preferred)
- `aria-label`
- `aria-labelledby` (referencing visible text)

### Testing Accessibility

1. Run Storybook: `npm run storybook`
2. Open your component story
3. Check the **Accessibility** panel
4. Fix all **critical violations** before submitting PR
5. Address **warnings** when practical
6. **Inconclusive results** are acceptable if manually verified

## Testing Standards

### Coverage Goals

- **Statements**: 100%
- **Branches**: 85%+ (100% ideal)
- **Functions**: 100%
- **Lines**: 100%

### Writing Interaction Tests

Use Storybook's `play` function to test user interactions:

```tsx
export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Use accessible queries (prefer getByRole)
    const button = canvas.getByRole('button', { name: 'Submit' })
    
    // Simulate user interactions
    await userEvent.click(button)
    
    // Assert expected behavior
    await expect(button).toHaveAttribute('aria-pressed', 'true')
  },
}
```

**Query priority** (most to least preferred):
1. `getByRole` - Most accessible
2. `getByLabelText` - For form fields
3. `getByPlaceholderText` - For inputs
4. `getByText` - For non-interactive content
5. `getByTestId` - Last resort

### Running Tests

```bash
# Run all tests
npm test

# Run with UI
npm test:ui

# Check color palette enforcement
npm test:color
```

## Pull Request Process

### Before Submitting

- [ ] Code builds without errors (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] All tests pass (`npm test`)
- [ ] Storybook stories added/updated
- [ ] Accessibility checks pass (zero critical violations)
- [ ] Coverage goals met (check in Storybook)
- [ ] Documentation updated if needed

### PR Title Format

Use conventional commits:

```
feat: add MyComponent with variants
fix: correct color contrast in Button
docs: update contributing guidelines
refactor: simplify Item composition pattern
test: add interaction tests for Dialog
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New component
- [ ] Bug fix
- [ ] Enhancement
- [ ] Documentation
- [ ] Refactor

## Checklist
- [ ] Builds without errors
- [ ] Linting passes
- [ ] Tests pass
- [ ] Stories added/updated
- [ ] Accessibility verified
- [ ] Coverage goals met

## Screenshots (if applicable)
Add screenshots or GIFs showing the component

## Related Issues
Closes #123
```

## Code Review Guidelines

### For Reviewers

**Check for**:
- Accessibility compliance (WCAG 2.1 AA)
- Proper use of semantic color tokens
- Flat DOM structure with explicit backgrounds
- Appropriate ARIA roles and labels
- Test coverage meets goals
- Stories demonstrate all variants
- TypeScript types are explicit (no `any`)
- Follows existing component patterns

**Provide**:
- Constructive feedback
- Specific suggestions for improvement
- Recognition of good patterns

### For Contributors

**Respond to feedback**:
- Address all comments or explain why not
- Ask questions if feedback is unclear
- Update PR description if scope changes
- Re-request review after changes

## Questions?

- Open an issue for questions about contributing
- Check [AGENTS.md](./AGENTS.md) for detailed technical patterns
- Review existing components for examples

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions. We're building this together.
