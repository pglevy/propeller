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
      <div className="flex-1 min-h-24 border-r p-2 bg-muted/20">
        <p className="text-xs text-muted-foreground bg-muted/20">Design</p>
      </div>
      <div className="flex-1 min-h-24 border-r p-2 bg-muted/20">
        <p className="text-xs text-muted-foreground bg-muted/20">Develop</p>
      </div>
      <div className="flex-1 min-h-24 p-2 bg-muted/20">
        <p className="text-xs text-muted-foreground bg-muted/20">Test</p>
      </div>
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
      <div className="flex-1 border-r p-2 space-y-2 bg-muted/20">
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
      <div className="flex-1 border-r p-2 space-y-2 bg-muted/20">
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
      <div className="flex-1 p-2 space-y-2 bg-muted/20">
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

    // Verify the menu opens and shows all 3 actions
    const menuButton = canvas.getByRole("button", { name: /release actions/i })
    await userEvent.click(menuButton)

    const checkReadiness = await canvas.findByRole("menuitem", { name: /check readiness/i })
    const edit = canvas.getByRole("menuitem", { name: /edit/i })
    const deleteItem = canvas.getByRole("menuitem", { name: /delete/i })

    await expect(checkReadiness).toBeInTheDocument()
    await expect(edit).toBeInTheDocument()
    await expect(deleteItem).toBeInTheDocument()

    // Test callback fires on menu item selection
    await userEvent.click(checkReadiness)
    await expect(args.onCheckReadiness).toHaveBeenCalled()

    // Re-open menu and test Edit
    await userEvent.click(menuButton)
    const editAgain = await canvas.findByRole("menuitem", { name: /edit/i })
    await userEvent.click(editAgain)
    await expect(args.onEdit).toHaveBeenCalled()

    // Re-open menu and test Delete
    await userEvent.click(menuButton)
    const deleteAgain = await canvas.findByRole("menuitem", { name: /delete/i })
    await userEvent.click(deleteAgain)
    await expect(args.onDelete).toHaveBeenCalled()

    // Test collapse toggle hides content
    const collapseButton = canvas.getByRole("button", { name: /collapse release/i })
    await userEvent.click(collapseButton)

    // Content should be hidden — the columns container should not be visible
    const columns = canvasElement.querySelector('[data-slot="release-columns"]')
    await expect(columns).not.toBeVisible()

    // Toggle again to expand
    const expandButton = canvas.getByRole("button", { name: /expand release/i })
    await userEvent.click(expandButton)

    const columnsAgain = canvasElement.querySelector('[data-slot="release-columns"]')
    await expect(columnsAgain).toBeVisible()
  },
}
