import type { RouteObject } from "react-router-dom"
import CompaniesListPage from "./pages/CompaniesListPage"
import CompanyDetailsPage from "./pages/CompanyDetailsPage"

export const COMPANY_ROUTES = {
  COMPANIES: "/companies",
  COMPANY_DETAILS: "/companies/:id",
}
export const companyRoutes: RouteObject[] = [
  {
    path: COMPANY_ROUTES.COMPANIES,
    element: <CompaniesListPage />,
  },
  {
    path: COMPANY_ROUTES.COMPANY_DETAILS,
    element: <CompanyDetailsPage />,
  },
]
