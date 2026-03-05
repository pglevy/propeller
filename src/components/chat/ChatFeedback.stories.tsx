import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect, fn, waitFor } from 'storybook/test'
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
    feedbackOptions: {
      positive: [
        { id: "accurate", label: "Accurate information" },
        { id: "helpful", label: "Helpful response" },
        { id: "clear", label: "Clear and concise" },
        { id: "complete", label: "Complete answer" },
        { id: "other", label: "Other" },
      ],
      negative: [
        { id: "incorrect", label: "Incorrect information" },
        { id: "incomplete", label: "Incomplete answer" },
        { id: "unclear", label: "Unclear or confusing" },
        { id: "irrelevant", label: "Not relevant to my question" },
        { id: "other", label: "Other" },
      ],
    },
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
    showDetailsDialog: {
      control: 'boolean',
      description: 'Enable to collect more detailed feedback. Disable for quick, low-friction feedback (e.g., rating individual chat messages).',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showCheckboxOptions: {
      control: 'boolean',
      description: 'Requires feedbackOptions to be provided. Enable to show predefined checkbox options. Disable when categorization isn\'t necessary, like when collecting open-ended user research feedback.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    feedbackOptions: {
      control: 'object',
      description: 'Predefined checkbox options to help users provide feedback more easily. Includes options for positive and negative feedback.',
    },
    dialogConfig: {
      control: 'object',
      description: 'Custom dialog configuration (title, description, placeholder, submitText, cancelText)',
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
        story: 'The default variant with blue icon on selection. Opens a dialog with checkbox options and comment field.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)

    // Click thumbs up to open dialog
    const thumbsUpButton = canvas.getByLabelText('Helpful')
    await userEvent.click(thumbsUpButton)

    // Wait for dialog to open (dialog renders in portal at body level)
    await body.findByRole('dialog')

    // Verify dialog title
    const dialogTitle = body.getByText('Feedback')
    await expect(dialogTitle).toBeInTheDocument()

    // Verify positive checkbox options appear
    const accurateCheckbox = body.getByLabelText('Accurate information')
    await expect(accurateCheckbox).toBeInTheDocument()

    // Check a checkbox
    await userEvent.click(accurateCheckbox)
    await expect(accurateCheckbox).toBeChecked()

    // Type in the comment field
    const commentField = body.getByPlaceholderText('Enter your feedback...')
    await userEvent.type(commentField, 'Great response!')

    // Submit the feedback
    const submitButton = body.getByRole('button', { name: 'Submit' })
    await userEvent.click(submitButton)

    // Wait for dialog to be removed (animation takes time)
    await waitFor(() => {
      expect(body.queryByRole('dialog')).not.toBeInTheDocument()
    })
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)

    // Click thumbs down to test negative feedback
    const thumbsDownButton = canvas.getByLabelText('Not helpful')
    await userEvent.click(thumbsDownButton)

    // Wait for dialog (renders in portal at body level)
    const dialog = await body.findByRole('dialog')

    // Verify negative checkbox options appear
    const incorrectCheckbox = body.getByLabelText('Incorrect information')
    await expect(incorrectCheckbox).toBeInTheDocument()

    // Check "Other" to make comment required
    const otherCheckbox = body.getByLabelText('Other')
    await userEvent.click(otherCheckbox)
    await expect(otherCheckbox).toBeChecked()

    // Verify required indicator appears by checking the label text
    const commentLabel = within(dialog).getByText(/Additional comments/)
    await expect(commentLabel).toBeInTheDocument()
    // Verify it contains the required indicator
    await expect(commentLabel.textContent).toContain('*')

    // Try to submit without comment (should not close)
    const submitButton = body.getByRole('button', { name: 'Submit' })
    await userEvent.click(submitButton)

    // Dialog should still be open because comment is required
    await expect(body.getByRole('dialog')).toBeInTheDocument()

    // Now add a comment
    const commentField = body.getByPlaceholderText('Enter your feedback...')
    await userEvent.type(commentField, 'The information was outdated')

    // Submit again
    await userEvent.click(submitButton)

    // Wait for dialog to be removed (animation takes time)
    await waitFor(() => {
      expect(body.queryByRole('dialog')).not.toBeInTheDocument()
    })
  },
}

/**
 * This story demonstrates the full dialog experience with all customization options.
 */
export const DialogWithCustomization: Story = {
  args: {
    variant: "agent-evaluation",
    showDetailsDialog: true,
    showCheckboxOptions: true,
    dialogConfig: {
      title: "Provide feedback",
      description: "Help us improve",
      placeholder: "Please provide additional details...",
      submitText: "Submit",
      cancelText: "Cancel",
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the full dialog experience: agent-evaluation variant, checkbox options for categorizing feedback (different options for thumbs up vs down), and custom dialog text. Selecting "Other" makes the comment field required.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)

    // Click thumbs up
    const thumbsUpButton = canvas.getByLabelText('Helpful')
    await userEvent.click(thumbsUpButton)

    // Wait for dialog (renders in portal at body level)
    await body.findByRole('dialog')

    // Verify custom title
    const customTitle = body.getByText('Provide feedback')
    await expect(customTitle).toBeInTheDocument()

    // Verify custom description
    const customDescription = body.getByText('Help us improve')
    await expect(customDescription).toBeInTheDocument()

    // Check multiple checkboxes
    const helpfulCheckbox = body.getByLabelText('Helpful response')
    await userEvent.click(helpfulCheckbox)
    await expect(helpfulCheckbox).toBeChecked()

    const clearCheckbox = body.getByLabelText('Clear and concise')
    await userEvent.click(clearCheckbox)
    await expect(clearCheckbox).toBeChecked()

    // Add comment with custom placeholder
    const commentField = body.getByPlaceholderText('Please provide additional details...')
    await userEvent.type(commentField, 'Excellent explanation')

    // Click custom submit button
    const submitButton = body.getByRole('button', { name: 'Submit' })
    await userEvent.click(submitButton)

    // Wait for dialog to be removed (animation takes time)
    await waitFor(() => {
      expect(body.queryByRole('dialog')).not.toBeInTheDocument()
    })
  },
}
