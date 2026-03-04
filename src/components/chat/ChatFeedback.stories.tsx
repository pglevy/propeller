import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect, fn } from 'storybook/test'
import { ChatFeedback } from './ChatFeedback'

const meta = {
  title: 'Chat/ChatFeedback',
  component: ChatFeedback,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A feedback component for collecting thumbs up/down reactions with optional detailed feedback. Use the **default** variant for general feedback, or **agent-evaluation** for AI response evaluation with color-coded indicators.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onFeedbackSubmit: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'agent-evaluation'],
      description: 'Visual style variant. Use "default" for general feedback, "agent-evaluation" for clear distinction between positive and negative feedback (such as for evaluating AI agent responses).',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    showDetailsOption: {
      control: 'boolean',
      description: 'Show "Add details" link after feedback is given',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    onFeedbackSubmit: {
      description: 'Callback when feedback is submitted (with optional details)',
    },
  },
} satisfies Meta<typeof ChatFeedback>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default variant with blue icon on selection. Recommended for most use cases.',
      },
    },
  },
}

export const AgentEvaluationVariant: Story = {
  args: {
    variant: "agent-evaluation",
  },
  parameters: {
    docs: {
      description: {
        story: 'Agent evaluation variant: Color-coded feedback with backgrounds. Use for AI response evaluation where visual distinction is important.',
      },
    },
  },
}

/**
 * This story shows the "Add details" action link that appears after feedback is given.
 */
export const WithAddDetailsLink: Story = {
  parameters: {
    docs: {
      description: {
        story: 'After providing feedback, users can optionally add detailed comments via the "Add details" link.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const thumbsUpButton = canvas.getByLabelText('Helpful')

    // Click thumbs up
    await userEvent.click(thumbsUpButton)

    // Verify the "Add details" link appears
    const addDetailsButton = canvas.getByText('Add details')
    await expect(addDetailsButton).toBeInTheDocument()
  },
}
