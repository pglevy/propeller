import type { Meta, StoryObj } from '@storybook/react'
import { ChatFeedback } from './ChatFeedback'

const meta = {
  title: 'Chat/ChatFeedback',
  component: ChatFeedback,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChatFeedback>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground max-w-md">
        Click the thumbs up or down to provide feedback. Click again to deselect.
      </p>
      <ChatFeedback />
    </div>
  ),
}
