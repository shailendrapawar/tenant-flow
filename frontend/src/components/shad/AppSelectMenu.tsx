import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface SelectOption {
  label: string
  value: string
}

interface SelectFieldProps {
  items: SelectOption[]
  onValueChange: (value: string) => void
  placeholder?: string
  label?: string
  value?: string
  className?: string
}

export default function AppSelectMenu({
  items,
  onValueChange,
  placeholder = "Select an option",
  label,
  value = "",
  className,
}: SelectFieldProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="inherit">
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {items.map((item) => (
            <SelectItem key={item?.value} value={item?.value}>
              {item?.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
