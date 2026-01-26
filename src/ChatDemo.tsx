import { Link } from "wouter"
import { ChatFeedback, UserMessage, AssistantMessage, TaskProgress, type Task, AgentSteps, type AgentStep, ChatConfirmation, ChatInput, ChatPanel } from "./components/chat"
import { ChatPanelHeader, type ThreadMode, type NewChatMode } from "./components/chat/ChatPanelHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { ModeToggle } from "./components/shared/mode-toggle"
import { Settings, MoreVertical, MessageSquare, Search } from "lucide-react"
import { useState } from "react"

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

// Sample thread data for ChatPanelHeader demo
const pinnedThreads = [
  'Q4 Travel Expenses - Marketing Team',
  'Office Supplies Reimbursement',
  'Conference Registration Fees'
]

const recentThreads = [
  'Client dinner expense request',
  'Mileage Reimbursement - Site Visits',
  'Software Subscription Renewal',
  'Team Building Event Expenses',
  'Annual Training Workshop Costs',
  'Parking Fees - Downtown Office',
  'Mobile Phone Bill Reimbursement',
  'Laptop Repair and Maintenance',
  'Business Cards and Stationery',
  'Quarterly Team Lunch',
  'Expense reimbursement - Client dinner $127.50'
]

function ChatPanelHeaderDemo() {
  const [threadMode, setThreadMode] = useState<ThreadMode>('Back Page')
  const [newChatMode, setNewChatMode] = useState<NewChatMode>('Edit')
  const [showThreads, setShowThreads] = useState(false) // Start in chat view
  const [showThreadDropdown, setShowThreadDropdown] = useState(false)
  const [threadSearchQuery, setThreadSearchQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasMessageBeenSent, setHasMessageBeenSent] = useState(false)
  const [selectedHistoryThread, setSelectedHistoryThread] = useState('')
  const [selectedThreadName, setSelectedThreadName] = useState('')

  const getDisplayTitle = () => {
    if (threadMode === 'Dropdown') {
      if (selectedThreadName) return selectedThreadName
      if (hasMessageBeenSent) return 'Expense reimbursement request - Client dinner'
      return 'New Chat'
    } else if (threadMode === 'History') {
      return 'Expense Agent'
    } else {
      if (showThreads) {
        return 'Expense Agent'
      } else {
        if (selectedThreadName) return selectedThreadName
        if (hasMessageBeenSent) return 'Expense reimbursement request - Client dinner'
        return 'Expense Agent'
      }
    }
  }

  const handleBackClick = () => {
    setShowThreads(true)
    setSelectedThreadName('')
  }

  const handleNewChat = () => {
    setShowThreads(false)
    setHasMessageBeenSent(false)
    setIsTyping(false)
    setIsPinned(false)
    setSelectedHistoryThread('')
    setSelectedThreadName('')
    setThreadSearchQuery('')
  }

  const handleThreadSelect = (threadName: string) => {
    setShowThreadDropdown(false)
    setShowThreads(false)
    setHasMessageBeenSent(true)
    setSelectedThreadName(threadName)
  }

  const handleHistoryThreadSelect = (threadName: string) => {
    setSelectedHistoryThread(threadName)
  }

  const simulateTyping = () => {
    setIsTyping(true)
    setTimeout(() => setIsTyping(false), 3000)
  }

  const simulateMessageSent = () => {
    setHasMessageBeenSent(true)
    setShowThreads(false)
    if (threadMode === 'History' && recentThreads.length > 0) {
      setSelectedHistoryThread(recentThreads[0])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ChatPanelHeader - Navigation & Threading</CardTitle>
        <CardDescription>
          Chat header with thread navigation, back button, pin functionality, and sliding panels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="bg-muted/30 p-4 rounded-lg space-y-4">
          <h3 className="font-semibold text-sm">Interactive Controls</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="chat-demo-thread-mode-select" className="block text-xs font-medium mb-1">Thread Mode</label>
              <select 
                id="chat-demo-thread-mode-select"
                value={threadMode}
                onChange={(e) => setThreadMode(e.target.value as ThreadMode)}
                className="w-full text-xs px-2 py-1 border rounded"
              >
                <option value="Back Page">Back Page</option>
                <option value="Dropdown">Dropdown</option>
                <option value="History">History</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="chat-demo-new-chat-mode-select" className="block text-xs font-medium mb-1">New Chat Mode</label>
              <select 
                id="chat-demo-new-chat-mode-select"
                value={newChatMode}
                onChange={(e) => setNewChatMode(e.target.value as NewChatMode)}
                className="w-full text-xs px-2 py-1 border rounded"
              >
                <option value="Edit">Edit (Pen)</option>
                <option value="Plus">Plus (Circle)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1">State</label>
              <div className="space-y-1">
                <label className="flex items-center text-xs">
                  <input 
                    type="checkbox" 
                    checked={showThreads}
                    onChange={(e) => setShowThreads(e.target.checked)}
                    className="mr-1"
                  />
                  Show Threads
                </label>
                <label className="flex items-center text-xs">
                  <input 
                    type="checkbox" 
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="mr-1"
                  />
                  Pinned
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1">Actions</label>
              <div className="space-y-1">
                <button 
                  onClick={simulateTyping}
                  className="block w-full text-xs px-2 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded"
                >
                  Simulate Typing
                </button>
                <button 
                  onClick={simulateMessageSent}
                  className="block w-full text-xs px-2 py-1 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded"
                >
                  Message Sent
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <strong>Current Title:</strong> {getDisplayTitle()} | 
            <strong> Has Message:</strong> {hasMessageBeenSent ? 'Yes' : 'No'} | 
            <strong> Show Threads:</strong> {showThreads ? 'Yes' : 'No'} |
            <strong> Back Button Visible:</strong> {threadMode === 'Back Page' && !showThreads ? 'Yes' : 'No'}
          </div>
        </div>

        {/* Chat Panel Demo */}
        <div className="border rounded-lg overflow-hidden bg-background">
          <ChatPanelHeader
            threadMode={threadMode}
            newChatMode={newChatMode}
            showThreads={showThreads}
            showThreadDropdown={showThreadDropdown}
            threadSearchQuery={threadSearchQuery}
            displayTitle={getDisplayTitle()}
            isTyping={isTyping}
            isPinned={isPinned}
            isExpanded={isExpanded}
            showMinimizeMaximize={true}
            hasMessageBeenSent={hasMessageBeenSent}
            pinnedThreads={pinnedThreads}
            recentThreads={recentThreads}
            selectedHistoryThread={selectedHistoryThread}
            onBackClick={handleBackClick}
            onNewChat={handleNewChat}
            onClose={() => console.log('Close clicked')}
            onMinimizeMaximize={() => setIsExpanded(!isExpanded)}
            onThreadDropdownToggle={() => setShowThreadDropdown(!showThreadDropdown)}
            onThreadSearchChange={setThreadSearchQuery}
            onPinToggle={() => setIsPinned(!isPinned)}
            onThreadSelect={handleThreadSelect}
            onHistoryThreadSelect={handleHistoryThreadSelect}
          />
          
          {/* Sliding Panel System */}
          <div className={`relative overflow-hidden transition-all duration-300 ${
            isExpanded ? 'h-96' : 'h-48'
          }`}>
            
            {/* Threads List Panel */}
            <div 
              className={`absolute inset-0 transition-transform duration-300 ease-in-out bg-muted/5 ${
                showThreads ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="h-full overflow-y-auto p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Chat Threads</h2>
                
                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                  <input
                    type="text"
                    placeholder="Search threads..."
                    className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background"
                  />
                </div>
                
                {/* Pinned Threads */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Pinned</h3>
                  <div className="space-y-2">
                    {pinnedThreads.slice(0, 2).map((thread, index) => (
                      <div 
                        key={index}
                        onClick={() => {
                          setSelectedThreadName(thread)
                          setShowThreads(false)
                          setHasMessageBeenSent(true)
                        }}
                        className="p-3 rounded-lg border hover:bg-accent cursor-pointer flex gap-3"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MessageSquare size={20} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-foreground truncate">{thread}</div>
                          <div className="text-xs text-muted-foreground">2 hours ago</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recent Threads */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Recent</h3>
                  <div className="space-y-2">
                    {recentThreads.slice(0, 3).map((thread, index) => (
                      <div 
                        key={index}
                        onClick={() => {
                          setSelectedThreadName(thread)
                          setShowThreads(false)
                          setHasMessageBeenSent(true)
                        }}
                        className="p-3 rounded-lg border hover:bg-accent cursor-pointer flex gap-3"
                      >
                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                          <MessageSquare size={20} className="text-secondary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-foreground truncate">{thread}</div>
                          <div className="text-xs text-muted-foreground">Yesterday</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat Panel */}
            <div 
              className={`absolute inset-0 transition-transform duration-300 ease-in-out bg-background ${
                showThreads ? 'translate-x-full' : 'translate-x-0'
              }`}
            >
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {isTyping ? (
                      <span className="flex items-center justify-center gap-2">
                        <span>AI is typing</span>
                        <span className="inline-flex items-center gap-1">
                          <span className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"></span>
                          <span className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </span>
                      </span>
                    ) : hasMessageBeenSent ? (
                      'Chat conversation would appear here'
                    ) : (
                      'Start a new conversation'
                    )}
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Mode: <strong>{threadMode}</strong></div>
                    <div>View: <strong>{showThreads ? 'Threads List (Full Page)' : 'Chat Conversation'}</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat Input Area */}
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 px-3 py-2 border rounded-md text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    simulateMessageSent()
                    e.currentTarget.value = ''
                  }
                }}
              />
              <button 
                onClick={simulateMessageSent}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90"
              >
                Send
              </button>
            </div>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="bg-muted/30 p-4 rounded-lg text-sm border">
          <h4 className="font-semibold mb-2">How to Use:</h4>
          <ul className="space-y-1 text-muted-foreground">
            <li>• <strong>Initial State:</strong> Starts in threads list view</li>
            <li>• <strong>Thread Selection:</strong> Click any thread → goes to chat view with back button</li>
            <li>• <strong>Back Navigation:</strong> Click back button → returns to threads list</li>
            <li>• <strong>Thread Modes:</strong> Switch between Back Page, Dropdown, and History modes</li>
            <li>• <strong>Pin Functionality:</strong> Pin button appears when you have an active conversation</li>
            <li>• <strong>Typing Indicator:</strong> Use "Simulate Typing" to see the animation</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

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
            </div>
            <p className="text-sm text-muted-foreground">
              Click to provide feedback (click again to deselect)
            </p>
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

        <Card>
          <CardHeader>
            <CardTitle>ChatInput</CardTitle>
            <CardDescription>
              Input field for sending chat messages with Enter key support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChatInput
              placeholder="Type a message..."
              onSubmit={(message) => console.log("Submitted:", message)}
            />
          </CardContent>
        </Card>

        <ChatPanelHeaderDemo />

        <Card className="bg-secondary">
          <CardHeader>
            <CardTitle>ChatPanel - Full Experience</CardTitle>
            <CardDescription>
              Complete chat panel with fixed header/footer and scrolling content
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChatPanel
              title="AI Assistant"
              headerActions={[
                {
                  icon: <Settings />,
                  label: "Settings",
                  onClick: () => console.log("Settings clicked"),
                },
                {
                  icon: <MoreVertical />,
                  label: "More options",
                  onClick: () => console.log("More options clicked"),
                },
              ]}
              footer={<ChatInput placeholder="Ask me anything..." />}
              height="600px"
            >
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
            </ChatPanel>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
