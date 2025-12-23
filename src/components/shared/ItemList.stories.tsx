import type { Meta, StoryObj } from "@storybook/react"
import { within, userEvent, expect } from "storybook/test"
import { ItemList } from "./ItemList"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Play, MoreVertical, Circle } from "lucide-react"

const meta = {
  title: "Shared/ItemList",
  component: ItemList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ItemList>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic list showcasing different object types from the canonical icon set.
 */
export const Default: Story = {
  args: {
    items: [
      {
        id: "1",
        objectType: "document",
        title: "User Manual",
        subtitle: "Updated 2 hours ago",
      },
      {
        id: "2",
        objectType: "processModel",
        title: "Loan Approval Process",
        subtitle: "v2.1 - Production",
      },
      {
        id: "3",
        objectType: "recordType",
        title: "Applicant Record",
        subtitle: "1,234 records",
      },
    ],
  },
}

/**
 * Brand Reference: All canonical object types with their Aurora color pairings.
 * This story serves as the visual brand definition for object types.
 */
export const IconShowcase: Story = {
  args: {
    size: "sm",
    items: [
      {
        id: "1",
        objectType: "document",
        title: "Document",
        subtitle: "Green: Documents, content (natural, growth)",
      },
      {
        id: "2",
        objectType: "processModel",
        title: "Process Model",
        subtitle: "Purple: Process models, workflows (logic, transformation)",
      },
      {
        id: "3",
        objectType: "recordType",
        title: "Record Type",
        subtitle: "Orange: Record types, data structures (warm, foundational)",
      },
      {
        id: "4",
        objectType: "dataStore",
        title: "Data Store",
        subtitle: "Sky: Data stores, databases (reliable, stable)",
      },
      {
        id: "5",
        objectType: "interface",
        title: "Interface",
        subtitle: "Teal: Interfaces, connections (bridging, communication)",
      },
      {
        id: "6",
        objectType: "rule",
        title: "Rule",
        subtitle: "Blue: Rules, logic (technical, precise)",
      },
      {
        id: "7",
        objectType: "expression",
        title: "Expression",
        subtitle: "Pink: Expressions, calculations (dynamic, computed)",
      },
      {
        id: "8",
        objectType: "constant",
        title: "Constant",
        subtitle: "Gray: Constants, utilities (neutral, unchanging)",
      },
    ],
  },
}

/**
 * Task list matching the reference design (reference/task-items.png).
 * Shows collapsible items with badges, action buttons, and status indicators.
 */
export const TasksList: Story = {
  args: {
    collapsible: true,
    items: [
      {
        id: "1",
        objectType: "recordType",
        title: "Create loan application record type",
        subtitle: (
          <div className="flex items-center gap-2 bg-background">
            <span className="bg-background">Record Type</span>
            <Badge variant="secondary">New</Badge>
          </div>
        ),
        actions: (
          <>
            <Circle className="size-4 text-muted-foreground" />
            <Button variant="outline" size="sm">
              <Play className="size-3 mr-1" />
              Start
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="More options">
              <MoreVertical className="size-4" />
            </Button>
          </>
        ),
        collapsibleContent: (
          <div className="text-sm text-muted-foreground bg-background">
            <p className="bg-background">
              Configure the record type structure including fields, relationships,
              and security settings.
            </p>
          </div>
        ),
        defaultOpen: false,
      },
      {
        id: "2",
        objectType: "document",
        title: "Create document record type",
        subtitle: (
          <div className="flex items-center gap-2 bg-background">
            <span className="bg-background">Record Type</span>
            <Badge variant="secondary">New</Badge>
          </div>
        ),
        actions: (
          <>
            <Circle className="size-4 text-muted-foreground" />
            <Button variant="outline" size="sm">
              <Play className="size-3 mr-1" />
              Start
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="More options">
              <MoreVertical className="size-4" />
            </Button>
          </>
        ),
        collapsibleContent: (
          <div className="text-sm text-muted-foreground bg-background">
            <p className="bg-background">
              Set up document storage and management capabilities.
            </p>
          </div>
        ),
        defaultOpen: false,
      },
    ],
  },
}

/**
 * Tools list matching the reference design (reference/tool-items.png).
 * Simple list with icons, titles, and remove buttons.
 */
export const ToolsList: Story = {
  args: {
    size: "sm",
    items: [
      {
        id: "1",
        objectType: "document",
        title: "Interview Best Practices",
        subtitle: "Document",
        actions: (
          <Button variant="ghost" size="icon-sm" aria-label="Remove tool">
            <X className="size-4" />
          </Button>
        ),
      },
      {
        id: "2",
        objectType: "processModel",
        title: "Update Interview Evaluation",
        subtitle: "Process Model",
        actions: (
          <Button variant="ghost" size="icon-sm" aria-label="Remove tool">
            <X className="size-4" />
          </Button>
        ),
      },
    ],
  },
}

/**
 * Custom icons with Aurora color pairings.
 * Demonstrates the flexibility of using customIcon prop.
 */
export const CustomIcons: Story = {
  args: {
    items: [
      {
        id: "1",
        customIcon: {
          icon: Play,
          bg: "var(--aurora-green-1)",
          fg: "var(--aurora-green-4)",
        },
        title: "Custom Green Play Icon",
        subtitle: "Using customIcon with Aurora green pairing",
      },
      {
        id: "2",
        customIcon: {
          icon: MoreVertical,
          bg: "var(--aurora-red-1)",
          fg: "var(--aurora-red-4)",
        },
        title: "Custom Red Menu Icon",
        subtitle: "Using customIcon with Aurora red pairing",
      },
      {
        id: "3",
        customIcon: {
          icon: X,
          bg: "var(--aurora-yellow-1)",
          fg: "var(--aurora-yellow-4)",
        },
        title: "Custom Yellow Close Icon",
        subtitle: "Using customIcon with Aurora yellow pairing",
      },
    ],
  },
}

/**
 * Collapsible content demonstration.
 * Shows how items can expand to reveal additional information.
 */
export const CollapsibleContent: Story = {
  args: {
    collapsible: true,
    items: [
      {
        id: "1",
        objectType: "document",
        title: "Expandable Document",
        subtitle: "Click the chevron to expand",
        collapsibleContent: (
          <div className="space-y-2 bg-background">
            <p className="text-sm text-muted-foreground bg-background">
              This is the collapsible content area. It can contain any React
              components including text, images, forms, or other complex UI.
            </p>
            <div className="flex gap-2 bg-background">
              <Button size="sm" variant="outline">
                Action 1
              </Button>
              <Button size="sm" variant="outline">
                Action 2
              </Button>
            </div>
          </div>
        ),
        defaultOpen: false,
      },
      {
        id: "2",
        objectType: "processModel",
        title: "Expanded by Default",
        subtitle: "This item starts open",
        collapsibleContent: (
          <div className="text-sm text-muted-foreground bg-background">
            <p className="bg-background">
              Items can be set to open by default using the defaultOpen prop.
            </p>
          </div>
        ),
        defaultOpen: true,
      },
    ],
  },
}

/**
 * Interactive test story.
 * Verifies that collapsible functionality works correctly.
 */
export const Interactive: Story = {
  args: {
    collapsible: true,
    items: [
      {
        id: "test-item",
        objectType: "recordType",
        title: "Click to expand",
        subtitle: "Test item",
        collapsibleContent: (
          <div className="bg-background" data-testid="collapsible-content">
            <p className="text-sm text-muted-foreground bg-background">
              Collapsible content is now visible
            </p>
          </div>
        ),
        defaultOpen: false,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find and click the expand button
    const expandButton = canvas.getByRole("button", { name: /expand item/i })
    await userEvent.click(expandButton)

    // Verify content is visible
    const content = await canvas.findByTestId("collapsible-content")
    await expect(content).toBeVisible()

    // Find and click the collapse button
    const collapseButton = canvas.getByRole("button", { name: /collapse item/i })
    await userEvent.click(collapseButton)

    // Verify content is hidden (note: it may still be in DOM but not visible)
    // We just check that the button changed back to "expand"
    const expandButtonAgain = canvas.getByRole("button", { name: /expand item/i })
    await expect(expandButtonAgain).toBeInTheDocument()
  },
}

/**
 * Outline variant with spacing between items.
 * Individual bordered items with gaps between them.
 */
export const OutlineVariant: Story = {
  args: {
    variant: "outline",
    items: [
      {
        id: "1",
        objectType: "document",
        title: "User Manual",
        subtitle: "Updated 2 hours ago",
      },
      {
        id: "2",
        objectType: "processModel",
        title: "Loan Approval Process",
        subtitle: "v2.1 - Production",
      },
      {
        id: "3",
        objectType: "recordType",
        title: "Applicant Record",
        subtitle: "1,234 records",
      },
    ],
  },
}

/**
 * Mixed content demonstration.
 * Shows various combinations of features working together.
 */
export const MixedContent: Story = {
  args: {
    collapsible: true,
    items: [
      {
        id: "1",
        objectType: "document",
        title: "Document with Badge",
        subtitle: (
          <div className="flex items-center gap-2 bg-background">
            <span className="bg-background">Status:</span>
            <Badge variant="default">Active</Badge>
            <Badge variant="outline">v2.0</Badge>
          </div>
        ),
        actions: (
          <Button size="sm" variant="secondary">
            View
          </Button>
        ),
      },
      {
        id: "2",
        objectType: "processModel",
        title: "Process with Actions",
        subtitle: "Multiple action buttons",
        actions: (
          <div className="flex gap-2 bg-background">
            <Button size="sm" variant="outline">
              Edit
            </Button>
            <Button size="sm" variant="outline">
              Run
            </Button>
            <Button size="sm" variant="ghost" aria-label="Delete">
              <X className="size-4" />
            </Button>
          </div>
        ),
      },
      {
        id: "3",
        objectType: "recordType",
        title: "Collapsible Item with Actions",
        subtitle: "Has both actions and collapsible content",
        actions: (
          <Button size="sm" variant="default">
            Configure
          </Button>
        ),
        collapsibleContent: (
          <div className="bg-background">
            <p className="text-sm text-muted-foreground bg-background">
              This item demonstrates having both actions in the header and
              collapsible content below.
            </p>
          </div>
        ),
        defaultOpen: false,
      },
    ],
  },
}
