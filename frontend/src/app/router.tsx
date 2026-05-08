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
import AppLayout from "@/components/layouts/AppLayout"
import Unauthorized from "@/components/Unauthorized"
import PropertyLayout from "@/components/layouts/PropertyLayout"
import { propertyRoutes } from "@/features/property/property.routes"
import DashboardLayout from "@/components/layouts/DashboardLayout"
import { dashboardRoutes } from "@/features/dashboard/dashboard.routes"

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

      // ============PUBLIC ROUTES=======================>
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

      //============= PROTECTED ROUTES==================>
      {
        element: <ProtectedRoutes />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                path: "/unauthorized",
                element: <Unauthorized />,
              },
              {
                //dashboard routes
                path: "/dashboard",
                element: <DashboardLayout />,
                children: dashboardRoutes,
              },
              {
                //company routes
                path: "companies",
                element: <CompanyLayout />,
                children: companyRoutes,
              },
              {
                // user routes
                path: "users",
                element: <UserLayout />,
                children: userRoutes,
              },
              {
                //properties routes
                path: "properties",
                element: <PropertyLayout />,
                children: propertyRoutes,
              },
            ],
          },
        ],
      },
    ],
  },
])

export default appRouter
