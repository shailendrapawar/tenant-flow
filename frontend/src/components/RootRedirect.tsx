import { Navigate } from "react-router-dom"

import { USER_ROUTES } from "@/features/user/user.routes"

const RootRedirect = () => {
  //TODO: add code here to handle redirection logic based on cookies
  //change to desired locaiton for throwing user when coming to /root
  return <Navigate to={USER_ROUTES.ME} />
}

export default RootRedirect
