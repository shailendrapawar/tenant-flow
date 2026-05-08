import { create } from "zustand"
import type { AuthUser } from "../user.types"

type AuthStore = {
  authUser: AuthUser | null
  setAuthUser: (user: AuthUser | null) => void
  hasAllPermissions: (requiredPermissions: string[]) => boolean
  hasAnyPermissions: (requiredPermissions: string[]) => boolean
  getRole: () => string | null
  isLoading: boolean
  setLoading: (value: boolean) => void
  isError: boolean
  setIsError: (value: boolean) => void
}

export const useUserStore = create<AuthStore>((set) => ({
  authUser: null,
  isLoading: false,

  setAuthUser: (authUser: AuthUser | null) => set({ authUser }),
  setLoading: (value: boolean) => set({ isLoading: value }),

  isError: false,
  setIsError: (value: boolean) => set({ isError: value }),

  hasAllPermissions: (requiredPermissions: string[]): boolean => {
    const { authUser } = useUserStore.getState()

    for (const p of requiredPermissions || []) {
      if (!authUser?.permissions.includes(p)) {
        return false
      }
    }
    return true
  },

  hasAnyPermissions: (requiredPermissions: string[]): boolean => {
    const { authUser } = useUserStore.getState()

    for (const p of requiredPermissions || []) {
      if (authUser?.permissions.includes(p)) {
        return true
      }
    }
    return false
  },

  getRole: (): string | null => {
    const { authUser } = useUserStore.getState()
    return authUser?.role || null
  },
}))
