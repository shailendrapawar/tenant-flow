import { Navigate } from "react-router-dom"
import { AUTH_ROUTES } from "@/features/auth/auth.routes"

const RootRedirect = () => {
  //TODO: add code here to handle redirection logic based on cookies
  return <Navigate to={AUTH_ROUTES.LOGIN} />
}

export default RootRedirect
