import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { useState } from "react"

export interface ChatInputProps {
  /**
   * Placeholder text for the input
   */
  placeholder?: string
  /**
   * Callback when message is submitted
   */
  onSubmit?: (message: string) => void
  /**
   * Whether the input is disabled
   */
  disabled?: boolean
  /**
   * Value of the input (controlled)
   */
  value?: string
  /**
   * Callback when value changes (controlled)
   */
  onChange?: (value: string) => void
}

export function ChatInput({
  placeholder = "Type a message...",
  onSubmit,
  disabled = false,
  value: controlledValue,
  onChange,
}: ChatInputProps) {
  const [internalValue, setInternalValue] = useState("")

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (isControlled) {
      onChange?.(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  const handleSubmit = () => {
    if (value.trim() && onSubmit) {
      onSubmit(value)
      if (!isControlled) {
        setInternalValue("")
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex items-end gap-2 pr-1 pb-1 border rounded has-focus:border-primary transition-colors">
      <Textarea
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="min-h-16 resize-none border-0 shadow-none focus:ring-0 focus-visible:ring-0"
      />
      <Button
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        size="icon"
        variant="ghost"
        className="shrink-0"
      >
        <Send />
      </Button>
    </div>
  )
}
