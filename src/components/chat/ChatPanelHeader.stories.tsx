import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from 'storybook/test'
import { useState } from 'react'
import { MessageSquare, Search } from 'lucide-react'
import { ChatPanelHeader, type ThreadMode, type NewChatMode } from './ChatPanelHeader'

const meta = {
  title: 'Chat/ChatPanelHeader',
  component: ChatPanelHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChatPanelHeader>

export default meta
type Story = StoryObj<typeof meta>

// Sample thread data
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

// Interactive Demo Component
const InteractiveDemo = () => {
  const [threadMode, setThreadMode] = useState<ThreadMode>('Back Page')
  const [newChatMode, setNewChatMode] = useState<NewChatMode>('Edit')
  const [showThreads, setShowThreads] = useState(false) // Start in chat view for Back Page mode
  const [showThreadDropdown, setShowThreadDropdown] = useState(false)
  const [threadSearchQuery, setThreadSearchQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasMessageBeenSent, setHasMessageBeenSent] = useState(false)
  const [selectedHistoryThread, setSelectedHistoryThread] = useState('')
  const [selectedThreadName, setSelectedThreadName] = useState('')
  const [pinFeedback, setPinFeedback] = useState('')

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

  // Pin button should be more accessible - show it when there's an active conversation
  const shouldShowPinButton = () => {
    const currentTitle = getDisplayTitle()
    // Show pin button when:
    // 1. We have an active conversation (message has been sent)
    // 2. We're not in the threads list view
    // 3. We're not in a generic state (New Chat)
    return hasMessageBeenSent && !showThreads && currentTitle !== 'New Chat'
  }

  const handlePinToggle = () => {
    setIsPinned(!isPinned)
    
    // When pinning a thread, it should be added to pinned threads
    if (!isPinned) {
      const currentTitle = getDisplayTitle()
      if (currentTitle && !pinnedThreads.includes(currentTitle)) {
        // In a real app, this would update the pinned threads list
        setPinFeedback(`✅ "${currentTitle}" pinned to top!`)
        console.log(`Thread "${currentTitle}" pinned!`)
      }
    } else {
      const currentTitle = getDisplayTitle()
      setPinFeedback(`📌 "${currentTitle}" unpinned`)
      console.log(`Thread unpinned!`)
    }
    
    // Clear feedback after 3 seconds
    setTimeout(() => setPinFeedback(''), 3000)
  }

  const handleNewChat = () => {
    setShowThreads(false)
    setHasMessageBeenSent(false)
    setIsTyping(false)
    setIsPinned(false)
    setSelectedHistoryThread('')
    setThreadSearchQuery('')
  }

  const handleBackClick = () => {
    setShowThreads(true)
    // When going back to threads, clear the selected thread name
    setSelectedThreadName('')
  }

  const handleThreadSelect = (threadName: string) => {
    setShowThreadDropdown(false)
    setShowThreads(false) // Go to chat view when selecting a thread
    setHasMessageBeenSent(true)
    setSelectedThreadName(threadName) // Track the selected thread
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Controls */}
      <div className="bg-muted/30 p-4 rounded-lg space-y-4">
        <h3 className="font-semibold text-sm">Interactive Controls</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="thread-mode-select" className="block text-xs font-medium mb-1">Thread Mode</label>
            <select 
              id="thread-mode-select"
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
            <label htmlFor="new-chat-mode-select" className="block text-xs font-medium mb-1">New Chat Mode</label>
            <select 
              id="new-chat-mode-select"
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
                className="block w-full text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded"
              >
                Simulate Typing
              </button>
              <button 
                onClick={simulateMessageSent}
                className="block w-full text-xs px-2 py-1 bg-green-100 hover:bg-green-200 rounded"
              >
                Message Sent
              </button>
              <button 
                onClick={() => {
                  setHasMessageBeenSent(true)
                  setShowThreads(false)
                  // Use a thread name that makes sense for pinning
                  const threadName = 'Project Planning Discussion'
                  setSelectedThreadName(threadName)
                }}
                className="block w-full text-xs px-2 py-1 bg-purple-100 hover:bg-purple-200 rounded"
              >
                Enter Chat View
              </button>
              <button 
                onClick={() => {
                  setShowThreads(true)
                  setSelectedThreadName('')
                }}
                className="block w-full text-xs px-2 py-1 bg-orange-100 hover:bg-orange-200 rounded"
              >
                Go to Threads List
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          <strong>Current Title:</strong> {getDisplayTitle()} | 
          <strong> Has Message:</strong> {hasMessageBeenSent ? 'Yes' : 'No'} | 
          <strong> Show Threads:</strong> {showThreads ? 'Yes' : 'No'} |
          <strong> Back Button Visible:</strong> {threadMode === 'Back Page' && !showThreads ? 'Yes' : 'No'} |
          <strong> Pin Button Visible:</strong> {shouldShowPinButton() ? 'Yes' : 'No'}
          {pinFeedback && (
            <div className="mt-1 text-green-600 font-medium">{pinFeedback}</div>
          )}
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
          onPinToggle={handlePinToggle}
          onThreadSelect={handleThreadSelect}
          onHistoryThreadSelect={handleHistoryThreadSelect}
        />
        
        {/* Sliding Panel System - Mimics the reference implementation */}
        <div className={`relative overflow-hidden transition-all duration-300 ${
          isExpanded ? 'h-96' : 'h-48'
        }`}>
          
          {/* Threads List Panel - Slides in from left when showThreads = true */}
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
          
          {/* Chat Panel - Slides out to right when showThreads = true */}
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
                  <div>Panel State: <strong>{showThreads ? 'Threads Visible' : 'Chat Visible'}</strong></div>
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
      <div className="bg-blue-50 p-4 rounded-lg text-sm">
        <h4 className="font-semibold mb-2">Try These Interactions:</h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>• <strong>Initial State:</strong> Starts in chat view (showThreads = false)</li>
          <li>• <strong>Back Button:</strong> Visible initially - click to go to threads list</li>
          <li>• <strong>Thread Selection:</strong> Click any thread → returns to chat view</li>
          <li>• <strong>Navigation Flow:</strong> Chat View ↔ Threads List (via back button)</li>
          <li>• <strong>Pin Button:</strong> Appears when you have an active conversation</li>
          <li>• Try different thread modes to see how behavior changes</li>
          <li>• Use "Simulate Typing" to see the typing indicator</li>
          <li>• <strong>Expected:</strong> Back button controls navigation between views</li>
        </ul>
      </div>
    </div>
  )
}

