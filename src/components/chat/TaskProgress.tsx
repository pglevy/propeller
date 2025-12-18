import { useState } from "react"
import { ChevronDown, Square, SquareCheck, Check } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { ItemGroup, Item, ItemContent, ItemMedia } from "@/components/ui/item"
import { cn } from "@/lib/utils"

export interface Task {
  id: string
  label: string
  status: "completed" | "active" | "todo"
}

interface TaskProgressProps {
  title?: string
  tasks: Task[]
  defaultOpen?: boolean
}

export function TaskProgress({
  title = "Task Progress",
  tasks,
  defaultOpen = true,
}: TaskProgressProps) {
  const [open, setOpen] = useState(defaultOpen)

  const completedCount = tasks.filter((t) => t.status === "completed").length
  const totalCount = tasks.length
  const progressValue = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="border rounded-lg overflow-hidden">
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors">
            <ChevronDown
              className={cn(
                "size-5 text-muted-foreground transition-transform shrink-0",
                open && "transform rotate-0",
                !open && "transform -rotate-90"
              )}
            />
            <div className="flex items-center justify-between gap-4 flex-1 min-w-0">
              <h3 className="font-semibold text-sm shrink-0">{title}</h3>
              <div className="flex items-center gap-3 flex-1 min-w-0 max-w-1/3">
                <span className="text-sm shrink-0">
                  <span className="font-medium">{completedCount}</span> / {totalCount}
                </span>
                <Progress value={progressValue} className="flex-1" />
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t">
            <ItemGroup className="py-1">
              {tasks.map((task) => (
                <Item key={task.id} size="sm" className="border-0 py-1 px-4">
                  <ItemMedia variant="icon" className="bg-transparent border-0 gap-0 size-4">
                    {task.status === "completed" ? (
                      <Check className="size-4 text-muted-foreground" />
                    ) : (
                      <Square
                        className={cn(
                          "size-4",
                          task.status === "active" && "text-foreground",
                          task.status === "todo" && "text-muted-foreground"
                        )}
                      />
                    )}
                  </ItemMedia>
                  <ItemContent>
                    <span
                      className={cn(
                        "text-sm",
                        task.status === "completed" &&
                          "line-through text-muted-foreground",
                        task.status === "active" && "font-medium",
                        task.status === "todo" && "text-muted-foreground"
                      )}
                    >
                      {task.label}
                    </span>
                  </ItemContent>
                </Item>
              ))}
            </ItemGroup>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
