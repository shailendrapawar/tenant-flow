import { cn } from "@/lib/utils"

interface DataFieldProps {
  title?: string
  description?: string
  value?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  valueClassName?: string
}

export function DataField({
  title,
  description,
  value = "",
  className,
  titleClassName,
  descriptionClassName,
  valueClassName,
}: DataFieldProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {title && (
        <p className={cn("text-sm font-medium", titleClassName)}>{title}</p>
      )}
      {description && (
        <p
          className={cn("text-xs text-muted-foreground", descriptionClassName)}
        >
          {description}
        </p>
      )}
      <div
        className={cn(
          "flex h-10 w-full items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm text-muted-foreground shadow-sm",
          valueClassName
        )}
      >
        {value}
      </div>
    </div>
  )
}
