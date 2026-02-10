# Implementation Plan: StoryMapRelease

## Overview

Build the StoryMapRelease component as a composable shared component using existing Propeller shadcn/ui primitives. The implementation proceeds incrementally: types and helpers first, then the main component, then stories and tests.

## Tasks

- [x] 1. Create types and status badge helper
  - [x] 1.1 Create `src/components/shared/story-map-release-types.ts` with `ReleaseStatus` type and `getStatusBadgeProps` helper function
    - Export `ReleaseStatus` union type: `"not started" | "checking readiness" | "ready for build" | "building"`
    - Export `StoryMapReleaseProps` interface with all props from the design
    - Export `getStatusBadgeProps(status: ReleaseStatus)` returning `{ variant, label }`
    - _Requirements: 1.4_

  - [x] 1.2 Write property test for `getStatusBadgeProps`
    - **Property 2: Status badge mapping is correct for all statuses**
    - Use fast-check to generate random `ReleaseStatus` values and assert correct variant/label mapping
    - **Validates: Requirements 1.4**

- [x] 2. Implement StoryMapRelease component
  - [x] 2.1 Create `src/components/shared/StoryMapRelease.tsx`
    - Import from `@/components/ui/collapsible`, `@/components/ui/dropdown-menu`, `@/components/ui/badge`, `@/components/ui/button`, `@/components/ui/separator`
    - Implement the release header with collapse toggle, title (default "Untitled Release"), status badge, story count, and dropdown menu
    - Implement collapsible content area that renders children
    - Use `data-slot` attributes: `story-map-release`, `release-header`, `release-title`, `release-story-count`, `release-columns`
    - Use semantic color tokens and explicit background colors on text elements
    - Support `className` prop on root element, `defaultOpen` (default true), controlled `open`/`onOpenChange`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 5.1, 6.1, 6.2, 6.3, 6.4, 7.1, 7.2, 7.3, 7.4_

- [x] 3. Checkpoint
  - Ensure the component builds without errors (`npm run build`), ask the user if questions arise.

- [x] 4. Create Storybook stories
  - [x] 4.1 Create `src/components/shared/StoryMapRelease.stories.tsx`
    - Create `Default` story with sample title, status, storyCount, and placeholder activity columns
    - Create `NotStarted`, `CheckingReadiness`, `ReadyForBuild`, `Building` stories showing each status variant
    - Create `DefaultTitle` story with no title prop to show "Untitled Release" fallback
    - Create `Collapsed` story with `defaultOpen={false}`
    - Create `WithUserStoryCards` story composing real UserStoryCard components in activity columns
    - Create `Interactive` story with play function testing: menu opens with all 3 actions, collapse toggle hides/shows content, callbacks fire on menu item selection
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 5.1, 6.3, 7.1, 7.2, 7.3_

- [x] 5. Write property-based tests
  - [x] 5.1 Write property test: Header renders all required elements with correct story count
    - **Property 1: Header renders all required elements with correct story count**
    - Use fast-check to generate random title strings, ReleaseStatus values, and non-negative storyCount integers
    - Render StoryMapRelease with generated props, assert title text, badge, story count text, menu button, and collapse toggle are all present
    - **Validates: Requirements 1.1, 1.3**

  - [x] 5.2 Write property test: Collapse toggle round-trip preserves visibility
    - **Property 3: Collapse toggle round-trip preserves visibility**
    - Use fast-check to generate random initial open state (boolean)
    - Render with `defaultOpen`, toggle twice, assert content visibility matches initial state
    - **Validates: Requirements 3.1, 3.2**

  - [x] 5.3 Write property test: Children are rendered in the content area
    - **Property 4: Children are rendered in the content area**
    - Use fast-check to generate random number of children (1-10), render with that many div children with unique test IDs
    - Assert all children are present in the DOM
    - **Validates: Requirements 4.2**

  - [x] 5.4 Write property test: className is forwarded to the root element
    - **Property 5: className is forwarded to the root element**
    - Use fast-check to generate random className strings (alphanumeric)
    - Render with generated className, assert root element contains the class
    - **Validates: Requirements 6.1**

- [x] 6. Final checkpoint
  - Ensure all tests pass and stories render correctly. Run `npm run build` and `npm run lint`. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- All imports use Propeller's `@/components/ui/*` shadcn wrappers, never raw Radix packages
- Property tests use fast-check with Vitest (minimum 100 iterations)
- Storybook interaction tests cover specific examples, edge cases, and accessibility
