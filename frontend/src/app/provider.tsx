import AppToaster from "@/components/shad/AppToaster"
import { Toaster } from "@/components/ui/sonner"
import { queryClient } from "@/lib/api/query-client"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { TooltipProvider } from "@/components/ui/tooltip"

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // all providers here

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppToaster />

      <TooltipProvider>{children}</TooltipProvider>
    </QueryClientProvider>
  )
}

export default AppProvider
