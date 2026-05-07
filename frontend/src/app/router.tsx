import RootLayout from "@/components/layouts/RootLayout"
import { createBrowserRouter } from "react-router-dom"
import { authRoutes } from "@/features/auth/auth.routes"
import AuthLayout from "@/components/layouts/AuthLayout"
import CompanyLayout from "@/components/layouts/CompanyLayout"
import { companyRoutes } from "@/features/company/company.routes"
import RootRedirect from "@/components/RootRedirect"

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
      {
        // auth routes
        path: "/auth",
        element: <AuthLayout />,
        children: authRoutes,
      },
      {
        //company routes
        path: "/companies",
        element: <CompanyLayout />,
        children: companyRoutes,
      },
    ],
  },
])

export default appRouter
