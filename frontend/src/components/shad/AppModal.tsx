import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ModalContext } from "@/contexts/ModalContext"

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function AppModal({
  open,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  return (
    <ModalContext.Provider value={{ onClose }}>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className={className + "select-none"}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {title && (
            <DialogHeader>
              <DialogTitle className="text-center text-primary sm:text-lg">
                {title}
              </DialogTitle>
            </DialogHeader>
          )}
          {children}
          <DialogDescription aria-description="" className="hidden" />
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  )
}
