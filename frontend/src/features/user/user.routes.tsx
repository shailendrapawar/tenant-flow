import type { RouteObject } from "react-router-dom"
import ProfileMe from "./pages/ProfileMe"
import UsersListPage from "./pages/UsersListPage"
import UserDetailsPage from "./pages/UserDetailsPage"

export const USER_ROUTES = {
  ME: "/users/me",
  USERS: "/users",
  USER_DETAILS: "/users/:id",
}

export const userRoutes: RouteObject[] = [
  {
    index: true,
    path: USER_ROUTES.ME,
    element: <ProfileMe />,
  },
  {
    path: USER_ROUTES.USERS,
    element: <UsersListPage />,
  },
  {
    path: USER_ROUTES.USER_DETAILS,
    element: <UserDetailsPage />,
  },
]
