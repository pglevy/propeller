import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from 'storybook/test'
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

/**
 * This story simulates a user clicking the thumbs up button.
 * The button should change to a green background when selected.
 */
export const ThumbsUpSelected: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the thumbs up button by its aria-label
    const thumbsUpButton = canvas.getByLabelText('Helpful')

    // Click the thumbs up button
    await userEvent.click(thumbsUpButton)

    // Verify the button has the selected state (green background)
    await expect(thumbsUpButton).toHaveClass('bg-[#E3FBDF]')
  },
}

/**
 * This story simulates a user clicking the thumbs down button.
 * The button should change to a pink background when selected.
 */
export const ThumbsDownSelected: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the thumbs down button by its aria-label
    const thumbsDownButton = canvas.getByLabelText('Not helpful')

    // Click the thumbs down button
    await userEvent.click(thumbsDownButton)

    // Verify the button has the selected state (pink background)
    await expect(thumbsDownButton).toHaveClass('bg-[#FED7DE]')
  },
}

/**
 * This story tests the toggle behavior - clicking again should deselect.
 */
export const ToggleBehavior: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const thumbsUpButton = canvas.getByLabelText('Helpful')

    // Click to select
    await userEvent.click(thumbsUpButton)
    await expect(thumbsUpButton).toHaveClass('bg-[#E3FBDF]')

    // Click again to deselect
    await userEvent.click(thumbsUpButton)
    await expect(thumbsUpButton).not.toHaveClass('bg-[#E3FBDF]')
  },
}

/**
 * This story tests switching between thumbs up and down.
 */
export const SwitchBetweenOptions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const thumbsUpButton = canvas.getByLabelText('Helpful')
    const thumbsDownButton = canvas.getByLabelText('Not helpful')

    // Select thumbs up
    await userEvent.click(thumbsUpButton)
    await expect(thumbsUpButton).toHaveClass('bg-[#E3FBDF]')

    // Switch to thumbs down
    await userEvent.click(thumbsDownButton)
    await expect(thumbsDownButton).toHaveClass('bg-[#FED7DE]')
    await expect(thumbsUpButton).not.toHaveClass('bg-[#E3FBDF]')
  },
}
