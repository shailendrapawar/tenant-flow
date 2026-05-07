import type { RouteObject } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProfileMe from "./pages/ProfileMe"

export const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ME: "/auth/me",
} as const

export const authRoutes: RouteObject[] = [
  {
    path: AUTH_ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: AUTH_ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: AUTH_ROUTES.ME,
    element: <ProfileMe />,
  },
]
