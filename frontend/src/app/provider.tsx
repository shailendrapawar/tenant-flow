import AppToaster from "@/components/AppToaster"
import { Toaster } from "@/components/ui/sonner"
import { queryClient } from "@/lib/api/query-client"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { QueryClientProvider } from "@tanstack/react-query"
import React from "react"

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // all providers here

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppToaster />

      {children}
    </QueryClientProvider>
  )
}

export default AppProvider
