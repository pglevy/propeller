import type { Meta, StoryObj } from "@storybook/react"
import { within, userEvent, expect } from "storybook/test"
import { UserStoryCard } from "./UserStoryCard"

const meta = {
  title: "Composer/UserStoryCard",
  component: UserStoryCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserStoryCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    storyId: "STS-2211",
    title: "Link a Bank Account",
    status: "Not Started",
    completedTasks: 0,
    totalTasks: 4,
    assignee: {
      initials: "LT",
    },
    category: "Onboarding & Setup"
  },
}

export const InProgress: Story = {
  args: {
    storyId: "STS-2212",
    title: "Implement user authentication",
    status: "In progress",
    completedTasks: 3,
    totalTasks: 5,
    assignee: {
      initials: "JD",
    },
    category: "Security",
  },
}

export const Complete: Story = {
  args: {
    storyId: "STS-2210",
    title: "Setup project repository",
    status: "Complete",
    completedTasks: 4,
    totalTasks: 4,
    assignee: {
      initials: "SK",
    },
    category: "Infrastructure",
  },
}

export const NoAssignee: Story = {
  args: {
    storyId: "STS-2213",
    title: "Design system documentation",
    status: "Not started",
    completedTasks: 0,
    totalTasks: 3,
    category: "Documentation",
  },
}

export const NoCategory: Story = {
  args: {
    storyId: "STS-2214",
    title: "Fix navigation bug",
    status: "In review",
    completedTasks: 2,
    totalTasks: 2,
    assignee: {
      initials: "AM",
    },
  },
}

export const Interactive: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const menuButton = canvas.getByRole("button", { name: /story options/i })
    await userEvent.click(menuButton)
    await expect(menuButton).toBeInTheDocument()
  },
}
