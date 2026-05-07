import { Navigate } from "react-router-dom"
import { AUTH_ROUTES } from "@/features/auth/auth.routes"

const RootRedirect = () => {
  //TODO: add code here to handle redirection logic based on cookies
  //change to desired locaiton for throwing user when coming to /root
  return <Navigate to={AUTH_ROUTES.ME} />
}

export default RootRedirect
