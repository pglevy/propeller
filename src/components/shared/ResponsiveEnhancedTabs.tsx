"use client"

import * as React from "react"

import {
  EnhancedTabs,
  type EnhancedTabsProps,
} from "./EnhancedTabs"

interface ResponsiveEnhancedTabsProps
  extends Omit<EnhancedTabsProps, "showLabels"> {
  /**
   * Width threshold (in pixels) below which labels will be hidden
   * showing only icons. Default: 480px
   */
  iconOnlyThreshold?: number
  /**
   * Children should include EnhancedTabsList with TabIcon elements for responsive behavior
   */
  children: React.ReactNode
}

/**
 * Responsive wrapper for EnhancedTabs that automatically switches to icon-only
 * mode when the container becomes too narrow.
 *
 * Works best when:
 * - You have 4-5 tabs with icons
 * - Labels are wrapped in TabLabel components
 * - You want to gracefully handle smaller screens without overflow
 *
 * Usage:
 * ResponsiveEnhancedTabs automatically detects container width and hides
 * labels when space becomes tight. Pass TabLabel-wrapped text in your triggers.
 */
function ResponsiveEnhancedTabs({
  variant = "primary",
  iconOnlyThreshold = 480,
  className,
  children,
  ...props
}: ResponsiveEnhancedTabsProps) {
  const [showLabels, setShowLabels] = React.useState(true)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Initial check
    const checkSize = () => {
      const width = container.offsetWidth
      setShowLabels(width >= iconOnlyThreshold)
    }

    checkSize()

    // ResizeObserver for container changes
    const observer = new ResizeObserver(checkSize)
    observer.observe(container)

    return () => observer.disconnect()
  }, [iconOnlyThreshold])

  return (
    <div ref={containerRef}>
      <EnhancedTabs
        variant={variant}
        showLabels={showLabels}
        className={className}
        {...props}
      >
        {children}
      </EnhancedTabs>
    </div>
  )
}

export { ResponsiveEnhancedTabs }
export type { ResponsiveEnhancedTabsProps }
