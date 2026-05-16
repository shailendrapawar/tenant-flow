import { notify } from "@/components/shad/AppToaster"
import { useModal } from "@/contexts/ModalContext"
import { AUTH_ROUTES } from "@/features/auth/auth.routes"
import { AuthService } from "@/features/auth/auth.service"
import { queryClient } from "@/lib/api/query-client"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const useLogoutUser = () => {
  const navigate = useNavigate()

  const { onClose } = useModal()
  const { mutate, isPending } = useMutation({
    mutationKey: ["logout-user"],
    mutationFn: AuthService.logout,
    onSuccess: () => {
      notify.success("User logged-out successfully")
      onClose()
      queryClient.removeQueries({ queryKey: ["user-me"] })
      navigate(AUTH_ROUTES.LOGIN)
    },
    onError: (err) => {
      notify.error(err.message)
    },
  })

  const logout = () => {
    mutate()
  }
  return { logout, isPending }
}
export default useLogoutUser
