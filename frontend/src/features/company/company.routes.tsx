import type { RouteObject } from "react-router-dom"
import CompaniesListPage from "./pages/CompaniesListPage"
import CompanyDetailsPage from "./pages/CompanyDetailsPage"

export const companyRoutes: RouteObject[] = [
  {
    path: "/companies",
    element: <CompaniesListPage />,
  },
  {
    path: "/companies/:id",
    element: <CompanyDetailsPage />,
  },
]
