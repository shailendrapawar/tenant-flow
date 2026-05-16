import useAuthUser from "../features/user/hooks/useAuthUser"
import { Navigate, Outlet } from "react-router-dom"
import { AUTH_ROUTES } from "../features/auth/auth.routes"
import { notify } from "./shad/AppToaster"
import AppLoader from "./shad/AppLoader"

const ProtectedRoutes = () => {
  const { data: user, isLoading, isError } = useAuthUser()

  if (isLoading) return <AppLoader message="Fetching user..." />
  // if (isLoading && !user) return <AppLoader message="Fetching user..." />

  if (isError || (!user && !isLoading)) {
    notify.error("Something went wrong")
    return <Navigate to={AUTH_ROUTES.LOGIN} replace />
  }

  return <Outlet />
}

export default ProtectedRoutes
