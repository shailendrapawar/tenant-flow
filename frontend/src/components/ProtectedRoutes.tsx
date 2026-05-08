import useAuthUser from "../features/user/hooks/useAuthUser"
import { Navigate, Outlet } from "react-router-dom"
import { AUTH_ROUTES } from "../features/auth/auth.routes"
import { notify } from "./AppToaster"

const ProtectedRoutes = () => {
  const { data: user, isLoading, isError } = useAuthUser()

  if (isLoading && !user) return <div>Loading...user</div>

  if (isError || (!user && !isLoading)) {
    notify.error("Something went wrong")
    return <Navigate to={AUTH_ROUTES.LOGIN} replace />
  }

  return <Outlet />
}

export default ProtectedRoutes
