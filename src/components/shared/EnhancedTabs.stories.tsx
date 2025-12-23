import type { Meta, StoryObj } from "@storybook/react"
import {
  Home,
  MessageSquare,
  Settings,
  Bell,
  Heart,
  Star,
  Zap,
} from "lucide-react"
import { within, userEvent, expect } from "storybook/test"

import {
  EnhancedTabs,
  EnhancedTabsList,
  EnhancedTabsTrigger,
  TabIcon,
  TabCount,
  TabsContent,
} from "./EnhancedTabs"

const meta = {
  title: "Shared/EnhancedTabs",
  component: EnhancedTabs,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EnhancedTabs>

export default meta
type Story = StoryObj<typeof meta>

// PRIMARY VARIANT STORIES

export const PrimaryDefault: Story = {
  args: {
    variant: "primary",
    defaultValue: "home",
  },
  render: (args) => (
    <EnhancedTabs {...args}>
      <EnhancedTabsList>
        <EnhancedTabsTrigger value="home">Home</EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="messages">Messages</EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="settings">Settings</EnhancedTabsTrigger>
      </EnhancedTabsList>
      <TabsContent value="home" className="p-4">
        <p className="text-sm text-muted-foreground">Home content</p>
      </TabsContent>
      <TabsContent value="messages" className="p-4">
        <p className="text-sm text-muted-foreground">Messages content</p>
      </TabsContent>
      <TabsContent value="settings" className="p-4">
        <p className="text-sm text-muted-foreground">Settings content</p>
      </TabsContent>
    </EnhancedTabs>
  ),
}

export const PrimaryWithIcons: Story = {
  args: {
    variant: "primary",
    defaultValue: "home",
  },
  render: (args) => (
    <EnhancedTabs {...args}>
      <EnhancedTabsList>
        <EnhancedTabsTrigger value="home">
          <TabIcon icon={Home} />
          Home
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="messages">
          <TabIcon icon={MessageSquare} />
          Messages
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="settings">
          <TabIcon icon={Settings} />
          Settings
        </EnhancedTabsTrigger>
      </EnhancedTabsList>
      <TabsContent value="home" className="p-4">
        <p className="text-sm text-muted-foreground">Home content with icons</p>
      </TabsContent>
      <TabsContent value="messages" className="p-4">
        <p className="text-sm text-muted-foreground">
          Messages content with icons
        </p>
      </TabsContent>
      <TabsContent value="settings" className="p-4">
        <p className="text-sm text-muted-foreground">
          Settings content with icons
        </p>
      </TabsContent>
    </EnhancedTabs>
  ),
}

export const PrimaryWithCounts: Story = {
  args: {
    variant: "primary",
    defaultValue: "home",
  },
  render: (args) => (
    <EnhancedTabs {...args}>
      <EnhancedTabsList>
        <EnhancedTabsTrigger value="home">
          Home
          <TabCount count={5} />
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="messages">
          Messages
          <TabCount count={12} />
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="settings">
          Settings
          <TabCount count={3} />
        </EnhancedTabsTrigger>
      </EnhancedTabsList>
      <TabsContent value="home" className="p-4">
        <p className="text-sm text-muted-foreground">Home content (5 items)</p>
      </TabsContent>
      <TabsContent value="messages" className="p-4">
        <p className="text-sm text-muted-foreground">Messages content (12 items)</p>
      </TabsContent>
      <TabsContent value="settings" className="p-4">
        <p className="text-sm text-muted-foreground">Settings content (3 items)</p>
      </TabsContent>
    </EnhancedTabs>
  ),
}

export const PrimaryComplete: Story = {
  args: {
    variant: "primary",
    defaultValue: "home",
  },
  render: (args) => (
    <EnhancedTabs {...args}>
      <EnhancedTabsList>
        <EnhancedTabsTrigger value="home">
          <TabIcon icon={Home} />
          Home
          <TabCount count={5} />
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="messages">
          <TabIcon icon={MessageSquare} />
          Messages
          <TabCount count={12} />
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="notifications">
          <TabIcon icon={Bell} />
          Notifications
          <TabCount count={3} />
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="settings">
          <TabIcon icon={Settings} />
          Settings
        </EnhancedTabsTrigger>
      </EnhancedTabsList>
      <TabsContent value="home" className="p-4">
        <p className="text-sm text-muted-foreground">Home content with icons and counts</p>
      </TabsContent>
      <TabsContent value="messages" className="p-4">
        <p className="text-sm text-muted-foreground">
          Messages content with icons and counts
        </p>
      </TabsContent>
      <TabsContent value="notifications" className="p-4">
        <p className="text-sm text-muted-foreground">
          Notifications content with icons and counts
        </p>
      </TabsContent>
      <TabsContent value="settings" className="p-4">
        <p className="text-sm text-muted-foreground">
          Settings content with just icons
        </p>
      </TabsContent>
    </EnhancedTabs>
  ),
}

// SECONDARY VARIANT STORIES

export const SecondaryDefault: Story = {
  args: {
    variant: "secondary",
    defaultValue: "home",
  },
  render: (args) => (
    <EnhancedTabs {...args}>
      <EnhancedTabsList>
        <EnhancedTabsTrigger value="home">Home</EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="messages">Messages</EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="settings">Settings</EnhancedTabsTrigger>
      </EnhancedTabsList>
      <TabsContent value="home" className="p-4">
        <p className="text-sm text-muted-foreground">Home content (secondary)</p>
      </TabsContent>
      <TabsContent value="messages" className="p-4">
        <p className="text-sm text-muted-foreground">
          Messages content (secondary)
        </p>
      </TabsContent>
      <TabsContent value="settings" className="p-4">
        <p className="text-sm text-muted-foreground">
          Settings content (secondary)
        </p>
      </TabsContent>
    </EnhancedTabs>
  ),
}

export const SecondaryWithIcons: Story = {
  args: {
    variant: "secondary",
    defaultValue: "home",
  },
  render: (args) => (
    <EnhancedTabs {...args}>
      <EnhancedTabsList>
        <EnhancedTabsTrigger value="home">
          <TabIcon icon={Home} />
          Home
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="messages">
          <TabIcon icon={MessageSquare} />
          Messages
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="settings">
          <TabIcon icon={Settings} />
          Settings
        </EnhancedTabsTrigger>
      </EnhancedTabsList>
      <TabsContent value="home" className="p-4">
        <p className="text-sm text-muted-foreground">
          Home content (secondary with icons)
        </p>
      </TabsContent>
      <TabsContent value="messages" className="p-4">
        <p className="text-sm text-muted-foreground">
          Messages content (secondary with icons)
        </p>
      </TabsContent>
      <TabsContent value="settings" className="p-4">
        <p className="text-sm text-muted-foreground">
          Settings content (secondary with icons)
        </p>
      </TabsContent>
    </EnhancedTabs>
  ),
}

export const SecondaryWithCounts: Story = {
  args: {
    variant: "secondary",
    defaultValue: "home",
  },
  render: (args) => (
    <EnhancedTabs {...args}>
      <EnhancedTabsList>
        <EnhancedTabsTrigger value="home">
          Home
          <TabCount count={5} />
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="messages">
          Messages
          <TabCount count={12} />
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="settings">
          Settings
          <TabCount count={3} />
        </EnhancedTabsTrigger>
      </EnhancedTabsList>
      <TabsContent value="home" className="p-4">
        <p className="text-sm text-muted-foreground">
          Home content (secondary with counts)
        </p>
      </TabsContent>
      <TabsContent value="messages" className="p-4">
        <p className="text-sm text-muted-foreground">
          Messages content (secondary with counts)
        </p>
      </TabsContent>
      <TabsContent value="settings" className="p-4">
        <p className="text-sm text-muted-foreground">
          Settings content (secondary with counts)
        </p>
      </TabsContent>
    </EnhancedTabs>
  ),
}

export const SecondaryComplete: Story = {
  args: {
    variant: "secondary",
    defaultValue: "home",
  },
  render: (args) => (
    <EnhancedTabs {...args}>
      <EnhancedTabsList>
        <EnhancedTabsTrigger value="home">
          <TabIcon icon={Home} />
          Home
          <TabCount count={5} />
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="messages">
          <TabIcon icon={MessageSquare} />
          Messages
          <TabCount count={12} />
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="notifications">
          <TabIcon icon={Bell} />
          Notifications
          <TabCount count={3} />
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="settings">
          <TabIcon icon={Settings} />
          Settings
        </EnhancedTabsTrigger>
      </EnhancedTabsList>
      <TabsContent value="home" className="p-4">
        <p className="text-sm text-muted-foreground">
          Home content (secondary with icons and counts)
        </p>
      </TabsContent>
      <TabsContent value="messages" className="p-4">
        <p className="text-sm text-muted-foreground">
          Messages content (secondary with icons and counts)
        </p>
      </TabsContent>
      <TabsContent value="notifications" className="p-4">
        <p className="text-sm text-muted-foreground">
          Notifications content (secondary with icons and counts)
        </p>
      </TabsContent>
      <TabsContent value="settings" className="p-4">
        <p className="text-sm text-muted-foreground">
          Settings content (secondary with just icons)
        </p>
      </TabsContent>
    </EnhancedTabs>
  ),
}

// INTERACTIVE TEST STORY

export const Interactive: Story = {
  args: {
    variant: "primary",
    defaultValue: "home",
  },
  render: (args) => (
    <EnhancedTabs {...args}>
      <EnhancedTabsList>
        <EnhancedTabsTrigger value="home">
          <TabIcon icon={Home} />
          Home
          <TabCount count={5} />
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="messages">
          <TabIcon icon={MessageSquare} />
          Messages
          <TabCount count={12} />
        </EnhancedTabsTrigger>
        <EnhancedTabsTrigger value="notifications">
          <TabIcon icon={Bell} />
          Notifications
          <TabCount count={3} />
        </EnhancedTabsTrigger>
      </EnhancedTabsList>
      <TabsContent value="home" className="p-4">
        <p className="text-sm text-muted-foreground">Home content</p>
      </TabsContent>
      <TabsContent value="messages" className="p-4">
        <p className="text-sm text-muted-foreground">Messages content</p>
      </TabsContent>
      <TabsContent value="notifications" className="p-4">
        <p className="text-sm text-muted-foreground">Notifications content</p>
      </TabsContent>
    </EnhancedTabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const homeTab = canvas.getByRole("tab", { name: /home/i })
    const messagesTab = canvas.getByRole("tab", { name: /messages/i })
    const notificationsTab = canvas.getByRole("tab", { name: /notifications/i })

    // Verify initial state - home should be active
    expect(homeTab).toHaveAttribute("data-state", "active")
    expect(messagesTab).toHaveAttribute("data-state", "inactive")
    expect(notificationsTab).toHaveAttribute("data-state", "inactive")

    // Click messages tab
    await userEvent.click(messagesTab)
    expect(messagesTab).toHaveAttribute("data-state", "active")
    expect(homeTab).toHaveAttribute("data-state", "inactive")

    // Click notifications tab
    await userEvent.click(notificationsTab)
    expect(notificationsTab).toHaveAttribute("data-state", "active")
    expect(messagesTab).toHaveAttribute("data-state", "inactive")

    // Test keyboard navigation - arrow left should go to previous tab
    notificationsTab.focus()
    await userEvent.keyboard("{ArrowLeft}")
    expect(messagesTab).toHaveAttribute("data-state", "active")

    // Arrow right should go to next tab
    await userEvent.keyboard("{ArrowRight}")
    expect(notificationsTab).toHaveAttribute("data-state", "active")
  },
}

// COMPARISON STORY

export const Comparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Primary Variant (Underlined)</h3>
        <EnhancedTabs variant="primary" defaultValue="home">
          <EnhancedTabsList>
            <EnhancedTabsTrigger value="home">
              <TabIcon icon={Home} />
              Home
              <TabCount count={5} />
            </EnhancedTabsTrigger>
            <EnhancedTabsTrigger value="messages">
              <TabIcon icon={MessageSquare} />
              Messages
              <TabCount count={12} />
            </EnhancedTabsTrigger>
            <EnhancedTabsTrigger value="notifications">
              <TabIcon icon={Bell} />
              Notifications
              <TabCount count={3} />
            </EnhancedTabsTrigger>
          </EnhancedTabsList>
          <TabsContent value="home" className="p-4">
            <p className="text-sm text-muted-foreground">Home content</p>
          </TabsContent>
          <TabsContent value="messages" className="p-4">
            <p className="text-sm text-muted-foreground">Messages content</p>
          </TabsContent>
          <TabsContent value="notifications" className="p-4">
            <p className="text-sm text-muted-foreground">
              Notifications content
            </p>
          </TabsContent>
        </EnhancedTabs>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Secondary Variant (Pill)</h3>
        <EnhancedTabs variant="secondary" defaultValue="home">
          <EnhancedTabsList>
            <EnhancedTabsTrigger value="home">
              <TabIcon icon={Home} />
              Home
              <TabCount count={5} />
            </EnhancedTabsTrigger>
            <EnhancedTabsTrigger value="messages">
              <TabIcon icon={MessageSquare} />
              Messages
              <TabCount count={12} />
            </EnhancedTabsTrigger>
            <EnhancedTabsTrigger value="notifications">
              <TabIcon icon={Bell} />
              Notifications
              <TabCount count={3} />
            </EnhancedTabsTrigger>
          </EnhancedTabsList>
          <TabsContent value="home" className="p-4">
            <p className="text-sm text-muted-foreground">Home content</p>
          </TabsContent>
          <TabsContent value="messages" className="p-4">
            <p className="text-sm text-muted-foreground">Messages content</p>
          </TabsContent>
          <TabsContent value="notifications" className="p-4">
            <p className="text-sm text-muted-foreground">
              Notifications content
            </p>
          </TabsContent>
        </EnhancedTabs>
      </div>
    </div>
  ),
}

// MANY TABS STORY

export const ManyTabs: Story = {
  args: {
    variant: "primary",
    defaultValue: "tab-0",
  },
  render: (args) => (
    <EnhancedTabs {...args}>
      <EnhancedTabsList>
        {Array.from({ length: 8 }, (_, i) => (
          <EnhancedTabsTrigger key={i} value={`tab-${i}`}>
            <TabIcon icon={[Home, MessageSquare, Settings, Bell, Heart, Star, Zap, Home][i]} />
            Tab {i + 1}
            {i % 2 === 0 && <TabCount count={Math.floor(Math.random() * 20) + 1} />}
          </EnhancedTabsTrigger>
        ))}
      </EnhancedTabsList>
      {Array.from({ length: 8 }, (_, i) => (
        <TabsContent key={i} value={`tab-${i}`} className="p-4">
          <p className="text-sm text-muted-foreground">
            Content for tab {i + 1}
          </p>
        </TabsContent>
      ))}
    </EnhancedTabs>
  ),
}
