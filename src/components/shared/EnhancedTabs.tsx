"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Types
type TabsVariant = "primary" | "secondary"

interface TabsContextValue {
  variant: TabsVariant
}

interface EnhancedTabsProps
  extends React.ComponentProps<typeof TabsPrimitive.Root> {
  variant?: TabsVariant
  className?: string
}

interface EnhancedTabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List> {
  className?: string
}

interface EnhancedTabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  className?: string
}

interface TabIconProps {
  icon: React.ComponentType<{ className?: string }>
  className?: string
}

interface TabCountProps {
  count: number | string
  className?: string
}

// Context
const TabsContext = React.createContext<TabsContextValue>({
  variant: "primary",
})

// Variants
const enhancedTabsTriggerVariants = cva(
  "inline-flex items-center justify-center gap-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:cursor-pointer",
  {
    variants: {
      variant: {
        primary: cn(
          "px-5 py-2 border-b-2 border-transparent text-muted-foreground bg-background",
          "data-[state=active]:border-primary data-[state=active]:text-foreground",
          "hover:text-foreground",
          "transition-[border-color,color] duration-200"
        ),
        secondary: cn(
          "px-5 py-2 text-muted-foreground bg-transparent rounded-full",
          "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:bg-primary",
          "data-[state=active]:[&_[data-slot=tab-count]]:bg-primary-foreground/20 data-[state=active]:[&_[data-slot=tab-count]]:text-primary-foreground",
          "hover:bg-primary/10 hover:text-foreground",
          "transition-[background-color,color] duration-200"
        ),
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

// Components
function EnhancedTabs({
  variant = "primary",
  className,
  children,
  ...props
}: EnhancedTabsProps) {
  return (
    <TabsContext.Provider value={{ variant }}>
      <TabsPrimitive.Root
        data-slot="enhanced-tabs"
        data-variant={variant}
        className={cn("flex flex-col gap-2 bg-background", className)}
        {...props}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsContext.Provider>
  )
}

function EnhancedTabsList({
  className,
  children,
  ...props
}: EnhancedTabsListProps) {
  const { variant } = React.useContext(TabsContext)

  return (
    <TabsPrimitive.List
      data-slot="enhanced-tabs-list"
      data-variant={variant}
      className={cn(
        "inline-flex h-auto w-fit items-center justify-center bg-background",
        variant === "primary" && "border-b border-border gap-0 px-2 py-0",
        variant === "secondary" && "gap-1 p-1 rounded-full bg-muted/40",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  )
}

function EnhancedTabsTrigger({
  className,
  children,
  ...props
}: EnhancedTabsTriggerProps) {
  const { variant } = React.useContext(TabsContext)

  return (
    <TabsPrimitive.Trigger
      data-slot="enhanced-tabs-trigger"
      data-variant={variant}
      className={cn(
        enhancedTabsTriggerVariants({ variant }),
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
}

function TabIcon({ icon: Icon, className }: TabIconProps) {
  return (
    <Icon
      data-slot="tab-icon"
      aria-hidden="true"
      className={cn("shrink-0 size-4", className)}
    />
  )
}

function TabCount({
  count,
  className,
}: TabCountProps) {
  return (
    <span
      data-slot="tab-count"
      aria-label={`${count} items`}
      className={cn(
        "shrink-0 text-xs font-medium tabular-nums",
        "text-muted-foreground bg-muted/80",
        "px-1.5 py-0.5 rounded-sm",
        "min-w-6 text-center",
        className
      )}
    >
      {count}
    </span>
  )
}

// Re-export TabsContent from base
const TabsContent = TabsPrimitive.Content

export {
  EnhancedTabs,
  EnhancedTabsList,
  EnhancedTabsTrigger,
  TabIcon,
  TabCount,
  TabsContent,
}

export type {
  EnhancedTabsProps,
  EnhancedTabsListProps,
  EnhancedTabsTriggerProps,
  TabIconProps,
  TabCountProps,
}
