import React from "react"
import { Toaster } from "./ui/sonner"
import { toast } from "sonner"

const AppToaster = () => {
  return (
    <Toaster
      position="top-right"
      expand={true}
      duration={4000}
      visibleToasts={2}
      toastOptions={{
        classNames: {
          toast: "bg-card text-card-foreground border border-border shadow-md",
          success:
            "border-l-4 !border-l-[var(--success)] text-[var(--success)]",
          error: "border-l-4 !border-l-[var(--danger)] text-[var(--danger)]",
          warning:
            "border-l-4 !border-l-[var(--warning)] text-[var(--warning)]",
          info: "border-l-4 !border-l-[var(--primary)] text-[var(--primary)]",
          description: "text-muted-foreground text-sm",
          title: "font-semibold text-sm",
          actionButton:
            "bg-primary text-primary-foreground text-xs px-2 py-1 rounded",
          cancelButton:
            "bg-muted text-muted-foreground text-xs px-2 py-1 rounded",
          closeButton: "bg-card border border-border text-muted-foreground",
        },
      }}
    />
  )
}

export default AppToaster
export const notify = {
  success: (title: string, description?: string) =>
    toast.success(title, {
      description,
      style: {
        background: "var(--success-soft)",
        color: "var(--success)",
        border: "1px solid var(--success)",
      },
    }),

  error: (title: string, description?: string) =>
    toast.error(title, {
      description,
      style: {
        background: "var(--danger-soft)",
        color: "var(--danger)",
        border: "1px solid var(--danger)",
      },
    }),

  warning: (title: string, description?: string) =>
    toast.warning(title, {
      description,
      style: {
        background: "var(--warning-soft)",
        color: "var(--warning)",
        border: "1px solid var(--warning)",
      },
    }),

  info: (title: string, description?: string) =>
    toast.info(title, {
      description,
      style: {
        background: "var(--muted)",
        color: "var(--primary)",
        border: "1px solid var(--primary)",
      },
    }),

  neutral: (title: string, description?: string) =>
    toast(title, {
      description,
      style: {
        background: "var(--neutral-soft)",
        color: "var(--neutral)",
        border: "1px solid var(--neutral)",
      },
    }),
}
