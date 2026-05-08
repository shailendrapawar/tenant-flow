import { LuLayoutDashboard } from "react-icons/lu"
import { LuBuilding2 } from "react-icons/lu"
import { FiUsers } from "react-icons/fi"
import { IoSettingsOutline } from "react-icons/io5"
export const navItems = [
  // dashboard
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <LuLayoutDashboard />,
    rolesAllowed: ["admin", "landlord"],
  },
  {
    label: "Properties",
    path: "/properties",
    icon: <LuBuilding2 />,
    rolesAllowed: ["admin", "landlord"],
  },
  {
    label: "Companies",
    path: "/companies",
    icon: <LuBuilding2 />,
    rolesAllowed: ["admin"],
  },
  {
    label: "Users",
    path: "/users",
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
