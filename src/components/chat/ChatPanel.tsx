import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

export interface ChatPanelHeaderAction {
  icon: ReactNode
  label: string
  onClick?: () => void
}

export interface ChatPanelProps {
  /**
   * Title displayed in the header
   */
  title?: string
  /**
   * Action buttons displayed in the header
   */
  headerActions?: ChatPanelHeaderAction[]
  /**
   * Content to display in the scrollable area
   */
  children: ReactNode
  /**
   * Content to display in the footer (typically ChatInput)
   */
  footer?: ReactNode
  /**
   * Additional className for the root element
   */
  className?: string
  /**
   * Height of the panel (defaults to full viewport height)
   */
  height?: string
}

export function ChatPanel({
  title,
  headerActions,
  children,
  footer,
  className,
  height = "100vh",
}: ChatPanelProps) {
  return (
    <div
      className={cn("flex flex-col bg-background", className)}
      style={{ height }}
    >
      {/* Header */}
      {(title || headerActions) && (
        <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
          {title && (
            <h2 className="text-lg font-semibold">{title}</h2>
          )}
          {headerActions && headerActions.length > 0 && (
            <div className="flex items-center gap-1" role="group" aria-label="Header actions">
              {headerActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon-sm"
                  onClick={action.onClick}
                  aria-label={action.label}
                >
                  {action.icon}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content Area */}
      <div
        className="flex-1 overflow-y-auto"
        tabIndex={0}
        role="region"
        aria-label="Chat messages"
      >
        <div className="px-4 py-4">
          {children}
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-4 py-3 border-t shrink-0">
          {footer}
        </div>
      )}
    </div>
  )
}
