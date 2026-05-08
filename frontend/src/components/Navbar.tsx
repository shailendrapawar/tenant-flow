import { navItems } from "@/config/navigationItems"
import useAuthUser from "@/features/user/hooks/useAuthUser"
import { useState } from "react"
import { NavLink } from "react-router-dom"

import { FaUserLarge } from "react-icons/fa6"
import { RxCross2 } from "react-icons/rx"
import { CgMenuRight } from "react-icons/cg"

const Navbar = () => {
  const { authUser } = useAuthUser()
  const role = authUser?.role || ""

  const [navToggle, setNavToggle] = useState(false)

  return (
    <main className="sticky top-0 z-50 flex h-20 w-full items-center justify-between border bg-card">
      <h3 className="ml-5 font-bold text-primary">Tenant flow</h3>

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

      <nav
        className="absolute top-20 flex h-[calc(100vh-85px)] w-full flex-col items-center justify-center gap-3 bg-card/95 px-5 md:hidden"
        style={navToggle ? {} : { display: "none" }}
      >
        {navItems
          ?.filter((item) => item?.rolesAllowed?.includes(role))
          .map((v, i) => {
            return (
              <NavLink
                to={v.path}
                className={({ isActive }) =>
                  `flex h-10 w-full cursor-pointer items-center justify-center gap-4 rounded-md text-sm hover:bg-primary/20 hover:text-primary ${isActive ? "bg-primary/20 text-primary" : ""}`
                }
                key={i}
                onClick={() => setNavToggle(!navToggle)}
              >
                <span>{v.icon}</span>
                <span>{v.label}</span>
              </NavLink>
            )
          })}
      </nav>

      <FaUserLarge
        className={`mr-5 hidden size-10 cursor-pointer rounded-full bg-primary p-2.5 text-primary-foreground hover:bg-primary/80 md:block`}
        title="logout"
      />

      <span
        className="transition-all ease-in-out active:scale-95 md:hidden"
        onClick={() => setNavToggle(!navToggle)}
      >
        {navToggle ? (
          <RxCross2
            className={`mr-5 size-10 cursor-pointer rounded-full bg-primary p-2.5 text-primary-foreground hover:bg-primary/80 md:hidden`}
            title="logout"
          />
        ) : (
          <CgMenuRight
            className={`mr-5 size-10 cursor-pointer rounded-full bg-primary p-2.5 text-primary-foreground hover:bg-primary/80 md:hidden`}
            title="logout"
          />
        )}
      </span>
    </main>
  )
}

export default Navbar
