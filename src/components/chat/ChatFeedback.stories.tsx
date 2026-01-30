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

export const DefaultVariant: Story = {
  args: {
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story: 'Default variant: Clean, subtle feedback with blue icon when selected. Use for general content feedback.',
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

export const VariantComparison: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of both variants to help you choose the right one for your use case.',
      },
    },
  },
  render: () => (
    <div className="space-y-6 bg-background p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Default Variant</h3>
        <p className="text-xs text-muted-foreground bg-background">Blue icon when selected, no background</p>
        <ChatFeedback variant="default" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Agent Evaluation Variant</h3>
        <p className="text-xs text-muted-foreground bg-background">Thumbs up = green, thumbs down = red</p>
        <ChatFeedback variant="agent-evaluation" />
      </div>
    </div>
  ),
}

/**
 * This story simulates a user clicking the thumbs up button in default variant.
 * The button should show a blue icon with no background.
 */
export const DefaultThumbsUpSelected: Story = {
  args: {
    variant: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const thumbsUpButton = canvas.getByLabelText('Helpful')
    await userEvent.click(thumbsUpButton)

    // Check for the arbitrary variant class we're using
    await expect(thumbsUpButton).toHaveClass('[&]:text-primary')
  },
}

/**
 * This story simulates a user clicking the thumbs up button in agent evaluation variant.
 * The button should change to a green background when selected.
 */
export const AgentEvaluationThumbsUpSelected: Story = {
  args: {
    variant: "agent-evaluation",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const thumbsUpButton = canvas.getByLabelText('Helpful')
    await userEvent.click(thumbsUpButton)

    await expect(thumbsUpButton).toHaveClass('bg-positive')
  },
}

/**
 * This story simulates a user clicking the thumbs down button in default variant.
 * The button should show a blue icon with no background.
 */
export const DefaultThumbsDownSelected: Story = {
  args: {
    variant: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const thumbsDownButton = canvas.getByLabelText('Not helpful')
    await userEvent.click(thumbsDownButton)

    // Check for the arbitrary variant class we're using
    await expect(thumbsDownButton).toHaveClass('[&]:text-primary')
  },
}

/**
 * This story simulates a user clicking the thumbs down button in agent evaluation variant.
 * The button should change to a red background when selected.
 */
export const AgentEvaluationThumbsDownSelected: Story = {
  args: {
    variant: "agent-evaluation",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const thumbsDownButton = canvas.getByLabelText('Not helpful')
    await userEvent.click(thumbsDownButton)

    await expect(thumbsDownButton).toHaveClass('bg-negative')
  },
}

/**
 * This story tests the toggle behavior - clicking again should deselect.
 */
export const ToggleBehavior: Story = {
  args: {
    variant: "agent-evaluation",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const thumbsUpButton = canvas.getByLabelText('Helpful')

    // Click to select
    await userEvent.click(thumbsUpButton)
    await expect(thumbsUpButton).toHaveClass('bg-positive')

    // Click again to deselect
    await userEvent.click(thumbsUpButton)
    await expect(thumbsUpButton).not.toHaveClass('bg-positive')
  },
}

/**
 * This story tests switching between thumbs up and down.
 */
export const SwitchBetweenOptions: Story = {
  args: {
    variant: "agent-evaluation",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const thumbsUpButton = canvas.getByLabelText('Helpful')
    const thumbsDownButton = canvas.getByLabelText('Not helpful')

    // Select thumbs up
    await userEvent.click(thumbsUpButton)
    await expect(thumbsUpButton).toHaveClass('bg-positive')

    // Switch to thumbs down
    await userEvent.click(thumbsDownButton)
    await expect(thumbsDownButton).toHaveClass('bg-negative')
    await expect(thumbsUpButton).not.toHaveClass('bg-positive')
  },
}

/**
 * This story shows the "Add details" action link that appears after feedback is given.
 */
export const WithAddDetailsLink: Story = {
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

/**
 * This story demonstrates the feedback dialog that opens when "Add details" is clicked.
 */
export const WithFeedbackDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const thumbsUpButton = canvas.getByLabelText('Helpful')

    // Click thumbs up
    await userEvent.click(thumbsUpButton)

    // Click "Add details"
    const addDetailsButton = canvas.getByText('Add details')
    await userEvent.click(addDetailsButton)

    // Verify the dialog opens with correct title (dialog is in a portal, so search in document)
    const dialog = await within(document.body).findByRole('dialog')
    await expect(dialog).toBeInTheDocument()

    const dialogTitle = within(dialog).getByText('Feedback')
    await expect(dialogTitle).toBeInTheDocument()

    // Verify the question text
    const questionText = within(dialog).getByText('What was good about this response?')
    await expect(questionText).toBeInTheDocument()
  },
}

/**
 * This story shows that the details option can be disabled.
 */
export const WithDetailsDisabled: Story = {
  args: {
    showDetailsOption: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const thumbsUpButton = canvas.getByLabelText('Helpful')

    // Click thumbs up
    await userEvent.click(thumbsUpButton)

    // Verify the "Add details" link does NOT appear
    const addDetailsButton = canvas.queryByText('Add details')
    await expect(addDetailsButton).not.toBeInTheDocument()
  },
}
