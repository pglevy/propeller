import type { Meta, StoryObj } from "@storybook/react"
import { within, userEvent, expect, fn } from "storybook/test"
import { StoryMapRelease } from "./StoryMapRelease"
import { UserStoryCard } from "./UserStoryCard"

const meta = {
  title: "Composer/StoryMapRelease",
  component: StoryMapRelease,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StoryMapRelease>

export default meta
type Story = StoryObj<typeof meta>

function PlaceholderColumns() {
  return (
    <>
      <div className="flex-1 min-h-48 rounded-md p-4 bg-muted/20" />
      <div className="flex-1 min-h-48 rounded-md p-4 bg-muted/20" />
      <div className="flex-1 min-h-48 rounded-md p-4 bg-muted/20" />
    </>
  )
}

export const Default: Story = {
  args: {
    title: "Sprint 1",
    status: "ready for build",
    storyCount: 5,
  },
  render: (args) => (
    <StoryMapRelease {...args}>
      <PlaceholderColumns />
    </StoryMapRelease>
  ),
}

export const NotStarted: Story = {
  args: {
    title: "Sprint 2",
    status: "not started",
    storyCount: 3,
  },
  render: (args) => (
    <StoryMapRelease {...args}>
      <PlaceholderColumns />
    </StoryMapRelease>
  ),
}

export const CheckingReadiness: Story = {
  args: {
    title: "Sprint 3",
    status: "checking readiness",
    storyCount: 8,
  },
  render: (args) => (
    <StoryMapRelease {...args}>
      <PlaceholderColumns />
    </StoryMapRelease>
  ),
}

export const ReadyForBuild: Story = {
  args: {
    title: "Sprint 4",
    status: "ready for build",
    storyCount: 12,
  },
  render: (args) => (
    <StoryMapRelease {...args}>
      <PlaceholderColumns />
    </StoryMapRelease>
  ),
}

export const Building: Story = {
  args: {
    title: "Sprint 5",
    status: "building",
    storyCount: 6,
  },
  render: (args) => (
    <StoryMapRelease {...args}>
      <PlaceholderColumns />
    </StoryMapRelease>
  ),
}

export const DefaultTitle: Story = {
  args: {
    status: "not started",
    storyCount: 0,
  },
  render: (args) => (
    <StoryMapRelease {...args}>
      <PlaceholderColumns />
    </StoryMapRelease>
  ),
}

export const Collapsed: Story = {
  args: {
    title: "Sprint 1",
    status: "ready for build",
    storyCount: 5,
    defaultOpen: false,
  },
  render: (args) => (
    <StoryMapRelease {...args}>
      <PlaceholderColumns />
    </StoryMapRelease>
  ),
}

export const WithUserStoryCards: Story = {
  args: {
    title: "Sprint 1",
    status: "ready for build",
    storyCount: 3,
  },
  render: (args) => (
    <StoryMapRelease {...args}>
      <div className="flex-1 min-h-80 rounded-md p-4 space-y-2 bg-muted/20">
        <UserStoryCard
          storyId="STS-101"
          title="Link a Bank Account"
          status="In Progress"
          completedTasks={2}
          totalTasks={4}
          assignee={{ initials: "LT" }}
          category="Onboarding"
        />
      </div>
      <div className="flex-1 min-h-80 rounded-md p-4 space-y-2 bg-muted/20">
        <UserStoryCard
          storyId="STS-102"
          title="Setup Authentication"
          status="Not Started"
          completedTasks={0}
          totalTasks={3}
          assignee={{ initials: "JD" }}
          category="Security"
        />
      </div>
      <div className="flex-1 min-h-80 rounded-md p-4 space-y-2 bg-muted/20">
        <UserStoryCard
          storyId="STS-103"
          title="Write Integration Tests"
          status="Complete"
          completedTasks={5}
          totalTasks={5}
          assignee={{ initials: "SK" }}
          category="Testing"
        />
      </div>
    </StoryMapRelease>
  ),
}

export const Interactive: Story = {
  args: {
    title: "Sprint 1",
    status: "ready for build",
    storyCount: 5,
    onCheckReadiness: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
  render: (args) => (
    <StoryMapRelease {...args}>
      <PlaceholderColumns />
    </StoryMapRelease>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // Test collapse toggle first (before any menu interactions that may leave aria-hidden)
    const collapseButton = canvas.getByRole("button", { name: /collapse release/i })
    await userEvent.click(collapseButton)

    // When collapsed, Radix removes content from DOM
    await expect(canvasElement.querySelector('[data-slot="release-columns"]')).toBeNull()

    const expandButton = canvas.getByRole("button", { name: /expand release/i })
    await userEvent.click(expandButton)

    await expect(canvasElement.querySelector('[data-slot="release-columns"]')).not.toBeNull()

    // Now test the dropdown menu
    const menuButton = canvas.getByRole("button", { name: /release actions/i })
    await userEvent.click(menuButton)

    // Menu items render in a Radix portal outside canvasElement
    const portalScope = within(document.body)
    const checkReadiness = await portalScope.findByRole("menuitem", { name: /check readiness/i })
    await expect(portalScope.getByRole("menuitem", { name: /^edit$/i })).toBeInTheDocument()
    await expect(portalScope.getByRole("menuitem", { name: /delete/i })).toBeInTheDocument()

    // Click Check Readiness
    await userEvent.click(checkReadiness)
    await expect(args.onCheckReadiness).toHaveBeenCalled()

    // Re-open menu and test Edit — use pointer click to dismiss aria-hidden state
    await userEvent.click(menuButton, { skipHover: true })
    const editItem = await portalScope.findByRole("menuitem", { name: /^edit$/i })
    await userEvent.click(editItem)
    await expect(args.onEdit).toHaveBeenCalled()

    // Re-open menu and test Delete
    await userEvent.click(menuButton, { skipHover: true })
    const deleteItem = await portalScope.findByRole("menuitem", { name: /delete/i })
    await userEvent.click(deleteItem)
    await expect(args.onDelete).toHaveBeenCalled()
  },
}
