import { Navigate, Outlet } from "react-router-dom"
import useAuthUser from "../features/user/hooks/useAuthUser"
import { AUTH_ROUTES } from "@/features/auth/auth.routes"

const PublicRoute = () => {
  const { data: user, isLoading } = useAuthUser()

  if (isLoading) return <div>Loading...</div>

  if (user) {
    return <Navigate to={AUTH_ROUTES.ME} />
  }

  return <Outlet />
}

export default PublicRoute
