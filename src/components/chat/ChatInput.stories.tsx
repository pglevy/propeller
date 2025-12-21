import type { Meta, StoryObj } from '@storybook/react'
import { fn, userEvent, within, expect } from 'storybook/test'
import { ChatInput } from './ChatInput'

const meta = {
  title: 'Chat/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof ChatInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Ask me anything...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

/**
 * This story demonstrates typing and submitting a message
 */
export const TypeAndSubmit: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const textarea = canvas.getByPlaceholderText('Type a message...')
    const sendButton = canvas.getByRole('button')

    // Initially, send button should be disabled
    await expect(sendButton).toBeDisabled()

    // Type a message
    await userEvent.type(textarea, 'Hello, world!')

    // Send button should now be enabled
    await expect(sendButton).toBeEnabled()

    // Click send
    await userEvent.click(sendButton)

    // Verify onSubmit was called with the message
    await expect(args.onSubmit).toHaveBeenCalledWith('Hello, world!')

    // Textarea should be cleared
    await expect(textarea).toHaveValue('')
  },
}

/**
 * This story demonstrates submitting with Enter key
 */
export const SubmitWithEnter: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const textarea = canvas.getByPlaceholderText('Type a message...')

    // Type a message and press Enter
    await userEvent.type(textarea, 'Hello!{Enter}')

    // Verify onSubmit was called
    await expect(args.onSubmit).toHaveBeenCalledWith('Hello!')
  },
}
