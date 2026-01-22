import type { Meta, StoryObj } from '@storybook/react'
import { FileCard } from './FileCard'
import { userEvent, within, expect, fn } from 'storybook/test'

const meta = {
  title: 'Chat/FileCard',
  component: FileCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fileName: {
      control: 'text',
      description: 'The name of the file to display',
    },
    fileSize: {
      control: 'number',
      description: 'The size of the file in bytes',
    },
    showRemove: {
      control: 'boolean',
      description: 'Whether to show the remove button',
    },
    onRemove: {
      action: 'removed',
      description: 'Callback when the remove button is clicked',
    },
  },
} satisfies Meta<typeof FileCard>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default file card without remove button (used in chat messages)
 */
export const Default: Story = {
  args: {
    fileName: 'document.pdf',
    fileSize: 1024 * 250, // 250 KB
    showRemove: false,
  },
}

/**
 * File card with remove button (used in chat input)
 */
export const WithRemoveButton: Story = {
  args: {
    fileName: 'presentation.pdf',
    fileSize: 1024 * 1024 * 2.5, // 2.5 MB
    showRemove: true,
  },
}

/**
 * Image file with icon
 */
export const ImageFile: Story = {
  args: {
    fileName: 'screenshot.png',
    fileSize: 1024 * 512, // 512 KB
    showRemove: false,
  },
}

/**
 * Image file with remove button
 */
export const ImageFileWithRemove: Story = {
  args: {
    fileName: 'photo.jpg',
    fileSize: 1024 * 1024 * 3.2, // 3.2 MB
    showRemove: true,
  },
}

/**
 * Code file
 */
export const CodeFile: Story = {
  args: {
    fileName: 'component.tsx',
    fileSize: 1024 * 45, // 45 KB
    showRemove: false,
  },
}

/**
 * Code file with remove button
 */
export const CodeFileWithRemove: Story = {
  args: {
    fileName: 'script.py',
    fileSize: 1024 * 12, // 12 KB
    showRemove: true,
  },
}

/**
 * Generic file type
 */
export const GenericFile: Story = {
  args: {
    fileName: 'data.csv',
    fileSize: 1024 * 1024 * 1.8, // 1.8 MB
    showRemove: false,
  },
}

/**
 * Very long filename that gets truncated
 */
export const LongFileName: Story = {
  args: {
    fileName: 'this-is-a-very-long-filename-that-should-be-truncated-in-the-display.pdf',
    fileSize: 1024 * 500, // 500 KB
    showRemove: true,
    maxWidth: "320px",
  },
}

/**
 * Long filename without remove button
 */
export const LongFileNameReadOnly: Story = {
  args: {
    fileName: 'another-extremely-long-filename-for-testing-truncation-behavior.tsx',
    fileSize: 1024 * 45,
    showRemove: false,
    maxWidth: "280px",
  },
}

/**
 * Small file size
 */
export const SmallFile: Story = {
  args: {
    fileName: 'config.json',
    fileSize: 342, // 342 bytes
    showRemove: false,
  },
}

/**
 * Large file size
 */
export const LargeFile: Story = {
  args: {
    fileName: 'video.mp4',
    fileSize: 1024 * 1024 * 25.7, // 25.7 MB
    showRemove: true,
  },
}

/**
 * Multiple file cards in a list (chat message context)
 */
export const MultipleFilesInMessage: Story = {
  args: {
    fileName: 'requirements.pdf',
    fileSize: 1024 * 250,
  },
  render: () => (
    <div className="space-y-2 w-80">
      <FileCard fileName="requirements.pdf" fileSize={1024 * 250} showRemove={false} />
      <FileCard fileName="design-mockup.png" fileSize={1024 * 1024 * 2.1} showRemove={false} />
      <FileCard fileName="implementation.tsx" fileSize={1024 * 45} showRemove={false} />
    </div>
  ),
}

/**
 * Multiple file cards with remove buttons (chat input context)
 */
export const MultipleFilesInInput: Story = {
  args: {
    fileName: 'document.pdf',
    fileSize: 1024 * 250,
    showRemove: true,
  },
  render: () => (
    <div className="flex flex-wrap gap-2 max-w-md">
      <FileCard fileName="document.pdf" fileSize={1024 * 250} showRemove={true} />
      <FileCard fileName="image.jpg" fileSize={1024 * 512} showRemove={true} />
      <FileCard fileName="code.tsx" fileSize={1024 * 45} showRemove={true} />
    </div>
  ),
}

/**
 * Interactive test - clicking remove button
 */
export const RemoveInteraction: Story = {
  args: {
    fileName: 'test-file.pdf',
    fileSize: 1024 * 100,
    showRemove: true,
    onRemove: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    
    // Find the remove button
    const removeButton = canvas.getByRole('button', { name: /remove file/i })
    
    // Verify button exists
    await expect(removeButton).toBeInTheDocument()
    
    // Click the remove button
    await userEvent.click(removeButton)
    
    // Verify the callback was called
    await expect(args.onRemove).toHaveBeenCalled()
  },
}

/**
 * Accessibility test - proper ARIA labels
 */
export const AccessibilityTest: Story = {
  args: {
    fileName: 'accessible-file.pdf',
    fileSize: 1024 * 200,
    showRemove: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Verify remove button has proper aria-label
    const removeButton = canvas.getByRole('button', { name: /remove file/i })
    await expect(removeButton).toHaveAttribute('aria-label', 'Remove file')
    
    // Verify file name is visible
    const fileName = canvas.getByText('accessible-file.pdf')
    await expect(fileName).toBeInTheDocument()
    
    // Verify file size is visible
    const fileSize = canvas.getByText(/KB/)
    await expect(fileSize).toBeInTheDocument()
  },
}
