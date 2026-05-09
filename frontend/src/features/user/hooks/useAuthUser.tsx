import { useQuery } from "@tanstack/react-query"
import { AuthService } from "../../auth/auth.service"
import type { AuthUser } from "../user.types"
import { useMemo } from "react"

const useAuthUser = () => {
  // const { setAuthUser } = useUserStore((s) => s)
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["user-me"],
    queryFn: async () => {
      const res = await AuthService.getAuthUser()
      //reshape auth user
      const user: AuthUser = {
        ...res?.data?.user,
        permissions: res?.data?.permissions || [],
        // permissionsSet: new Set(res?.data?.permissions || []),
      }
      return user
    },
    retry: false,
    staleTime: 3 * 60 * 1000, // 3 minutes
  })

  //aggregate related functions
  const authUser = {
    user: data,
    isLoggedIn: !!data,
    role: data?.role,
    isAdmin: data?.role === "admin",
    isLandlord: data?.role === "landlord",

    hasAnyPermissions: (required: string[]) =>
      required.some((p) => data?.permissions?.includes(p) ?? false),

    hasAllPermissions: (required: string[]) =>
      required.every((p) => data?.permissions?.includes(p) ?? false),
  }

  return {
    isLoading,
    data,
    isError,
    error,
    authUser,
  }
}

export default useAuthUser
