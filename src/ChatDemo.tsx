import { Link } from "wouter"
import { ChatFeedback, UserMessage, AssistantMessage, TaskProgress, type Task, AgentSteps, type AgentStep, ChatConfirmation } from "./components/chat"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { ModeToggle } from "./components/shared/mode-toggle"

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
  {
    id: "5",
    label: "Create document upload component",
    status: "todo",
  },
  {
    id: "6",
    label: "Implement application submission process",
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
  {
    id: "4",
    title: "Adding data fields",
    preview: {
      type: "code",
      content: `Record Type:
LA_LoanApplication_RecordType
Fields:
- loanNumber (Text, Primary Key)
- referenceNumber (Text, Unique)
- applicationDate (Date)
- borrowerFirstName (Text)`,
    },
    actions: [
      {
        label: "View Diff",
        variant: "link",
        icon: "split",
        onClick: () => console.log("View Diff clicked"),
      },
      {
        label: "Revert",
        variant: "link",
        icon: "rotateCcw",
        onClick: () => console.log("Revert clicked"),
      },
    ],
    status: "pending",
  },
]

export default function ChatDemo() {
  return (
    <div className="min-h-screen p-8 mb-100">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Home
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Chat Components Demo</h1>
            <p className="text-muted-foreground">
              Interactive chat components for AI experiences
            </p>
          </div>
          <ModeToggle />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ChatFeedback</CardTitle>
            <CardDescription>
              Thumbs up/down feedback buttons with toggle behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <ChatFeedback />
              <span className="text-sm text-muted-foreground">
                Click to provide feedback (click again to deselect)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>UserMessage</CardTitle>
            <CardDescription>
              User message bubble with simple styling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <UserMessage message="let's create a new component" />
            <UserMessage message="This is a longer message to show how the component handles more text. It should wrap nicely and maintain good readability." />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AssistantMessage</CardTitle>
            <CardDescription>
              Assistant message with full width, no visible container
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AssistantMessage message="I'll create the AssistantMessage component with full width and left-aligned styling." />
            <AssistantMessage message="This is a longer assistant response to demonstrate how the component handles more text. It spans the full width of the container and maintains a clean, readable appearance without feeling like it's in a boxed container." />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TaskProgress</CardTitle>
            <CardDescription>
              Collapsible task list with progress tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TaskProgress tasks={sampleTasks} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AgentSteps</CardTitle>
            <CardDescription>
              Timeline view of agent actions with status indicators, content previews, and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AgentSteps steps={sampleAgentSteps} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ChatConfirmation</CardTitle>
            <CardDescription>
              Request user confirmation before proceeding with a task
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChatConfirmation
              message="Next, I'll create the document record type for handling file attachments. Should I proceed with this task?"
              primaryAction={{
                label: "Yes, continue",
                onClick: () => console.log("Confirmed"),
              }}
              secondaryAction={{
                label: "No, skip this",
                onClick: () => console.log("Cancelled"),
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
