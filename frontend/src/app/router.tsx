import RootLayout from "@/components/layouts/RootLayout"
import { createBrowserRouter } from "react-router-dom"
import { authRoutes } from "@/features/auth/auth.routes"
import AuthLayout from "@/components/layouts/AuthLayout"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        // auth routes
        path: "/auth",
        element: <AuthLayout />,
        children: authRoutes,
      },
    ],
  },
])

export default appRouter