export const Default: Story = {
  args: {
    displayTitle: 'New Chat',
  },
}

export const BackPageMode: Story = {
  args: {
    threadMode: 'Back Page',
    displayTitle: 'Expense Agent',
    showThreads: true,
    onBackClick: () => console.log('Back clicked'),
  },
}

export const BackPageModeWithThreadsVisible: Story = {
  args: {
    threadMode: 'Back Page',
    displayTitle: 'Expense Agent',
    showThreads: true,
    onBackClick: () => console.log('Back clicked'),
  },
}

export const DropdownMode: Story = {
  args: {
    threadMode: 'Dropdown',
    displayTitle: 'Project Planning Discussion',
    showThreadDropdown: false,
    pinnedThreads,
    recentThreads,
    onThreadDropdownToggle: () => console.log('Dropdown toggled'),
    onThreadSelect: (threadName: string) => console.log('Thread selected:', threadName),
    onThreadSearchChange: (query: string) => console.log('Search query:', query),
  },
}

export const DropdownModeOpen: Story = {
  args: {
    threadMode: 'Dropdown',
    displayTitle: 'Project Planning Discussion',
    showThreadDropdown: true,
    threadSearchQuery: '',
    pinnedThreads,
    recentThreads,
    onThreadDropdownToggle: () => console.log('Dropdown toggled'),
    onThreadSelect: (threadName: string) => console.log('Thread selected:', threadName),
    onThreadSearchChange: (query: string) => console.log('Search query:', query),
  },
}

export const HistoryMode: Story = {
  args: {
    threadMode: 'History',
    displayTitle: 'Expense Agent',
    showThreadDropdown: false,
    pinnedThreads,
    recentThreads,
    selectedHistoryThread: 'Client dinner expense request',
    onThreadDropdownToggle: () => console.log('History dropdown toggled'),
    onHistoryThreadSelect: (threadName: string) => console.log('History thread selected:', threadName),
    onThreadSearchChange: (query: string) => console.log('Search query:', query),
  },
}

export const HistoryModeOpen: Story = {
  args: {
    threadMode: 'History',
    displayTitle: 'Expense Agent',
    showThreadDropdown: true,
    threadSearchQuery: '',
    pinnedThreads,
    recentThreads,
    selectedHistoryThread: 'Client dinner expense request',
    onThreadDropdownToggle: () => console.log('History dropdown toggled'),
    onHistoryThreadSelect: (threadName: string) => console.log('History thread selected:', threadName),
    onThreadSearchChange: (query: string) => console.log('Search query:', query),
  },
}

export const WithTypingIndicator: Story = {
  args: {
    threadMode: 'Back Page',
    displayTitle: 'Support Chat',
    isTyping: true,
    showThreads: false,
  },
}

export const WithPinnedThread: Story = {
  args: {
    threadMode: 'Back Page',
    displayTitle: 'Important Project Discussion',
    showThreads: false,
    isPinned: true,
    hasMessageBeenSent: true,
    onPinToggle: () => console.log('Pin toggled'),
  },
}

