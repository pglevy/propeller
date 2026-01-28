import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export interface ChatFeedbackProps {
  /**
   * Color scheme variant
   * - "subtle": Both thumbs use blue when selected
   * - "semantic": Thumbs up uses green, thumbs down uses red
   * @default "semantic"
   */
  variant?: "subtle" | "semantic"
  /**
   * Whether to show the "add details" action link after feedback is given
   * @default true
   */
  showDetailsOption?: boolean
  /**
   * Callback when feedback is submitted (with optional details)
   */
  onFeedbackSubmit?: (feedback: "up" | "down", details?: string) => void
}

export function ChatFeedback({
  variant = "semantic",
  showDetailsOption = true,
  onFeedbackSubmit
}: ChatFeedbackProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [feedbackDetails, setFeedbackDetails] = useState("")

  const handleFeedbackClick = (type: "up" | "down") => {
    const newFeedback = feedback === type ? null : type
    setFeedback(newFeedback)

    if (newFeedback && onFeedbackSubmit) {
      onFeedbackSubmit(newFeedback)
    }
  }

  const handleSubmitDetails = () => {
    if (feedback && onFeedbackSubmit) {
      onFeedbackSubmit(feedback, feedbackDetails)
    }
    setIsDialogOpen(false)
    setFeedbackDetails("")
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
    setFeedbackDetails("")
  }

  const dialogTitle = feedback === "up"
    ? "What was good about this response?"
    : "What was the issue with this response?"

  // Color classes based on variant
  const getButtonClasses = (type: "up" | "down", isSelected: boolean) => {
    if (!isSelected) {
      // Unselected: use muted foreground, let ghost variant handle hover
      return "text-muted-foreground"
    }

    if (variant === "subtle") {
      // Subtle: both use blue when selected
      return "bg-blue-1 text-blue-3 hover:bg-blue-1 hover:text-blue-3"
    }

    // Semantic: thumbs up = green, thumbs down = red
    if (type === "up") {
      return "bg-positive text-positive-foreground hover:bg-positive hover:text-positive-foreground"
    }
    return "bg-negative text-negative-foreground hover:bg-negative hover:text-negative-foreground"
  }

  return (
    <>
      <div className="flex items-center gap-1 bg-background">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => handleFeedbackClick("up")}
            aria-label="Helpful"
            className={getButtonClasses("up", feedback === "up")}
          >
            <ThumbsUp />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => handleFeedbackClick("down")}
            aria-label="Not helpful"
            className={getButtonClasses("down", feedback === "down")}
          >
            <ThumbsDown />
          </Button>
        </div>

        {feedback && showDetailsOption && (
          <Button
            variant="link"
            size="sm"
            onClick={() => setIsDialogOpen(true)}
            className="h-6 text-xs gap-1.5"
          >
            Add details
          </Button>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {dialogTitle}
            </p>
            <Textarea
              value={feedbackDetails}
              onChange={(e) => setFeedbackDetails(e.target.value)}
              placeholder="Enter your feedback..."
              className="min-h-32"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmitDetails}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
