import { CheckCircle, Circle, FileText, Database, Plus, LoaderCircle, Split, RotateCcw } from "lucide-react"
import {
  ItemGroup,
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const iconMap = {
  circle: Circle,
  file: FileText,
  database: Database,
  plus: Plus,
  loaderCircle: LoaderCircle,
  split: Split,
  rotateCcw: RotateCcw,
} as const

export interface AgentStep {
  id: string
  icon?: keyof typeof iconMap
  title: string
  subtitle?: string
  preview?: {
    type: "code"
    content: string
  }
  actions?: {
    label: string
    icon?: keyof typeof iconMap
    variant?: "default" | "ghost" | "link"
    onClick?: () => void
  }[]
  status: "completed" | "active" | "pending"
}

interface AgentStepsProps {
  steps: AgentStep[]
  className?: string
}

export function AgentSteps({ steps, className }: AgentStepsProps) {
  return (
    <div className={cn("relative", className)}>
      <ItemGroup>
        {steps.map((step, index) => (
          <Item
            key={step.id}
            size="sm"
            className={cn(
              "border-0 px-0 relative items-start gap-3 py-0",
              index === 0 && "pt-0",
              index < steps.length - 1 && "before:content-[''] before:absolute before:left-1.75 before:top-5 before:bottom-0 before:w-0.5 before:bg-border"
            )}
          >
            <ItemMedia variant="icon" className="bg-white border-0 gap-0 size-4 mt-0.5">
              {step.status === "completed" ? (
                <CheckCircle className="size-4 text-primary" />
              ) : step.icon ? (
                (() => {
                  const IconComponent = iconMap[step.icon]
                  return (
                    <IconComponent
                      className={cn(
                        "size-4",
                        step.status === "active" && "text-muted-foreground",
                        step.status === "pending" && "text-muted-foreground"
                      )}
                    />
                  )
                })()
              ) : (
                <Circle
                  className="size-4 text-muted-foreground"
                />
              )}
            </ItemMedia>

            <ItemContent className="gap-1 flex-1 mb-6">
              <div className="flex items-start justify-between gap-2">
                <ItemTitle>
                  {step.title}
                </ItemTitle>

                {step.actions && step.actions.length > 0 && (
                  <ItemActions className="-mt-1">
                    {step.actions.map((action, idx) => {
                      const ActionIcon = action.icon ? iconMap[action.icon] : null
                      return (
                        <Button
                          key={idx}
                          variant={action.variant || "ghost"}
                          size="sm"
                          onClick={action.onClick}
                          className="h-6 text-xs gap-1.5"
                        >
                          {ActionIcon && <ActionIcon className="size-3" />}
                          {action.label}
                        </Button>
                      )
                    })}
                  </ItemActions>
                )}
              </div>

              {step.subtitle && (
                <ItemDescription className="line-clamp-none">
                  {step.subtitle}
                </ItemDescription>
              )}

              {step.preview && step.preview.type === "code" && (
                <AgentStepPreview content={step.preview.content} />
              )}
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}

interface AgentStepPreviewProps {
  content: string
}

function AgentStepPreview({ content }: AgentStepPreviewProps) {
  return (
    <div className="mt-1 rounded-md border bg-muted/30 p-3 font-mono text-xs leading-relaxed">
      <pre className="overflow-x-auto whitespace-pre-wrap break-all">
        {content}
      </pre>
    </div>
  )
}
