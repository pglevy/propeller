import type { Meta, StoryObj } from '@storybook/react'
import { FileCard } from '@/components/chat'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Examples/FileCard Demo',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Example showing FileCard in a chat input context with file management
 */
function ChatInputExampleComponent() {
  const [files, setFiles] = useState([
    { id: 1, name: 'requirements.pdf', size: 1024 * 250 },
    { id: 2, name: 'design-mockup.png', size: 1024 * 1024 * 2.1 },
    { id: 3, name: 'implementation.tsx', size: 1024 * 45 },
  ])

  const handleRemove = (id: number) => {
    setFiles(files.filter(f => f.id !== id))
  }

  const handleAddFile = () => {
    const newFile = {
      id: Date.now(),
      name: `new-file-${files.length + 1}.pdf`,
      size: Math.floor(Math.random() * 1024 * 1024 * 5),
    }
    setFiles([...files, newFile])
  }

  return (
    <div className="max-w-2xl space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Attached Files</h3>
        {files.length === 0 ? (
          <p className="text-sm text-muted-foreground">No files attached</p>
        ) : (
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
        )}
      </div>
      <Button onClick={handleAddFile} variant="outline" size="sm">
        Add Sample File
      </Button>
    </div>
  )
}

export const ChatInputExample: Story = {
  render: () => <ChatInputExampleComponent />,
}

/**
 * Example showing FileCard in a chat message context (read-only)
 */
export const ChatMessageExample: Story = {
  render: () => {
    return (
      <div className="max-w-md space-y-4">
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
              <span className="text-xs font-medium">AI</span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm">
                I've analyzed the files you provided. Here's what I found:
              </p>
              <div className="space-y-2">
                <FileCard
                  fileName="requirements.pdf"
                  fileSize={1024 * 250}
                  showRemove={false}
                />
                <FileCard
                  fileName="design-mockup.png"
                  fileSize={1024 * 1024 * 2.1}
                  showRemove={false}
                />
                <FileCard
                  fileName="implementation.tsx"
                  fileSize={1024 * 45}
                  showRemove={false}
                />
              </div>
              <p className="text-sm">
                All files look good and follow the project conventions.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Example showing different file types
 */
export const FileTypesExample: Story = {
  render: () => {
    const fileTypes = [
      { name: 'document.pdf', size: 1024 * 250, label: 'PDF Document' },
      { name: 'photo.jpg', size: 1024 * 512, label: 'Image File' },
      { name: 'component.tsx', size: 1024 * 45, label: 'Code File' },
      { name: 'data.csv', size: 1024 * 180, label: 'Generic File' },
      { name: 'config.json', size: 342, label: 'Small File' },
      { name: 'video.mp4', size: 1024 * 1024 * 25.7, label: 'Large File' },
    ]

    return (
      <div className="max-w-2xl space-y-4">
        <h3 className="text-sm font-medium">Different File Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fileTypes.map((file, index) => (
            <div key={index} className="space-y-1">
              <p className="text-xs text-muted-foreground">{file.label}</p>
              <FileCard
                fileName={file.name}
                fileSize={file.size}
                showRemove={false}
              />
            </div>
          ))}
        </div>
      </div>
    )
  },
}
