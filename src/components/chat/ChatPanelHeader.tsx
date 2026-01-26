import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronDown, Search, CheckCircle, SquarePen, X, Pin, History } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export interface ChatThread {
  id: string
  name: string
  isPinned?: boolean
}

export type ThreadMode = 'Back Page' | 'Dropdown' | 'History'
export type NewChatMode = 'Edit' | 'Plus'

export interface ChatPanelHeaderProps {
  /**
   * Whether to show threads list (affects back button visibility)
   * When true: Shows full-page threads list, back button hidden
   * When false: Shows chat conversation, back button visible (in Back Page mode)
   */
  showThreads?: boolean
  /**
   * Thread interaction mode
   */
  threadMode?: ThreadMode
  /**
   * New chat button mode
   */
  newChatMode?: NewChatMode
  /**
   * Whether to show thread dropdown
   */
  showThreadDropdown?: boolean
  /**
   * Thread search query
   */
  threadSearchQuery?: string
  /**
   * Display title for the header
   */
  displayTitle?: string
  /**
   * Whether to show typing indicator
   */
  isTyping?: boolean
  /**
   * Whether thread is pinned
   */
  isPinned?: boolean
  /**
   * Whether chat is expanded
   */
  isExpanded?: boolean
  /**
   * Whether to show minimize/maximize button
   */
  showMinimizeMaximize?: boolean
  /**
   * Whether to hide back tooltip
   */
  hideBackTooltip?: boolean
  /**
   * Whether a message has been sent
   */
  hasMessageBeenSent?: boolean
  /**
   * Pinned threads for dropdown
   */
  pinnedThreads?: string[]
  /**
   * Recent threads for dropdown
   */
  recentThreads?: string[]
  /**
   * Selected history thread
   */
  selectedHistoryThread?: string
  /**
   * Back button click handler
   */
  onBackClick?: () => void
  /**
   * New chat handler
   */
  onNewChat?: () => void
  /**
   * Close handler
   */
  onClose?: () => void
  /**
   * Minimize/maximize handler
   */
  onMinimizeMaximize?: () => void
  /**
   * Thread mode change handler
   */
  onThreadModeChange?: (mode: ThreadMode) => void
  /**
   * Thread dropdown toggle handler
   */
  onThreadDropdownToggle?: () => void
  /**
   * Thread search change handler
   */
  onThreadSearchChange?: (query: string) => void
  /**
   * Pin toggle handler
   */
  onPinToggle?: () => void
  /**
   * Thread selection handler
   */
  onThreadSelect?: (threadName: string) => void
  /**
   * History thread selection handler
   */
  onHistoryThreadSelect?: (threadName: string) => void
  /**
   * Additional className for the root element
   */
  className?: string
}

