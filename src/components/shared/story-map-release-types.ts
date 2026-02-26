import type { ReactNode } from "react"

/**
 * Current state of a release in the story map.
 */
export type ReleaseStatus =
  | "not started"
  | "checking readiness"
  | "ready for build"
  | "building"

/**
 * Props for the StoryMapRelease component.
 */
export interface StoryMapReleaseProps {
  /** Release title. Defaults to "Untitled Release". */
  title?: string
  /** Current release status displayed as a badge. */
  status: ReleaseStatus
  /** Total number of stories across all activity columns. */
  storyCount: number
  /** Called when "Check Readiness" is selected from the menu. */
  onCheckReadiness?: () => void
  /** Called when "Edit" is selected from the menu. */
  onEdit?: () => void
  /** Called when "Delete" is selected from the menu. */
  onDelete?: () => void
  /** Whether the content area is expanded. Uncontrolled by default (starts expanded). */
  defaultOpen?: boolean
  /** Controlled open state. */
  open?: boolean
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void
  /** Activity columns content (consumer-provided). */
  children?: ReactNode
  /** Style overrides for the root element. */
  className?: string
}

/**
 * Returns the badge variant and display label for a given release status.
 */
export function getStatusBadgeProps(status: ReleaseStatus): {
  variant: "default" | "secondary" | "outline"
  label: string
} {
  switch (status) {
    case "not started":
      return { variant: "secondary", label: "Not Started" }
    case "checking readiness":
      return { variant: "outline", label: "Checking Readiness" }
    case "ready for build":
      return { variant: "default", label: "Ready for Build" }
    case "building":
      return { variant: "default", label: "Building" }
  }
}
