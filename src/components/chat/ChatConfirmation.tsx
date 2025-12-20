import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ChatConfirmationProps {
  message: string
  primaryAction: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
}

export function ChatConfirmation({
  message,
  primaryAction,
  secondaryAction,
}: ChatConfirmationProps) {
  return (
    <Alert className="bg-[#EDEEFA] border-0 rounded-none px-5 py-4 border-l-4 border-primary">
      <AlertTitle className="line-clamp-none">{message}</AlertTitle>
      <AlertDescription className="mt-2">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="border-primary text-foreground rounded-full" onClick={primaryAction.onClick}>
            {primaryAction.label}
          </Button>
          {secondaryAction && (
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}
