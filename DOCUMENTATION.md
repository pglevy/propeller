# Documentation Overview

This document provides an overview of all contributor documentation for the Propeller project.

## Documentation Structure

### For All Contributors

1. **[README.md](./README.md)** - Project overview and getting started
   - What Propeller is and why it exists
   - Tech stack overview
   - Quick start guide
   - Component categories
   - Design principles
   - Links to other docs

2. **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Comprehensive contribution guide
   - Development workflow (build → lint → test → Storybook)
   - Component development templates
   - Design conventions (accessibility-first DOM patterns)
   - Accessibility requirements (WCAG 2.1 AA)
   - Testing standards and coverage goals
   - Pull request process
   - Code review guidelines

3. **[COMPONENT_CHECKLIST.md](./COMPONENT_CHECKLIST.md)** - Step-by-step checklist
   - Planning phase checklist
   - Implementation checklist
   - Testing checklist
   - Documentation checklist
   - Pre-PR checklist
   - Common pitfalls to avoid
   - Quick reference commands

4. **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** - Community standards
   - Expected behavior
   - Unacceptable behavior
   - Enforcement

### For AI Agents

5. **[AGENTS.md](./AGENTS.md)** - Technical patterns for AI agents
   - Detailed architecture patterns
   - Accessibility-first DOM patterns
   - Component API design
   - Storybook guidelines
   - Code quality standards

### For Deployment

6. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment instructions
   - (Existing file - not modified)

## GitHub Templates

### Pull Request Template
- **Location**: `.github/pull_request_template.md`
- **Purpose**: Standardize PR descriptions
- **Includes**: Description, type of change, checklist, screenshots, related issues

### Issue Templates

1. **Bug Report** (`.github/ISSUE_TEMPLATE/bug_report.md`)
   - Description, steps to reproduce, expected vs actual behavior
   - Environment details
   - Screenshots

2. **Feature Request** (`.github/ISSUE_TEMPLATE/feature_request.md`)
   - Component/feature name and description
   - Use case and proposed API
   - Design considerations
   - Alternatives considered

## Documentation Hierarchy

```
Quick Start → README.md
    ↓
Contributing → CONTRIBUTING.md
    ↓
Component Development → COMPONENT_CHECKLIST.md
    ↓
Technical Details → AGENTS.md
```

## Key Concepts for Contributors

### 1. Accessibility-First Approach

All components must:
- Use semantic HTML and ARIA roles
- Have explicit background colors on text elements
- Maintain flat DOM hierarchies
- Provide accessible names for interactive elements
- Meet WCAG 2.1 AA standards (4.5:1 contrast minimum)

### 2. Development Workflow

**Always in this order**:
1. Write component
2. Write stories
3. Run `npm run build` (catches errors early)
4. Run `npm run lint`
5. Test in Storybook
6. Check accessibility panel
7. Verify coverage

### 3. Design System

- Use semantic color tokens (not arbitrary colors)
- Build composable primitives (not monolithic components)
- Use `class-variance-authority` for variants
- Support `className` for style overrides
- Use `data-slot` for component parts

### 4. Testing Standards

Coverage goals:
- Statements: 100%
- Functions: 100%
- Lines: 100%
- Branches: 85%+ (100% ideal)

### 5. Storybook as Documentation

Every component needs:
- Default story (minimum viable example)
- Variant stories (all configurations)
- Interactive stories (user interactions)
- Accessibility verification

## For Maintainers

### Onboarding New Contributors

1. Point them to **README.md** first
2. Have them read **CONTRIBUTING.md** thoroughly
3. Suggest they use **COMPONENT_CHECKLIST.md** for their first PR
4. Review **AGENTS.md** if they're using AI tools

### Code Review Focus

- Accessibility compliance (zero critical violations)
- Proper use of semantic color tokens
- Flat DOM structure with explicit backgrounds
- Test coverage meets goals
- Stories demonstrate all variants
- Follows existing patterns

### Issue Triage

- Use issue templates to ensure complete information
- Label appropriately (bug, enhancement, documentation)
- Link to relevant documentation sections
- Provide constructive guidance

## Updating Documentation

When making significant changes to the project:

1. **Update README.md** if:
   - Adding new component categories
   - Changing tech stack
   - Modifying design principles

2. **Update CONTRIBUTING.md** if:
   - Changing development workflow
   - Adding new conventions
   - Modifying testing standards

3. **Update AGENTS.md** if:
   - Introducing new technical patterns
   - Changing component architecture
   - Adding new tools or libraries

4. **Update COMPONENT_CHECKLIST.md** if:
   - Adding new required steps
   - Changing testing requirements
   - Modifying quality standards

## Questions?

- Open an issue for documentation improvements
- Suggest changes via pull request
- Ask maintainers for clarification

---

**Last Updated**: January 2026