export const WithMinimizeMaximize: Story = {
  args: {
    threadMode: 'Back Page',
    displayTitle: 'Expandable Chat',
    showThreads: false,
    showMinimizeMaximize: true,
    isExpanded: false,
    onMinimizeMaximize: () => console.log('Minimize/Maximize clicked'),
  },
}

export const WithMinimizeMaximizeExpanded: Story = {
  args: {
    threadMode: 'Back Page',
    displayTitle: 'Expandable Chat',
    showThreads: false,
    showMinimizeMaximize: true,
    isExpanded: true,
    onMinimizeMaximize: () => console.log('Minimize/Maximize clicked'),
  },
}

export const NewChatPlusMode: Story = {
  args: {
    threadMode: 'Back Page',
    displayTitle: 'Chat Session',
    newChatMode: 'Plus',
    showThreads: false,
    hasMessageBeenSent: true,
    onNewChat: () => console.log('New chat clicked'),
  },
}

export const CompleteExample: Story = {
  args: {
    threadMode: 'Dropdown',
    displayTitle: 'Expense reimbursement request - Client dinner',
    showThreadDropdown: false,
    threadSearchQuery: '',
    isTyping: false,
    isPinned: false,
    isExpanded: false,
    showMinimizeMaximize: true,
    hasMessageBeenSent: true,
    pinnedThreads,
    recentThreads,
    selectedHistoryThread: '',
    onBackClick: () => console.log('Back clicked'),
    onNewChat: () => console.log('New chat clicked'),
    onClose: () => console.log('Close clicked'),
    onMinimizeMaximize: () => console.log('Minimize/Maximize clicked'),
    onThreadDropdownToggle: () => console.log('Dropdown toggled'),
    onThreadSearchChange: (query: string) => console.log('Search query:', query),
    onPinToggle: () => console.log('Pin toggled'),
    onThreadSelect: (threadName: string) => console.log('Thread selected:', threadName),
    onHistoryThreadSelect: (threadName: string) => console.log('History thread selected:', threadName),
  },
}

export const LongTitleTruncation: Story = {
  args: {
    threadMode: 'Back Page',
    displayTitle: 'This is a very long chat title that should be truncated when it exceeds the available space in the header component and demonstrates proper text overflow handling',
    showThreads: false,
    hasMessageBeenSent: true,
  },
}

export const Interactive: Story = {
  args: {
    threadMode: 'Dropdown',
    displayTitle: 'Interactive Header Test',
    showThreadDropdown: false,
    pinnedThreads: ['Test Pinned Thread'],
    recentThreads: ['Test Recent Thread'],
    hasMessageBeenSent: true,
    onBackClick: () => console.log('Back clicked'),
    onNewChat: () => console.log('New chat clicked'),
    onClose: () => console.log('Close clicked'),
    onThreadDropdownToggle: () => console.log('Dropdown toggled'),
    onThreadSelect: (threadName: string) => console.log('Thread selected:', threadName),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test that buttons are accessible
    const newChatButton = canvas.getByRole('button', { name: /new chat/i })
    const closeButton = canvas.getByRole('button', { name: /close/i })
    
    expect(newChatButton).toBeInTheDocument()
    expect(closeButton).toBeInTheDocument()
    
    // Test button interactions
    await userEvent.click(newChatButton)
    await userEvent.click(closeButton)
  },
}

// Responsive behavior demonstration
export const ResponsiveDemo: Story = {
  args: {
    threadMode: 'Dropdown',
    displayTitle: 'Responsive Header Demo - Resize viewport to test',
    showThreadDropdown: false,
    pinnedThreads,
    recentThreads,
    hasMessageBeenSent: true,
    showMinimizeMaximize: true,
    isPinned: true,
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
      },
    },
  },
}

// Example showing usage in a chat panel context
export const InChatPanelContext: Story = {
  args: {
    threadMode: 'Back Page',
    displayTitle: 'AI Assistant',
    showThreads: false,
    hasMessageBeenSent: true,
    isPinned: false,
  },
  render: (args) => (
    <div className="w-full max-w-md mx-auto border rounded-lg overflow-hidden bg-background">
      <ChatPanelHeader {...args} />
      <div className="p-4 bg-muted/30 min-h-[200px] flex items-center justify-center">
        <p className="text-sm text-muted-foreground text-center">
          Chat messages would appear here.<br />
          This demonstrates the header in a realistic chat panel context.
        </p>
      </div>
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 px-3 py-2 border rounded-md text-sm"
          />
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
            Send
          </button>
        </div>
      </div>
    </div>
  ),
}

// 🎮 INTERACTIVE PLAYGROUND - This is the main demo users can play with!
export const InteractivePlayground: Story = {
  render: () => <InteractiveDemo />,
  parameters: {
    docs: {
      description: {
        story: 'A fully interactive demo where you can experiment with all the ChatPanelHeader features and see how they work together in real-time.',
      },
    },
  },
}