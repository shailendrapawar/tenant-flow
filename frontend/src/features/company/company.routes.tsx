import type { RouteObject } from "react-router-dom"
import CompaniesPage from "./pages/CompaniesPage"
import CompanyDetailsPage from "./pages/CompanyDetailsPage"

export const companyRoutes: RouteObject[] = [
  {
    path: "/companies",
    element: <CompaniesPage />,
  },
  {
    path: "/companies/:id",
    element: <CompanyDetailsPage />,
  },
]
