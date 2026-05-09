import { createContext, useContext } from "react"

export const ModalContext = createContext<{ onClose: () => void } | null>(null)

export const useModal = () => {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error("useModal must be used inside AppModal")
  return ctx
}
