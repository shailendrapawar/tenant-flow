import RootLayout from "@/components/layouts/RootLayout"
import { createBrowserRouter } from "react-router-dom"
import { authRoutes } from "@/features/auth/auth.routes"
import AuthLayout from "@/components/layouts/AuthLayout"
import CompanyLayout from "@/components/layouts/CompanyLayout"
import { companyRoutes } from "@/features/company/company.routes"
import RootRedirect from "@/components/RootRedirect"
import ProtectedRoutes from "@/components/ProtectedRoutes"
import PublicRoute from "@/components/PublicRoute"
import UserLayout from "@/components/layouts/UserLayout"
import { userRoutes } from "@/features/user/user.routes"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        //handles root redirection  when entry
        index: true,
        element: <RootRedirect />,
      },

      // ============PUBLIC ROUTES
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/auth",
            element: <AuthLayout />,
            children: authRoutes,
          },
        ],
      },

      //============= PROTECTED ROUTES==================
      {
        element: <ProtectedRoutes />,
        children: [
          {
            //company routes
            path: "/companies",
            element: <CompanyLayout />,
            children: companyRoutes,
          },
          {
            // user routes
            path: "/users",
            element: <UserLayout />,
            children: userRoutes,
          },
        ],
      },
    ],
  },
])

export default appRouter
