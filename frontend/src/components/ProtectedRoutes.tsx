import useAuthUser from "../features/auth/hooks/useAuthUser"
import { Navigate, Outlet } from "react-router-dom"
import { AUTH_ROUTES } from "../features/auth/auth.routes"

const ProtectedRoutes = () => {
  const { data: user, isLoading, isError } = useAuthUser()

  if (isLoading) return <div>Loading...</div>

  if (isError || !user) {
    return <Navigate to={AUTH_ROUTES.LOGIN} replace />
  }

  return <Outlet />
}

export default ProtectedRoutes
