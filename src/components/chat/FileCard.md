# FileCard

A component for displaying file information in chat interfaces. Shows file name, size, type icon, and an optional remove button.

## Features

- **Automatic file type detection** - Shows appropriate icons for images, PDFs, code files, and generic files
- **Human-readable file sizes** - Automatically formats bytes into KB/MB
- **Two variants** - With or without remove button for different contexts
- **Accessible** - Proper ARIA labels and keyboard navigation
- **Responsive** - Truncates long filenames gracefully

## Usage

### In Chat Messages (Read-only)

```tsx
import { FileCard } from '@/components/chat'

function ChatMessage() {
  return (
    <div className="space-y-2">
      <FileCard
        fileName="document.pdf"
        fileSize={256000} // 256 KB in bytes
        showRemove={false}
      />
    </div>
  )
}
```

### In Chat Input (With Remove Button)

```tsx
import { FileCard } from '@/components/chat'
import { useState } from 'react'

function ChatInput() {
  const [files, setFiles] = useState([
    { id: 1, name: 'document.pdf', size: 256000 }
  ])

  const handleRemove = (id: number) => {
    setFiles(files.filter(f => f.id !== id))
  }

  return (
    <div className="flex flex-wrap gap-2">
      {files.map(file => (
        <FileCard
          key={file.id}
          fileName={file.name}
          fileSize={file.size}
          showRemove={true}
          onRemove={() => handleRemove(file.id)}
        />
      ))}
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fileName` | `string` | Required | The name of the file to display |
| `fileSize` | `number` | Required | The size of the file in bytes |
| `showRemove` | `boolean` | `false` | Whether to show the remove button |
| `onRemove` | `() => void` | - | Callback when the remove button is clicked |
| `fileType` | `string` | - | Optional file type override (if not provided, will be inferred from fileName) |
| `className` | `string` | - | Additional CSS classes |

## File Type Icons

The component automatically detects file types and shows appropriate icons:

- **Images** (jpg, jpeg, png, gif, svg, webp) - Blue image icon
- **PDFs** - Red document icon
- **Code files** (js, ts, jsx, tsx, py, java, etc.) - Purple code icon
- **Other files** - Gray generic file icon

## File Size Formatting

File sizes are automatically formatted:
- Less than 1 KB: Shows in bytes (e.g., "342 B")
- Less than 1 MB: Shows in KB (e.g., "250.0 KB")
- 1 MB or more: Shows in MB (e.g., "2.5 MB")

## Accessibility

- Remove button has proper `aria-label="Remove file"`
- File information is properly structured for screen readers
- Keyboard navigation supported for interactive elements

## Design Considerations

- Uses `border-blue-200` to match chat interface styling
- Truncates long filenames with ellipsis
- Minimum width of 250px when `showRemove={true}` for consistent sizing
- Flexible width when `showRemove={false}` to fit content

## Examples

See the Storybook stories for interactive examples:
- Basic usage with different file types
- Multiple files in chat messages
- Multiple files in chat input with remove functionality
- Long filename truncation
- Various file sizes