export function ChatPanelHeader({
  showThreads = false,
  threadMode = 'Back Page',
  newChatMode = 'Edit',
  showThreadDropdown = false,
  threadSearchQuery = '',
  displayTitle = 'New Chat',
  isTyping = false,
  isPinned = false,
  isExpanded = false,
  showMinimizeMaximize = false,
  hideBackTooltip = false,
  hasMessageBeenSent = false,
  pinnedThreads = [],
  recentThreads = [],
  selectedHistoryThread = '',
  onBackClick,
  onNewChat,
  onClose,
  onMinimizeMaximize,
  onThreadDropdownToggle,
  onThreadSearchChange,
  onPinToggle,
  onThreadSelect,
  onHistoryThreadSelect,
  className,
}: ChatPanelHeaderProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayedTitle, setDisplayedTitle] = useState(displayTitle)

  // Handle title transitions
  useEffect(() => {
    if (displayTitle !== displayedTitle) {
      setIsTransitioning(true)
      setTimeout(() => {
        setDisplayedTitle(displayTitle)
        setTimeout(() => setIsTransitioning(false), 50)
      }, 100)
    }
  }, [displayTitle, displayedTitle])

  // Initialize displayed title
  useEffect(() => {
    if (!displayedTitle) {
      setDisplayedTitle(displayTitle)
    }
  }, [displayTitle, displayedTitle])

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (threadMode !== 'History') {
          onThreadDropdownToggle?.()
        }
      }
    }

    if (showThreadDropdown && threadMode !== 'History') {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showThreadDropdown, onThreadDropdownToggle, threadMode])

  // Filter threads based on search
  const filteredPinnedThreads = pinnedThreads.filter(name => 
    name.toLowerCase().includes(threadSearchQuery.toLowerCase())
  )

  const filteredRecentThreads = recentThreads.filter(name => 
    name.toLowerCase().includes(threadSearchQuery.toLowerCase())
  )

  const TypingAnimation = () => (
    <span className="inline-flex items-center gap-1">
      <span className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
      <span className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
      <span className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
    </span>
  )

  return (
    <div
      data-slot="chat-panel-header"
      className={cn(
        "h-14 bg-background border-b flex items-center justify-between px-6 shrink-0 gap-4",
        className
      )}
    >
      {/* Left Section */}
      <div className="flex items-center flex-1 min-w-0">
        {/* Back Button */}
        {threadMode === 'Back Page' && (
          <div className={cn(
            "transition-all duration-300 ease-in-out flex items-center",
            !showThreads ? "opacity-100 scale-100 mr-1" : "opacity-0 scale-95 w-0 overflow-hidden"
          )}>
            <div className="relative flex items-center">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onBackClick}
                className="text-muted-foreground hover:text-foreground"
                onMouseEnter={() => setHoveredTooltip('back')}
                onMouseLeave={() => setHoveredTooltip(null)}
              >
                <ArrowLeft className="size-4" />
              </Button>
              {hoveredTooltip === 'back' && !hideBackTooltip && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border shadow-md whitespace-nowrap z-50">
                  Back to Threads
                </div>
              )}
            </div>
          </div>
        )}

        {/* Title Section */}
        {threadMode === 'Dropdown' || threadMode === 'History' ? (
          <div className="relative dropdown-container flex-1 min-w-0" ref={dropdownRef}>
            {threadMode === 'History' ? (
              <span className="font-semibold text-sm text-foreground flex items-center gap-1 max-w-full">
                <span className={cn(
                  "truncate transition-opacity duration-150",
                  isTransitioning ? "opacity-0" : "opacity-100"
                )}>
                  {displayedTitle}
                </span>
              </span>
            ) : (
              <Button
                variant="ghost"
                onClick={onThreadDropdownToggle}
                className="font-semibold text-sm text-foreground hover:bg-accent px-2 py-1 h-auto flex items-center gap-1 max-w-full justify-start"
              >
                <span className={cn(
                  "truncate transition-opacity duration-150",
                  isTransitioning ? "opacity-0" : "opacity-100"
                )}>
                  {displayedTitle}
                </span>
                <ChevronDown className="size-3 shrink-0" />
              </Button>
            )}

            {/* Thread Dropdown */}
            {showThreadDropdown && threadMode !== 'History' && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-popover border rounded-md shadow-lg z-50 h-[32rem] overflow-hidden">
                <div className="p-2 border-b">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-3" />
                    <input
                      type="text"
                      placeholder="Search threads"
                      value={threadSearchQuery}
                      onChange={(e) => onThreadSearchChange?.(e.target.value)}
                      className="w-full pl-6 pr-2 py-1 text-xs border rounded focus:outline-none focus:border-primary bg-background"
                    />
                  </div>
                </div>
                <div className="h-[28rem] overflow-y-scroll">
                  {filteredPinnedThreads.length > 0 && (
                    <>
                      <div className="px-4 py-2 text-xs font-bold text-muted-foreground uppercase">
                        Pinned
                      </div>
                      {filteredPinnedThreads.map((threadName, index) => (
                        <button
                          key={`pinned-${index}`}
                          onClick={() => onThreadSelect?.(threadName)}
                          className="w-full pl-4 pr-4 py-2 text-left text-xs text-foreground hover:bg-accent truncate flex items-center justify-between"
                        >
                          <span className={cn(
                            "truncate",
                            displayTitle === threadName && "font-bold"
                          )}>
                            {threadName}
                          </span>
                          <div className="w-3 flex justify-center shrink-0">
                            {displayTitle === threadName && (
                              <CheckCircle className="size-3 text-primary" />
                            )}
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                  
                  <div className="px-4 py-2 text-xs font-bold text-muted-foreground uppercase border-t">
                    Recent
                  </div>
                  {filteredRecentThreads.map((threadName, index) => (
                    <button
                      key={`recent-${index}`}
                      onClick={() => onThreadSelect?.(threadName)}
                      className="w-full pl-4 pr-4 py-2 text-left text-xs text-foreground hover:bg-accent truncate flex items-center justify-between"
                    >
                      <span className={cn(
                        "truncate",
                        displayTitle === threadName && "font-bold"
                      )}>
                        {threadName}
                      </span>
                      <div className="w-3 flex justify-center shrink-0">
                        {displayTitle === threadName && (
                          <CheckCircle className="size-3 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                  
                  {filteredPinnedThreads.length === 0 && filteredRecentThreads.length === 0 && threadSearchQuery && (
                    <div className="px-4 py-2 text-xs text-muted-foreground text-center">
                      No threads found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <span className="font-semibold text-sm text-foreground transition-all duration-300 ease-in-out flex items-center gap-2 min-w-0">
            <span className={cn(
              "truncate transition-opacity duration-150",
              isTransitioning ? "opacity-0" : "opacity-100"
            )}>
              {displayedTitle}
            </span>
            {isTyping && (
              <span className="shrink-0">
                <TypingAnimation />
              </span>
            )}
          </span>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center shrink-0">
        {/* New Chat Button */}
        <div className={cn(
          "relative flex items-center transition-all duration-300 ease-in-out",
          showThreads || hasMessageBeenSent
            ? "opacity-100"
            : "opacity-50 pointer-events-none"
        )}>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onNewChat}
            className="text-muted-foreground hover:text-foreground transition-all duration-300 ease-out"
            onMouseEnter={() => setHoveredTooltip('newchat')}
            onMouseLeave={() => setHoveredTooltip(null)}
          >
            {newChatMode === 'Plus' ? (
              <div className="size-4 rounded-full border-2 border-current flex items-center justify-center">
                <div className="size-2 bg-current rounded-full"></div>
              </div>
            ) : (
              <SquarePen className="size-4" />
            )}
          </Button>
          {hoveredTooltip === 'newchat' && (showThreads || hasMessageBeenSent) && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border shadow-md whitespace-nowrap z-50">
              New Chat
            </div>
          )}
        </div>

        {/* Pin Button */}
        <div className={cn(
          "rounded transition-all duration-300 ease-in-out overflow-hidden flex items-center",
          !showThreads && (displayTitle !== 'New Chat' && displayTitle !== 'Expense Agent')
            ? "p-1 w-6 opacity-100 ml-2" 
            : "p-0 w-0 opacity-0 pointer-events-none ml-0",
          isPinned 
            ? "bg-primary/10 text-primary hover:bg-primary/20" 
            : "hover:bg-accent text-muted-foreground hover:text-foreground"
        )}>
          <div className="relative flex items-center justify-center w-full h-full">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onPinToggle}
              className="p-0 h-auto w-auto"
              onMouseEnter={() => setHoveredTooltip('pin')}
              onMouseLeave={() => setHoveredTooltip(null)}
            >
              <Pin className="size-4" />
            </Button>
            {hoveredTooltip === 'pin' && !showThreads && (displayTitle !== 'New Chat' && displayTitle !== 'Expense Agent') && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border shadow-md whitespace-nowrap z-50">
                Pin Thread
              </div>
            )}
          </div>
        </div>

        {/* Minimize/Maximize Button */}
        {showMinimizeMaximize && (
          <div className="relative flex items-center">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onMinimizeMaximize}
              className="text-muted-foreground hover:text-foreground ml-2"
              onMouseEnter={() => setHoveredTooltip('minimize-maximize')}
              onMouseLeave={() => setHoveredTooltip(null)}
            >
              {isExpanded ? (
                <div className="size-4 border border-current rounded-sm flex items-center justify-center">
                  <div className="size-2 border border-current"></div>
                </div>
              ) : (
                <div className="size-4 border border-current rounded-sm"></div>
              )}
            </Button>
            {hoveredTooltip === 'minimize-maximize' && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border shadow-md whitespace-nowrap z-50">
                {isExpanded ? 'Minimize' : 'Maximize'}
              </div>
            )}
          </div>
        )}

        {/* History Button */}
        {threadMode === 'History' && (
          <div className="relative flex items-center">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onThreadDropdownToggle}
              className="text-muted-foreground hover:text-foreground ml-2"
              onMouseEnter={() => setHoveredTooltip('history')}
              onMouseLeave={() => setHoveredTooltip(null)}
            >
              <History className="size-4" />
            </Button>
            {hoveredTooltip === 'history' && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border shadow-md whitespace-nowrap z-50">
                Thread History
              </div>
            )}
            {showThreadDropdown && (
              <div className="absolute top-full right-0 mt-1 w-64 bg-popover border rounded-md shadow-lg z-50 h-[32rem] overflow-hidden">
                <div className="p-2 border-b">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-3" />
                    <input
                      type="text"
                      placeholder="Search threads"
                      value={threadSearchQuery}
                      onChange={(e) => onThreadSearchChange?.(e.target.value)}
                      className="w-full pl-6 pr-2 py-1 text-xs border rounded focus:outline-none focus:border-primary bg-background"
                    />
                  </div>
                </div>
                <div className="h-[28rem] overflow-y-scroll">
                  {filteredPinnedThreads.length > 0 && (
                    <>
                      <div className="px-4 py-2 text-xs font-bold text-muted-foreground uppercase">
                        Pinned
                      </div>
                      {filteredPinnedThreads.map((threadName, index) => (
                        <button
                          key={`pinned-${index}`}
                          onClick={() => {
                            onHistoryThreadSelect?.(threadName)
                            onThreadDropdownToggle?.()
                          }}
                          className="w-full pl-4 pr-4 py-2 text-left text-xs text-foreground hover:bg-accent truncate flex items-center justify-between"
                        >
                          <span className={cn(
                            "truncate",
                            selectedHistoryThread === threadName && "font-bold"
                          )}>
                            {threadName}
                          </span>
                          <div className="w-3 flex justify-center shrink-0">
                            {selectedHistoryThread === threadName && (
                              <CheckCircle className="size-3 text-primary" />
                            )}
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                  
                  <div className={cn(
                    "px-4 py-2 text-xs font-bold text-muted-foreground uppercase",
                    filteredPinnedThreads.length > 0 && "border-t"
                  )}>
                    Recent
                  </div>
                  {filteredRecentThreads.map((threadName, index) => (
                    <button
                      key={`recent-${index}`}
                      onClick={() => {
                        onHistoryThreadSelect?.(threadName)
                        onThreadDropdownToggle?.()
                      }}
                      className="w-full pl-4 pr-4 py-2 text-left text-xs text-foreground hover:bg-accent truncate flex items-center justify-between"
                    >
                      <span className={cn(
                        "truncate",
                        selectedHistoryThread === threadName && "font-bold"
                      )}>
                        {threadName}
                      </span>
                      <div className="w-3 flex justify-center shrink-0">
                        {selectedHistoryThread === threadName && (
                          <CheckCircle className="size-3 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                  
                  {filteredPinnedThreads.length === 0 && filteredRecentThreads.length === 0 && threadSearchQuery && (
                    <div className="px-4 py-2 text-xs text-muted-foreground text-center">
                      No threads found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Close Button */}
        <div className="relative flex items-center">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground ml-2"
            onMouseEnter={() => setHoveredTooltip('close')}
            onMouseLeave={() => setHoveredTooltip(null)}
          >
            <X className="size-4" />
          </Button>
          {hoveredTooltip === 'close' && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border shadow-md whitespace-nowrap z-50">
              Close
            </div>
          )}
        </div>
      </div>
    </div>
  )
}