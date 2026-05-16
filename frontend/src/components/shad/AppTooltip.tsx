import React from "react"
import { TooltipContent, TooltipTrigger, Tooltip } from "../ui/tooltip"

const AppTooltip = ({
  children,
  tip,
  className,
}: {
  children: React.ReactNode
  tip: string
  className: string
}) => {
  return (
    <Tooltip>
      <TooltipTrigger> {children}</TooltipTrigger>
      <TooltipContent className={className}>
        <p>{tip}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default AppTooltip
