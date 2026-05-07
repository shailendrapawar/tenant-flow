import { useQuery } from "@tanstack/react-query"
import { AuthService } from "../auth.service"

const useAuthUser = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const res = await AuthService.getAuthUser()
      const user = {
        ...res?.data?.user,
        permissions: res?.data?.permissions || [],
        // permissionsSet: new Set(res?.data?.permissions || []),
      }
      return user
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export default useAuthUser
