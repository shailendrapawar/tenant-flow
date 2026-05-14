import { Badge } from "@/components/ui/badge"

export function AppBadge({ status }: { status: any }) {
  return (
    <div className="">
      <Badge className="h-full w-auto px-2 py-1" variant={status}>
        {status}
      </Badge>
    </div>
  )
}
