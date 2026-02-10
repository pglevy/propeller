import { useState } from "react"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  type StoryMapReleaseProps,
  getStatusBadgeProps,
} from "./story-map-release-types"

export function StoryMapRelease({
  title = "Untitled Release",
  status,
  storyCount,
  onCheckReadiness,
  onEdit,
  onDelete,
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  children,
  className,
}: StoryMapReleaseProps) {
  const isControlled = controlledOpen !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = isControlled ? controlledOpen : internalOpen

  function handleOpenChange(nextOpen: boolean) {
    if (!isControlled) {
      setInternalOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }

  const badgeProps = getStatusBadgeProps(status)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <div data-slot="story-map-release" className={cn("bg-transparent", className)}>
        <div data-slot="release-header" className="flex items-center gap-3 px-4 py-2">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={isOpen ? "Collapse release" : "Expand release"}
            >
              <ChevronRight
                className={cn("size-4 transition-transform", isOpen && "rotate-90")}
              />
            </Button>
          </CollapsibleTrigger>

          <span data-slot="release-title" className="text-base font-semibold text-foreground">
            {title}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Release actions">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={onCheckReadiness}>Check Readiness</DropdownMenuItem>
              <DropdownMenuItem onSelect={onEdit}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onSelect={onDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Badge variant={badgeProps.variant}>{badgeProps.label}</Badge>

          <span data-slot="release-story-count" className="text-xs text-muted-foreground">
            {storyCount} {storyCount === 1 ? "story" : "stories"}
          </span>
        </div>

        <Separator />

        <CollapsibleContent>
          <div data-slot="release-columns" className="flex gap-3 py-4">
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
