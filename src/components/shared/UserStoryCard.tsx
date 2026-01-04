import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreHorizontal, Brain } from "lucide-react"
import { ItemMedia } from "@/components/ui/item"
import { cn } from "@/lib/utils"

export interface UserStoryCardProps {
  storyId: string
  title: string
  status: string
  completedTasks: number
  totalTasks: number
  assignee?: {
    initials: string
  }
  category?: string
  onMenuClick?: () => void
  className?: string
}

export function UserStoryCard({
  storyId,
  title,
  status,
  completedTasks,
  totalTasks,
  assignee,
  category,
  onMenuClick,
  className,
}: UserStoryCardProps) {
  const progressValue = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <Card className={cn("w-full max-w-md gap-3 py-4 bg-card", className)}>
      <CardHeader className="items-center gap-0">
        <CardTitle className="text-sm font-normal text-muted-foreground bg-card row-span-2">
          {storyId}
        </CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onMenuClick}
            aria-label="Story options"
          >
            <MoreHorizontal />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4 bg-card">
        <div className="space-y-2">
          <a
            href="#"
            className="hover:border-b border-color-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded transition-all"
          >
            <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
          </a>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm bg-card">
            <span className="text-muted-foreground bg-card">{status}</span>
            <span className="text-muted-foreground bg-card">
              {completedTasks} of {totalTasks} tasks
            </span>
          </div>
          <Progress value={progressValue} aria-label={`${completedTasks} of ${totalTasks} tasks completed`} />
        </div>
      </CardContent>

      <CardFooter className="justify-between bg-card">
        <div className="flex items-center gap-2">
          <ItemMedia variant="icon">
            <Brain />
          </ItemMedia>
          {assignee && (
            <Avatar className="size-8">
              <AvatarFallback className="text-sm font-medium">
                {assignee.initials}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        {category && <Badge variant="secondary">{category}</Badge>}
      </CardFooter>
    </Card>
  )
}
