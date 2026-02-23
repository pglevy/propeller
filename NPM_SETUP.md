# NPM Package Setup

Propeller is now configured as an npm package following the same patterns as Sailwind.

## Configuration Files

### `.npmignore`
Excludes development files from the published package:
- Source files (only `dist/` is published)
- Storybook files
- Tests and test configuration
- Build tools and configs
- Documentation (except README.md)

### `tsconfig.lib.json`
TypeScript configuration for library builds:
- Extends `tsconfig.app.json`
- Generates declaration files (`.d.ts`)
- Excludes stories and tests

### `vite.config.ts`
Added library build mode:
- Entry point: `src/index.ts`
- Output format: ES modules
- Preserves module structure
- Externalizes peer dependencies and all Radix UI packages

### `package.json`
Updated with:
- Package name: `@pglevy/propeller`
- Version: `0.1.0`
- Main entry: `./dist/index.js`
- Types: `./dist/index.d.ts`
- Exports configuration for modern bundlers
- Peer dependencies: React 18 or 19
- New scripts:
  - `build:lib` - Build library for npm
  - `prepublishOnly` - Auto-build before publishing
  - `version:patch/minor/major` - Bump version
  - `release` - Build and publish

### `src/index.ts`
Library entry point exporting:
- All UI components
- Chat components
- Shared components
- Utilities
- Hooks

## Usage

### Build Library
```bash
npm run build:lib
```

### Version Bump
```bash
npm run version:patch  # 0.1.0 -> 0.1.1
npm run version:minor  # 0.1.0 -> 0.2.0
npm run version:major  # 0.1.0 -> 1.0.0
```

### Publish
```bash
npm run release
```

Or manually:
```bash
npm run build:lib
npm publish
```

## Installation (for consumers)

```bash
npm install @pglevy/propeller
```

## Import Examples

```tsx
// Import specific components
import { Button, Card, ChatPanel } from '@pglevy/propeller'

// Import utilities
import { cn } from '@pglevy/propeller'

// Import hooks
import { useMobile } from '@pglevy/propeller'
```

## Peer Dependencies

Consumers must install:
- `react` (^18.0.0 || ^19.0.0)
- `react-dom` (^18.0.0 || ^19.0.0)

All other dependencies (Radix UI, Lucide, etc.) are bundled with the library.

## Notes

- The library preserves module structure for better tree-shaking
- TypeScript declarations are generated automatically
- Storybook and tests are excluded from the published package
- The package follows the same patterns as Sailwind for consistency
