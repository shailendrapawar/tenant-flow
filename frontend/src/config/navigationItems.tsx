import { LuLayoutDashboard } from "react-icons/lu"
import { LuBuilding2 } from "react-icons/lu"
import { FiUsers } from "react-icons/fi"
import { IoSettingsOutline } from "react-icons/io5"
import { COMPANY_ROUTES } from "@/features/company/company.routes"
import { USER_ROUTES } from "@/features/user/user.routes"
import { PROPERTY_ROUTES } from "@/features/property/property.routes"
import { DASHBOARD_ROUTES } from "@/features/dashboard/dashboard.routes"
export const navItems = [
  // dashboard
  {
    label: "Dashboard",
    path: DASHBOARD_ROUTES.DASHBOARD,
    icon: <LuLayoutDashboard />,
    rolesAllowed: ["admin", "landlord"],
  },
  {
    label: "Properties",
    path: PROPERTY_ROUTES.PROPERTIES,
    icon: <LuBuilding2 />,
    rolesAllowed: ["admin", "landlord"],
  },
  {
    label: "Companies",
    path: COMPANY_ROUTES.COMPANIES,
    icon: <LuBuilding2 />,
    rolesAllowed: ["admin"],
  },
  {
    label: "Users",
    path: USER_ROUTES.USERS,
    icon: <FiUsers />,
    rolesAllowed: ["admin"],
  },

  {
    label: "Tenants",
    path: "/tenants",
    icon: <FiUsers />,
    rolesAllowed: ["landlord"],
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <IoSettingsOutline />,
    rolesAllowed: ["landlord"],
  },
]
