import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Feedback() {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)

  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setFeedback(feedback === "up" ? null : "up")}
        aria-label="Helpful"
        className={feedback === "up" ? "bg-[#E3FBDF] hover:bg-[#E3FBDF]" : "text-muted-foreground"}
      >
        <ThumbsUp />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setFeedback(feedback === "down" ? null : "down")}
        aria-label="Not helpful"
        className={feedback === "down" ? "bg-[#FED7DE] hover:bg-[#FED7DE]" : "text-muted-foreground"}
      >
        <ThumbsDown />
      </Button>
    </div>
  )
}
