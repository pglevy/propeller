import { Item, ItemContent } from "@/components/ui/item"

interface UserMessageProps {
  message: string
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <Item size="sm" className="w-fit max-w-2xl ml-auto bg-info border-0">
      <ItemContent>
        <p className="text-sm">{message}</p>
      </ItemContent>
    </Item>
  )
}
