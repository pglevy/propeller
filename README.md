# Propeller

A modern React component library built for conversational AI interfaces, featuring accessible primitives and domain-specific chat components.

## Overview

Propeller provides production-ready UI components with a focus on:

- **Accessibility-first design** - WCAG 2.1 AA compliant with automated testing
- **Composable architecture** - Build complex UIs from simple primitives
- **Theme flexibility** - CSS variable-based theming with light/dark mode
- **Developer experience** - TypeScript, Storybook documentation, and comprehensive testing

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS v4** for styling with CSS variables
- **Radix UI** for accessible, unstyled primitives
- **Lucide React** for icons
- **Storybook v10** for component documentation and testing
- **Vitest** for unit and interaction testing

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
# Start Storybook (primary development workflow)
npm run storybook

# Start Vite dev server (for quick component testing)
npm run dev

# Run tests
npm test

# Run linter
npm run lint
```

### Building

```bash
# Build library for npm
npm run build:lib

# Build Storybook (for local preview)
npm run build-storybook

# Build demo app
npm run build
```

**Note:** GitHub Pages automatically builds and deploys Storybook on push to main.

## Project Structure

```
src/
├── components/
│   ├── ui/           # Base UI primitives (Button, Input, Card, etc.)
│   ├── chat/         # Chat-specific components (ChatPanel, AgentSteps, etc.)
│   └── shared/       # Shared domain components
├── lib/              # Utilities (cn helper, etc.)
├── hooks/            # Custom React hooks
└── stories/          # Storybook demo pages
```

## Component Categories

### UI Primitives (`src/components/ui/`)

Foundational components built on Radix UI primitives:

- **Layout**: Card, Separator, Resizable, Sidebar
- **Forms**: Button, Input, Select, Checkbox, Radio, Switch, Slider
- **Navigation**: Tabs, Accordion, Navigation Menu, Breadcrumb
- **Feedback**: Alert, Toast, Progress, Spinner, Badge
- **Overlays**: Dialog, Popover, Tooltip, Dropdown Menu, Sheet
- **Data Display**: Table, Avatar, Carousel, Empty State

### Chat Components (`src/components/chat/`)

Specialized components for conversational interfaces:

- **ChatPanel** - Main chat container with message list
- **ChatInput** - Message input with send button
- **AgentSteps** - Display multi-step agent processes
- **TaskProgress** - Show task completion status
- **ChatFeedback** - Thumbs up/down feedback UI
- **ChatConfirmation** - Confirmation dialogs for actions
- **UserMessage** / **AssistantMessage** - Message bubbles

## Design Principles

### Accessibility

All components follow WCAG 2.1 AA standards:

- Semantic HTML and ARIA roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance (4.5:1 minimum)
- Focus management

### Composition

Components are designed to be composed together:

```tsx
<Item>
  <ItemMedia><Icon /></ItemMedia>
  <ItemContent>
    <ItemTitle>Title</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
</Item>
```

### Theming

Use semantic color tokens that adapt to light/dark mode:

```tsx
<div className="bg-background text-foreground">
  <p className="text-muted-foreground">Muted text</p>
  <Button className="bg-primary text-primary-foreground">Action</Button>
</div>
```

Available tokens: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`

## Documentation

- **Component Documentation**: Visit [https://pglevy.github.io/propeller/](https://pglevy.github.io/propeller/) or run `npm run storybook` locally
- **Agent Guidelines**: See [AGENTS.md](./AGENTS.md) for AI agent development patterns
- **Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions

## Testing

Propeller uses Storybook's interaction testing and Vitest:

```bash
# Run all tests
npm test

# Run tests with UI
npm test:ui

# Run color palette enforcement tests
npm test:color
```

Coverage goals:
- Statements: 100%
- Branches: 85%+ (100% ideal)
- Functions: 100%
- Lines: 100%

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Code style and conventions
- Component development workflow
- Accessibility requirements
- Testing standards
- Pull request process

## License

[Add your license here]

## Acknowledgments

Built with patterns from [shadcn/ui](https://ui.shadcn.com) (New York style) and powered by [Radix UI](https://www.radix-ui.com) primitives.
