import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export interface FeedbackOption {
  id: string
  label: string
}

export interface FeedbackOptions {
  /** 
   * Checkbox options shown when thumbs up is selected.
   * Focus on what made the experience positive (e.g., accuracy, helpfulness, clarity).
   */
  positive?: FeedbackOption[]
  /** 
   * Checkbox options shown when thumbs down is selected.
   * Focus on what went wrong or could be improved (e.g., incorrect info, unclear, incomplete).
   */
  negative?: FeedbackOption[]
}

export interface FeedbackDetails {
  /** The user's thumbs up or down selection */
  feedback: "up" | "down"
  /** Optional free-form text feedback provided by the user */
  comment?: string
  /** Array of selected checkbox option IDs (only present if checkboxes were shown and selected) */
  selectedOptions?: string[]
}

export interface ChatFeedbackProps {
  /**
   * Color scheme variant
   * - "default": Blue icon when selected, no background
   * - "agent-evaluation": Thumbs up uses green, thumbs down uses red with backgrounds
   * @default "default"
   */
  variant?: "default" | "agent-evaluation"
  /**
   * Whether clicking thumbs up/down should open a dialog for detailed feedback
   * 
   * Enable this when you want to collect rich feedback with categorization and comments.
   * Disable for quick, low-friction feedback where users just need to indicate satisfaction
   * without providing details (e.g., rating individual messages in a chat).
   * 
   * @default true
   */
  showDetailsDialog?: boolean
  /**
   * Whether to show checkbox options in the dialog
   * 
   * Enable this to help users categorize their feedback with predefined options, making it easier
   * to analyze patterns and common issues. Disable when you only need free-form text feedback
   * or when the context is simple enough that categorization isn't necessary.
   * 
   * Requires `feedbackOptions` to be provided and `showDetailsDialog` to be true.
   * 
   * @default true
   */
  showCheckboxOptions?: boolean
  /**
   * Predefined checkbox options for categorizing feedback
   * 
   * Provide separate options for positive (thumbs up) and negative (thumbs down) feedback
   * to help users quickly identify what worked well or what went wrong. Include an "other"
   * option with id="other" to make the comment field required when selected.
   * 
   * Example use cases:
   * - AI responses: accuracy, helpfulness, clarity, completeness
   * - Content quality: relevance, depth, readability
   * - User experience: ease of use, performance, design
   */
  feedbackOptions?: FeedbackOptions
  /**
   * Custom dialog configuration
   */
  dialogConfig?: {
    /** Custom title for the dialog */
    title?: string
    /** Custom description text (overrides default dynamic text) */
    description?: string
    /** Custom placeholder for the textarea */
    placeholder?: string
    /** Custom submit button text */
    submitText?: string
    /** Custom cancel button text */
    cancelText?: string
  }
  /**
   * Callback when feedback is submitted (with optional details)
   */
  onFeedbackSubmit?: (details: FeedbackDetails) => void
}

export function ChatFeedback({
  variant = "default",
  showDetailsDialog = true,
  showCheckboxOptions = true,
  feedbackOptions,
  dialogConfig,
  onFeedbackSubmit
}: ChatFeedbackProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [feedbackComment, setFeedbackComment] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)

  const handleFeedbackClick = (type: "up" | "down") => {
    if (showDetailsDialog) {
      // In dialog mode, always open dialog (even if changing selection)
      setFeedback(type)
      setIsDialogOpen(true)
    } else {
      // In non-dialog mode, toggle selection
      const newFeedback = feedback === type ? null : type
      setFeedback(newFeedback)

      if (newFeedback && onFeedbackSubmit) {
        onFeedbackSubmit({ feedback: newFeedback })
      }
    }
  }

  const handleCheckboxChange = (optionId: string, checked: boolean) => {
    setSelectedOptions(prev =>
      checked
        ? [...prev, optionId]
        : prev.filter(id => id !== optionId)
    )
  }

  const handleSubmitDetails = () => {
    if (feedback && onFeedbackSubmit) {
      // Check if "other" is selected and comment is required
      const isOtherSelected = selectedOptions.includes("other")
      if (isOtherSelected && !feedbackComment.trim()) {
        // Mark that submit was attempted so validation message appears
        setHasAttemptedSubmit(true)
        return
      }

      onFeedbackSubmit({
        feedback,
        comment: feedbackComment || undefined,
        selectedOptions: selectedOptions.length > 0 ? selectedOptions : undefined,
      })
    }
    setIsDialogOpen(false)
    setFeedbackComment("")
    setSelectedOptions([])
    setHasAttemptedSubmit(false)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
    setFeedbackComment("")
    setSelectedOptions([])
    setHasAttemptedSubmit(false)
    // Reset feedback when canceling
    setFeedback(null)
  }

  const defaultDialogTitle = feedback === "up"
    ? "What was good about this response?"
    : "What was the issue with this response?"

  const dialogTitle = dialogConfig?.title || "Feedback"
  const dialogDescription = dialogConfig?.description || defaultDialogTitle
  const placeholder = dialogConfig?.placeholder || "Enter your feedback..."
  const submitText = dialogConfig?.submitText || "Submit"
  const cancelText = dialogConfig?.cancelText || "Cancel"

  // Get the appropriate checkbox options based on feedback type
  const currentCheckboxOptions = feedback === "up" 
    ? feedbackOptions?.positive 
    : feedbackOptions?.negative

  // Check if "other" option is selected
  const isOtherSelected = selectedOptions.includes("other")
  const isCommentRequired = isOtherSelected
  const showValidationError = hasAttemptedSubmit && isCommentRequired && !feedbackComment.trim()

  // Color classes based on variant
  const getButtonClasses = (type: "up" | "down", isSelected: boolean) => {
    if (!isSelected) {
      // Unselected: use muted foreground, let ghost variant handle hover
      return "text-muted-foreground"
    }

    if (variant === "default") {
      // Default: blue icon using primary color, no background
      // Use [&]:text-primary for higher specificity
      return "[&]:text-primary [&:hover]:text-primary [&_svg]:text-primary"
    }

    // Agent evaluation: thumbs up = green, thumbs down = red
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
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <DialogDescription className="bg-background">
              {dialogDescription}
            </DialogDescription>

            {showCheckboxOptions && currentCheckboxOptions && currentCheckboxOptions.length > 0 && (
              <div className="space-y-3">
                {currentCheckboxOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={selectedOptions.includes(option.id)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(option.id, checked === true)
                      }
                    />
                    <Label
                      htmlFor={option.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              {showCheckboxOptions && (
                <Label htmlFor="feedback-comment" className="text-sm font-medium">
                  Additional comments{isCommentRequired && <span className="text-destructive ml-1">*</span>}
                </Label>
              )}
              <Textarea
                id="feedback-comment"
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                placeholder={placeholder}
                className="min-h-32"
                required={isCommentRequired}
                aria-required={isCommentRequired}
                aria-describedby={showValidationError ? "feedback-comment-error" : undefined}
                aria-invalid={showValidationError}
              />
              {showValidationError && (
                <p id="feedback-comment-error" role="alert" className="text-xs text-destructive bg-background">
                  Please provide additional details when selecting "Other"
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              {cancelText}
            </Button>
            <Button onClick={handleSubmitDetails}>
              {submitText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
