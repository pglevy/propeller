import * as React from "react"
import { ChevronDown } from "lucide-react"
import {
  ItemGroup,
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemSeparator,
} from "@/components/ui/item"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getItemIcon } from "./item-list-icons"
import type { ItemListProps } from "./item-list-types"

/**
 * ItemList Component
 *
 * A centralized, reusable list component for displaying objects with icons,
 * titles, subtitles, and actions. Establishes the canonical icon set using
 * Aurora Design System color pairings for product-wide brand consistency.
 *
 * @example
 * // Basic list with canonical object types
 * <ItemList
 *   items={[
 *     {
 *       id: "1",
 *       objectType: "document",
 *       title: "User Manual",
 *       subtitle: "Updated 2 hours ago"
 *     }
 *   ]}
 * />
 *
 * @example
 * // Collapsible list with badges and actions
 * <ItemList
 *   collapsible
 *   items={[
 *     {
 *       id: "1",
 *       objectType: "recordType",
 *       title: "Loan Application",
 *       subtitle: <Badge>In Progress</Badge>,
 *       actions: <Button>Start</Button>,
 *       collapsibleContent: <div>Details here...</div>
 *     }
 *   ]}
 * />
 */
export function ItemList({
  items,
  collapsible = false,
  variant = "default",
  size = "default",
  className,
}: ItemListProps) {
  // Track which items are open (for collapsible mode)
  const [openItems, setOpenItems] = React.useState<Set<string>>(
    new Set(items.filter((item) => item.defaultOpen).map((item) => item.id))
  )

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  // Render individual items
  const renderedItems = items.map((item, index) => {
    const hasCollapsibleContent = Boolean(item.collapsibleContent)
    const isOpen = openItems.has(item.id)
    const isLastItem = index === items.length - 1

    // Determine icon and color configuration
    const iconConfig = item.customIcon
      ? item.customIcon
      : item.objectType
      ? getItemIcon(item.objectType)
      : null

    const Icon = iconConfig?.icon
    const iconBg = iconConfig?.bg || "transparent"
    const iconFg = iconConfig?.fg || "currentColor"

    // Build the item content
    const itemContent = (
      <>
        {/* Collapsible chevron button (only if list is collapsible and item has content) */}
        {collapsible && hasCollapsibleContent && (
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="shrink-0"
              aria-label={isOpen ? "Collapse item" : "Expand item"}
            >
              <ChevronDown
                className={cn(
                  "size-4 text-muted-foreground transition-transform",
                  isOpen ? "rotate-0" : "-rotate-90"
                )}
              />
            </Button>
          </CollapsibleTrigger>
        )}

        {/* Icon with Aurora color pairing */}
        {Icon && (
          <div
            className="size-8 rounded-sm flex items-center justify-center shrink-0"
            style={{
              backgroundColor: iconBg,
              color: iconFg,
            }}
          >
            <Icon className="size-4" />
          </div>
        )}

        {/* Content */}
        <ItemContent>
          {/* Title */}
          {typeof item.title === "string" ? (
            <ItemTitle>{item.title}</ItemTitle>
          ) : (
            <div className="flex items-center gap-2 text-sm leading-snug font-medium">
              {item.title}
            </div>
          )}

          {/* Subtitle */}
          {item.subtitle &&
            (typeof item.subtitle === "string" ? (
              <ItemDescription>{item.subtitle}</ItemDescription>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background">
                {item.subtitle}
              </div>
            ))}
        </ItemContent>

        {/* Actions */}
        {item.actions && <ItemActions>{item.actions}</ItemActions>}
      </>
    )

    // Build the item element
    let itemElement: React.ReactNode

    // If item has collapsible content and list is collapsible, wrap in Collapsible
    if (hasCollapsibleContent && collapsible) {
      itemElement = (
        <Collapsible
          key={item.id}
          open={isOpen}
          onOpenChange={() => toggleItem(item.id)}
        >
          <Item variant="default" size={size} className="bg-background">
            {itemContent}
          </Item>

          <CollapsibleContent>
            <div className="pl-14 pr-4 pb-4 bg-background">
              {item.collapsibleContent}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    } else {
      // Regular item without collapse
      itemElement = (
        <Item
          key={item.id}
          variant="default"
          size={size}
          className="bg-background"
        >
          {itemContent}
        </Item>
      )
    }

    // Add separator after each item except the last (for default variant)
    if (variant === "default" && !isLastItem) {
      return (
        <React.Fragment key={item.id}>
          {itemElement}
          <ItemSeparator />
        </React.Fragment>
      )
    }

    return itemElement
  })

  // Wrap in appropriate container based on variant
  if (variant === "default") {
    // Default: border around entire list with separators between items
    return (
      <div className={cn("border rounded-md overflow-hidden bg-background", className)}>
        <ItemGroup className="bg-background">{renderedItems}</ItemGroup>
      </div>
    )
  }

  if (variant === "outline") {
    // Outline: individual items with borders and spacing between them
    return (
      <ItemGroup className={cn("bg-background gap-2", className)}>
        {items.map((item) => {
          const hasCollapsibleContent = Boolean(item.collapsibleContent)
          const isOpen = openItems.has(item.id)

          // Determine icon and color configuration
          const iconConfig = item.customIcon
            ? item.customIcon
            : item.objectType
            ? getItemIcon(item.objectType)
            : null

          const Icon = iconConfig?.icon
          const iconBg = iconConfig?.bg || "transparent"
          const iconFg = iconConfig?.fg || "currentColor"

          // Build the item content
          const itemContent = (
            <>
              {/* Collapsible chevron button */}
              {collapsible && hasCollapsibleContent && (
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="shrink-0"
                    aria-label={isOpen ? "Collapse item" : "Expand item"}
                  >
                    <ChevronDown
                      className={cn(
                        "size-4 text-muted-foreground transition-transform",
                        isOpen ? "rotate-0" : "-rotate-90"
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
              )}

              {/* Icon */}
              {Icon && (
                <div
                  className="size-8 rounded-sm flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: iconBg,
                    color: iconFg,
                  }}
                >
                  <Icon className="size-4" />
                </div>
              )}

              {/* Content */}
              <ItemContent>
                {typeof item.title === "string" ? (
                  <ItemTitle>{item.title}</ItemTitle>
                ) : (
                  <div className="flex items-center gap-2 text-sm leading-snug font-medium">
                    {item.title}
                  </div>
                )}

                {item.subtitle &&
                  (typeof item.subtitle === "string" ? (
                    <ItemDescription>{item.subtitle}</ItemDescription>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background">
                      {item.subtitle}
                    </div>
                  ))}
              </ItemContent>

              {/* Actions */}
              {item.actions && <ItemActions>{item.actions}</ItemActions>}
            </>
          )

          // If item has collapsible content, wrap in Collapsible
          if (hasCollapsibleContent && collapsible) {
            return (
              <Collapsible
                key={item.id}
                open={isOpen}
                onOpenChange={() => toggleItem(item.id)}
              >
                <Item variant="outline" size={size} className="bg-background">
                  {itemContent}
                </Item>

                <CollapsibleContent>
                  <div className="pl-14 pr-4 pb-4 bg-background">
                    {item.collapsibleContent}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          }

          // Regular item
          return (
            <Item
              key={item.id}
              variant="outline"
              size={size}
              className="bg-background"
            >
              {itemContent}
            </Item>
          )
        })}
      </ItemGroup>
    )
  }

  // Muted variant (simple ItemGroup)
  return (
    <ItemGroup className={cn("bg-background", className)}>
      {renderedItems}
    </ItemGroup>
  )
}
