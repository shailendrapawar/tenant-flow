import { navItems } from "@/config/navigationItems"
import useAuthUser from "@/features/user/hooks/useAuthUser"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { AiOutlineLogout } from "react-icons/ai"

const Navbar = () => {
  const { authUser } = useAuthUser()
  const role = authUser?.role || ""

  return (
    <main className="sticky top-0 z-50 flex h-20 w-full items-center justify-between border bg-card px-5">
      <h3 className="font-bold text-primary">Tenant flow</h3>

      {/* web nav */}
      <nav className="hidden items-center justify-evenly gap-4 px-5 md:flex">
        <section className="flex h-full items-center gap-2">
          {navItems
            ?.filter((item) => item?.rolesAllowed?.includes(role))
            .map((v, i) => {
              return (
                <NavLink
                  to={v.path}
                  className={({ isActive }) =>
                    `flex h-10 w-30 cursor-pointer items-center justify-center gap-2 rounded-md text-sm hover:bg-primary/20 hover:text-primary ${isActive ? "bg-primary/20 text-primary" : ""}`
                  }
                  key={i}
                >
                  <span>{v.icon}</span>
                  <span>{v.label}</span>
                </NavLink>
              )
            })}
        </section>
      </nav>
      <AiOutlineLogout
        className={`hidden size-8 cursor-pointer rounded-md p-1 hover:bg-danger/80 hover:text-danger-foreground md:block`}
        title="logout"
      />
      <nav className="flex md:hidden">mobile nav</nav>
    </main>
  )
}

export default Navbar
