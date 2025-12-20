import { Item, ItemContent } from "@/components/ui/item"

interface AssistantMessageProps {
  message: string
}

export function AssistantMessage({ message }: AssistantMessageProps) {
  return (
    <Item variant="default" size="sm" className="w-full px-0">
      <ItemContent>
        <p className="text-sm">{message}</p>
      </ItemContent>
    </Item>
  )
}
