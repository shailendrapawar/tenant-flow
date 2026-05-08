import type { RouteObject } from "react-router-dom"
import PropertiesListPage from "./pages/PropertiesListPage"
import PropertyDetailsPage from "./pages/PropertyDetailsPage"

export const PROPERTY_ROUTES = {
  PROPERTIES: "/properties",
  PROPERTY_DETAILS: "/properties/:id",
}
export const propertyRoutes: RouteObject[] = [
  {
    path: PROPERTY_ROUTES.PROPERTIES,
    element: <PropertiesListPage />,
  },
  {
    path: PROPERTY_ROUTES.PROPERTY_DETAILS,
    element: <PropertyDetailsPage />,
  },
]
