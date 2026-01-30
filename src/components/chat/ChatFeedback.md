# ChatFeedback

A feedback component that allows users to provide thumbs up/down reactions with optional detailed feedback.

## Usage

```tsx
import { ChatFeedback } from '@/components/chat/ChatFeedback'

function MyComponent() {
  const handleFeedback = (feedback: "up" | "down", details?: string) => {
    console.log('Feedback:', feedback, details)
  }

  return <ChatFeedback onFeedbackSubmit={handleFeedback} />
}
```

## Variants

### Default (Recommended)

Use the **default** variant for most feedback scenarios. It provides a clean, subtle interaction with a blue icon when selected.

```tsx
<ChatFeedback variant="default" onFeedbackSubmit={handleFeedback} />
```

**When to use:**
- General user feedback on content or responses
- Chat message feedback
- Documentation or help article ratings
- Any scenario where you want minimal visual emphasis

**Behavior:**
- Unselected: Gray icon
- Hover: Light gray background
- Selected: Blue icon, no background

### Agent Evaluation

Use the **agent-evaluation** variant when you need clear visual distinction between positive and negative feedback, typically for evaluating AI agent responses.

```tsx
<ChatFeedback variant="agent-evaluation" onFeedbackSubmit={handleFeedback} />
```

**When to use:**
- Evaluating AI agent or assistant responses
- Quality assessment workflows
- Scenarios where color-coded feedback is important
- When you need strong visual feedback indicators

**Behavior:**
- Unselected: Gray icon
- Hover: Light gray background
- Thumbs up selected: Green background with green icon
- Thumbs down selected: Red background with red icon

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "agent-evaluation"` | `"default"` | Visual style variant |
| `showDetailsOption` | `boolean` | `true` | Show "Add details" link after feedback |
| `onFeedbackSubmit` | `(feedback: "up" \| "down", details?: string) => void` | - | Callback when feedback is submitted |

## Features

- **Toggle behavior**: Click again to deselect
- **Mutually exclusive**: Selecting one automatically deselects the other
- **Optional details**: Users can add text feedback via a dialog
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Theme-aware**: Adapts to light/dark mode

## Examples

### Basic Usage

```tsx
<ChatFeedback />
```

### Without Details Option

```tsx
<ChatFeedback showDetailsOption={false} />
```

### With Callback

```tsx
<ChatFeedback 
  variant="agent-evaluation"
  onFeedbackSubmit={(feedback, details) => {
    // Send to analytics or API
    trackFeedback({ type: feedback, comment: details })
  }}
/>
```

## Accessibility

- Uses semantic button elements
- Includes `aria-label` for screen readers
- Keyboard navigable
- Focus indicators visible
- Color contrast meets WCAG AA standards
