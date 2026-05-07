import type { RouteObject } from "react-router-dom"
import ProfileMe from "../auth/pages/ProfileMe"

export const USER_ROUTES = {
  ME: "/users/me",
}

export const userRoutes: RouteObject[] = [
  {
    index: true,
    path: USER_ROUTES.ME,
    element: <ProfileMe />,
  },
]
