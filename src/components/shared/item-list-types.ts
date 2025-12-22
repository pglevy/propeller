import type { LucideIcon } from "lucide-react"

/**
 * Object types supported by the canonical icon set.
 * Each type maps to a specific icon and Aurora color pairing.
 */
export type ObjectTypeKey =
  | "document"
  | "processModel"
  | "recordType"
  | "dataStore"
  | "interface"
  | "rule"
  | "expression"
  | "constant"

/**
 * Icon configuration with Aurora Design System color pairing.
 * Defines the brand identity for an object type.
 */
export interface IconConfig {
  icon: LucideIcon
  bg: string // Aurora color variable (e.g., "var(--aurora-green-1)")
  fg: string // Aurora color variable (e.g., "var(--aurora-green-4)")
}

/**
 * Individual item in the ItemList
 */
export interface ItemListItem {
  /** Unique identifier for the item */
  id: string

  /** Object type from the canonical icon set */
  objectType?: ObjectTypeKey

  /** Custom icon configuration (overrides objectType) */
  customIcon?: {
    icon: LucideIcon
    bg?: string // Aurora color variable or any CSS color
    fg?: string // Aurora color variable or any CSS color
  }

  /** Item title (can be text or React components) */
  title: React.ReactNode

  /** Subtitle or description (can include Badge, tags, etc.) */
  subtitle?: React.ReactNode

  /** Action elements (buttons, dropdowns, etc.) */
  actions?: React.ReactNode

  /** Content to show when item is expanded (requires collapsible=true on list) */
  collapsibleContent?: React.ReactNode

  /** Whether this item should be open by default */
  defaultOpen?: boolean
}

/**
 * Props for the ItemList component
 */
export interface ItemListProps {
  /** Items to display in the list */
  items: ItemListItem[]

  /** Whether items in this list can be collapsed */
  collapsible?: boolean

  /** Visual variant */
  variant?: "default" | "outline" | "muted"

  /** Size variant */
  size?: "default" | "sm"

  /** Additional CSS classes */
  className?: string
}
