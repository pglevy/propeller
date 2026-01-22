import * as React from "react"
import { X, FileText, FileImage, FileCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface FileCardProps extends React.ComponentProps<"div"> {
  /**
   * The file name to display
   */
  fileName: string
  /**
   * The file size in bytes
   */
  fileSize: number
  /**
   * Whether to show the remove button
   * @default false
   */
  showRemove?: boolean
  /**
   * Callback when the remove button is clicked
   */
  onRemove?: () => void
  /**
   * Optional file type override (if not provided, will be inferred from fileName)
   */
  fileType?: string
  /**
   * Maximum width of the component (CSS value)
   * @default "320px"
   */
  maxWidth?: string
}

/**
 * Get the file extension from a filename
 */
function getFileExtension(filename: string): string {
  const ext = filename.split('.').pop()
  return ext ? ext.toUpperCase() : 'FILE'
}

/**
 * Get the appropriate icon for a file based on its extension
 */
function getFileIcon(filename: string): React.ReactNode {
  const ext = filename.split('.').pop()?.toLowerCase()
  
  // Image files
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext || '')) {
    return (
      <FileImage className="size-5 text-primary shrink-0" />
    )
  }
  
  // PDF files
  if (ext === 'pdf') {
    return (
      <svg className="size-5 text-destructive shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  }
  
  // Code files
  if (['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'html', 'css', 'json', 'xml'].includes(ext || '')) {
    return (
      <FileCode className="size-5 shrink-0" style={{ color: 'var(--aurora-purple-3)' }} />
    )
  }
  
  // Default file icon
  return (
    <FileText className="size-5 text-muted-foreground shrink-0" />
  )
}

/**
 * Format file size in human-readable format
 */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * FileCard displays file information with an optional remove button.
 * Used in chat interfaces to show attached files.
 */
export function FileCard({
  fileName,
  fileSize,
  showRemove = false,
  onRemove,
  fileType,
  maxWidth = "320px",
  className,
  ...props
}: FileCardProps) {
  const extension = fileType || getFileExtension(fileName)
  const icon = getFileIcon(fileName)
  const formattedSize = formatFileSize(fileSize)

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border bg-background py-2",
        showRemove ? "pl-3 pr-2" : "pl-3 pr-4",
        className
      )}
      style={{ maxWidth }}
      {...props}
    >
      {icon}
      <div className="flex-1 min-w-0">
        <div className="truncate text-sm font-semibold text-foreground">
          {fileName}
        </div>
        <div className="text-xs text-muted-foreground">
          {extension} • {formattedSize}
        </div>
      </div>
      {showRemove && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onRemove}
          aria-label="Remove file"
          className="flex-shrink-0 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  )
}
