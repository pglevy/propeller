# Component Development Checklist

Use this checklist when creating or modifying components to ensure quality and consistency.

## Planning Phase

- [ ] Review existing components for similar patterns
- [ ] Check if component can be composed from existing primitives
- [ ] Identify required variants (size, color, state)
- [ ] Consider accessibility requirements upfront
- [ ] Determine if component needs Radix UI primitive

## Implementation Phase

### Component File

- [ ] Create component file in appropriate directory (`ui/`, `chat/`, `shared/`)
- [ ] Use TypeScript with explicit types (no `any`)
- [ ] Export props interface
- [ ] Use `class-variance-authority` for variants
- [ ] Include explicit background colors on text elements
- [ ] Keep DOM hierarchy flat (avoid unnecessary wrappers)
- [ ] Use semantic color tokens (not arbitrary colors)
- [ ] Support `className` prop for style overrides
- [ ] Use `data-slot` attributes for component parts
- [ ] Add JSDoc comments for complex props

### Accessibility

- [ ] Use semantic HTML elements
- [ ] Add appropriate ARIA roles
- [ ] Provide accessible names for interactive elements
- [ ] Ensure keyboard navigation works
- [ ] Add focus indicators
- [ ] Test with screen reader (if possible)
- [ ] Verify color contrast (4.5:1 minimum)

### Stories File

- [ ] Create `.stories.tsx` file
- [ ] Add `Default` story (minimum viable example)
- [ ] Add stories for all variants
- [ ] Add stories for different states (hover, focus, disabled, error)
- [ ] Add stories for edge cases (empty, long text, etc.)
- [ ] Add interaction tests using `play` function
- [ ] Use accessible queries (`getByRole`, `getByLabelText`)

## Testing Phase

### Build & Lint

- [ ] Run `npm run build` - passes without errors
- [ ] Run `npm run lint` - passes without warnings
- [ ] No unused imports or variables
- [ ] No JSX in JSDoc comments

### Storybook

- [ ] Start Storybook (`npm run storybook`)
- [ ] All stories render correctly
- [ ] Variants display as expected
- [ ] Interactive tests pass
- [ ] Check Accessibility panel - zero critical violations
- [ ] Manually verify color contrast if inconclusive
- [ ] Test in both light and dark mode
- [ ] Test responsive behavior (if applicable)

### Coverage

- [ ] Run `npm test`
- [ ] Statements: 100%
- [ ] Functions: 100%
- [ ] Lines: 100%
- [ ] Branches: 85%+ (aim for 100%)
- [ ] Add interaction tests for uncovered branches

## Documentation Phase

- [ ] Component has clear JSDoc description
- [ ] Props are documented (if complex)
- [ ] Stories demonstrate all use cases
- [ ] Update README if adding new category
- [ ] Update AGENTS.md if introducing new pattern

## Pre-PR Phase

- [ ] Review your own code
- [ ] Test component in isolation
- [ ] Test component in composition with others
- [ ] Verify no console errors or warnings
- [ ] Check bundle size impact (if significant)
- [ ] Update CHANGELOG (if applicable)

## PR Submission

- [ ] Create feature branch with descriptive name
- [ ] Write clear PR title (conventional commits format)
- [ ] Fill out PR template completely
- [ ] Add screenshots or GIF demo
- [ ] Link related issues
- [ ] Request review from maintainers

## Common Pitfalls to Avoid

- ❌ Missing explicit background colors on text
- ❌ Deep nesting of wrapper divs
- ❌ Using arbitrary colors instead of theme tokens
- ❌ Missing ARIA roles or labels
- ❌ Skipping stories for "small" components
- ❌ Using `any` types
- ❌ Absolute positioning for text layout
- ❌ Testing in Storybook before running build
- ❌ JSX syntax in JSDoc comments

## Quick Reference

### Start Development
```bash
npm run storybook    # Start Storybook
npm run dev          # Start Vite dev server
```

### Testing
```bash
npm run build        # Build (catches TS/JSX errors)
npm run lint         # Lint code
npm test             # Run tests
npm test:ui          # Run tests with UI
npm test:color       # Check color palette
```

### Component Template Location
See [CONTRIBUTING.md](./CONTRIBUTING.md) for full component and stories templates.

### Resources
- [AGENTS.md](./AGENTS.md) - Detailed technical patterns
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Full contribution guide
- [Radix UI Docs](https://www.radix-ui.com/primitives)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Storybook Docs](https://storybook.js.org/docs)
