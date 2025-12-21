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

  return (
    <>
      <div className="flex items-center gap-1">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => handleFeedbackClick("up")}
            aria-label="Helpful"
            className={feedback === "up" ? "bg-positive hover:bg-positive dark:hover:bg-positive" : "text-muted-foreground"}
          >
            <ThumbsUp />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => handleFeedbackClick("down")}
            aria-label="Not helpful"
            className={feedback === "down" ? "bg-negative hover:bg-negative dark:hover:bg-negative" : "text-muted-foreground"}
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
