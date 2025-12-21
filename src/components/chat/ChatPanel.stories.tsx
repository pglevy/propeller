import type { Meta, StoryObj } from '@storybook/react'
import { Settings, MoreVertical, X } from 'lucide-react'
import { ChatPanel } from './ChatPanel'
import { ChatInput } from './ChatInput'
import { UserMessage } from './UserMessage'
import { AssistantMessage } from './AssistantMessage'
import { ChatFeedback } from './ChatFeedback'
import { TaskProgress, type Task } from './TaskProgress'
import { AgentSteps, type AgentStep } from './AgentSteps'

const meta = {
  title: 'Chat/ChatPanel',
  component: ChatPanel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChatPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Chat',
    children: (
      <div className="space-y-4">
        <UserMessage message="Hello!" />
        <AssistantMessage message="Hi there! How can I help you today?" />
      </div>
    ),
    footer: <ChatInput />,
  },
}

export const WithHeaderActions: Story = {
  args: {
    title: 'Chat Assistant',
    headerActions: [
      {
        icon: <Settings />,
        label: 'Settings',
        onClick: () => console.log('Settings clicked'),
      },
      {
        icon: <MoreVertical />,
        label: 'More options',
        onClick: () => console.log('More options clicked'),
      },
      {
        icon: <X />,
        label: 'Close',
        onClick: () => console.log('Close clicked'),
      },
    ],
    children: (
      <div className="space-y-4">
        <UserMessage message="Hello!" />
        <AssistantMessage message="Hi there! How can I help you today?" />
      </div>
    ),
    footer: <ChatInput placeholder="Ask me anything..." />,
  },
}

const sampleTasks: Task[] = [
  {
    id: "1",
    label: "Create loan application record type",
    status: "completed",
  },
  {
    id: "2",
    label: "Create document record type",
    status: "completed",
  },
  {
    id: "3",
    label: "Create brand selection interface",
    status: "active",
  },
  {
    id: "4",
    label: "Build loan application form interface",
    status: "todo",
  },
]

const sampleAgentSteps: AgentStep[] = [
  {
    id: "1",
    title: "Updating story status and assignment",
    subtitle: "Updated story US-001 to In Progress, assigned to You",
    status: "completed",
  },
  {
    id: "2",
    title: "Creating loan application record type",
    subtitle: "LA Loan Application created",
    status: "completed",
  },
  {
    id: "3",
    icon: "loaderCircle",
    title: "Defining data source",
    preview: {
      type: "code",
      content: `Record Type: LA Loan Application
Data Source: jdbc/Appian
Table name: APPLICATION`,
    },
    status: "active",
  },
]

export const FullConversation: Story = {
  args: {
    title: 'AI Assistant',
    headerActions: [
      {
        icon: <Settings />,
        label: 'Settings',
        onClick: () => console.log('Settings clicked'),
      },
    ],
    children: (
      <div className="space-y-6">
        <UserMessage message="Create a loan application system with document management" />

        <div className="space-y-4">
          <AssistantMessage message="I'll help you create a loan application system with document management. Let me break this down into tasks." />
          <TaskProgress tasks={sampleTasks} />
        </div>

        <UserMessage message="Great! Let's start with the first task." />

        <div className="space-y-4">
          <AssistantMessage message="I'll create the loan application record type now." />
          <AgentSteps steps={sampleAgentSteps} />
        </div>

        <div className="space-y-4">
          <AssistantMessage message="I've started creating the loan application record type. The data source is configured and I'm defining the fields. Does this look correct?" />
          <ChatFeedback />
        </div>
      </div>
    ),
    footer: <ChatInput placeholder="Type your message..." />,
    height: '600px',
  },
}

export const LongScrollingContent: Story = {
  args: {
    title: 'Long Conversation',
    children: (
      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="space-y-4">
            <UserMessage message={`Message ${i + 1}: This is a test message`} />
            <AssistantMessage message={`Response ${i + 1}: This is a response to your message. Here's some additional content to make it longer and demonstrate the scrolling behavior.`} />
          </div>
        ))}
      </div>
    ),
    footer: <ChatInput />,
    height: '600px',
  },
}

export const NoFooter: Story = {
  args: {
    title: 'Read-only Chat',
    children: (
      <div className="space-y-4">
        <UserMessage message="Hello!" />
        <AssistantMessage message="Hi there! This is a read-only chat view." />
      </div>
    ),
  },
}

export const NoHeader: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <UserMessage message="Hello!" />
        <AssistantMessage message="Hi there! This chat has no header." />
      </div>
    ),
    footer: <ChatInput />,
  },
}
