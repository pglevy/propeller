import { useState } from "react"
import { ChevronDown } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { getItemIcon } from "@/components/shared/item-list-icons"
import type { ObjectTypeKey } from "@/components/shared/item-list-types"

/** All available object types for the select dropdown */
const OBJECT_TYPE_OPTIONS: { value: ObjectTypeKey; label: string }[] = [
  { value: "recordType", label: "Record Type" },
  { value: "processModel", label: "Process Model" },
  { value: "interface", label: "Interface" },
  { value: "rule", label: "Rule" },
  { value: "expression", label: "Expression" },
  { value: "constant", label: "Constant" },
  { value: "document", label: "Document" },
  { value: "dataStore", label: "Data Store" },
  { value: "group", label: "Group" },
  { value: "site", label: "Site" },
]

/** Get the display label for an object type key */
function getObjectTypeLabel(objectType: ObjectTypeKey): string {
  return OBJECT_TYPE_OPTIONS.find((o) => o.value === objectType)?.label ?? objectType
}

export interface TaskPlanItem {
  id: string
  taskName: string
  objectType: ObjectTypeKey
  objectName: string
  notes: string
}

export interface TaskPlanProps {
  /** The list of task plan items */
  tasks: TaskPlanItem[]
  /** Whether the plan is in edit mode */
  editing?: boolean
  /** Callback when tasks are updated in edit mode */
  onTasksChange?: (tasks: TaskPlanItem[]) => void
  /** Additional CSS classes */
  className?: string
}

export function TaskPlan({
  tasks,
  editing = false,
  onTasksChange,
  className,
}: TaskPlanProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(tasks.map((t) => t.id))
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

  const updateTask = (id: string, updates: Partial<TaskPlanItem>) => {
    if (!onTasksChange) return
    onTasksChange(
      tasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
    )
  }

  return (
    <div className={cn("flex flex-col gap-2", className)} role="list">
      {tasks.map((task, index) => {
        const isOpen = openItems.has(task.id)
        const iconConfig = getItemIcon(task.objectType)
        const Icon = iconConfig.icon

        return (
          <Collapsible
            key={task.id}
            open={isOpen}
            onOpenChange={() => toggleItem(task.id)}
          >
            <div
              role="listitem"
              className="border rounded-lg overflow-hidden bg-background"
            >
              <CollapsibleTrigger 
                className="w-full"
                aria-label={`${isOpen ? 'Collapse' : 'Expand'} task ${index + 1}: ${task.taskName}`}
              >
                <div className="flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors">
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform shrink-0",
                      isOpen ? "rotate-0" : "-rotate-90"
                    )}
                    aria-hidden="true"
                  />
                  <div
                    className="size-7 rounded-sm flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: iconConfig.bg,
                      color: iconConfig.fg,
                    }}
                    aria-hidden="true"
                  >
                    <Icon className="size-3.5" />
                  </div>
                  <span className="text-sm font-medium text-left">
                    {index + 1}. {task.taskName}
                  </span>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="border-t px-4 pb-4 pt-3">
                  {editing ? (
                    <EditableTaskContent
                      task={task}
                      onUpdate={(updates) => updateTask(task.id, updates)}
                    />
                  ) : (
                    <ReadOnlyTaskContent task={task} />
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        )
      })}
    </div>
  )
}

function ReadOnlyTaskContent({ task }: { task: TaskPlanItem }) {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
          Object Type
        </span>
        <span className="text-foreground">{getObjectTypeLabel(task.objectType)}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
          Object Name
        </span>
        <span className="text-foreground font-mono text-xs">{task.objectName}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
          Implementation Notes
        </span>
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
          {task.notes}
        </p>
      </div>
    </div>
  )
}

function EditableTaskContent({
  task,
  onUpdate,
}: {
  task: TaskPlanItem
  onUpdate: (updates: Partial<TaskPlanItem>) => void
}) {
  const taskNameId = `task-name-${task.id}`
  const objectTypeId = `object-type-${task.id}`
  const objectNameId = `object-name-${task.id}`
  const notesId = `notes-${task.id}`

  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex flex-col gap-1.5">
        <label 
          htmlFor={taskNameId}
          className="text-muted-foreground text-xs font-medium uppercase tracking-wide"
        >
          Task Name
        </label>
        <Input
          id={taskNameId}
          value={task.taskName}
          onChange={(e) => onUpdate({ taskName: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label 
          htmlFor={objectTypeId}
          className="text-muted-foreground text-xs font-medium uppercase tracking-wide"
        >
          Object Type
        </label>
        <Select
          value={task.objectType}
          onValueChange={(value) => onUpdate({ objectType: value as ObjectTypeKey })}
        >
          <SelectTrigger id={objectTypeId} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {OBJECT_TYPE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label 
          htmlFor={objectNameId}
          className="text-muted-foreground text-xs font-medium uppercase tracking-wide"
        >
          Object Name
        </label>
        <Input
          id={objectNameId}
          value={task.objectName}
          onChange={(e) => onUpdate({ objectName: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label 
          htmlFor={notesId}
          className="text-muted-foreground text-xs font-medium uppercase tracking-wide"
        >
          Implementation Notes
        </label>
        <Textarea
          id={notesId}
          value={task.notes}
          onChange={(e) => onUpdate({ notes: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  )
}
