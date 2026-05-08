import { navItems } from "@/config/navigationItems"
import useAuthUser from "@/features/user/hooks/useAuthUser"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

import { FaUserLarge } from "react-icons/fa6"
import { RxCross2 } from "react-icons/rx"
import { CgMenuRight } from "react-icons/cg"

import { motion, AnimatePresence } from "framer-motion"
import { USER_ROUTES } from "@/features/user/user.routes"

const Navbar = () => {
  const { authUser } = useAuthUser()
  const role = authUser?.role || ""

  const [navToggle, setNavToggle] = useState(false)
  const navigate = useNavigate()

  const filteredNav = navItems?.filter((item) =>
    item?.rolesAllowed?.includes(role)
  )

  return (
    <motion.main
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 flex h-20 w-full items-center justify-between border bg-card backdrop-blur"
    >
      {/* Logo */}
      <motion.h3
        whileHover={{ scale: 1.05 }}
        className="ml-5 font-bold text-primary"
      >
        Tenant flow
      </motion.h3>

      {/* Desktop Nav */}
      <nav className="hidden items-center justify-evenly gap-4 px-5 md:flex">
        <section className="flex h-full items-center gap-2">
          {filteredNav.map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to={v.path}
                end={true}
                className={({ isActive }) =>
                  `flex h-10 w-30 items-center justify-center gap-2 rounded-md text-sm transition-colors hover:bg-primary/20 hover:text-primary ${isActive ? "bg-primary/20 text-primary" : ""}`
                }
              >
                <motion.span whileHover={{ rotate: 10 }}>{v.icon}</motion.span>
                <span>{v.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </section>
      </nav>

      {/* Desktop Profile */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="hidden md:block"
        onClick={() => navigate(USER_ROUTES.ME)}
      >
        <FaUserLarge className="mr-5 size-10 cursor-pointer rounded-full bg-primary p-2.5 text-primary-foreground hover:bg-primary/80" />
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.span
        whileTap={{ scale: 0.85 }}
        animate={{ rotate: navToggle ? 90 : 0 }}
        transition={{ duration: 0.3 }}
        className="mr-5 md:hidden"
        onClick={() => setNavToggle(!navToggle)}
      >
        {navToggle ? (
          <RxCross2 className="size-10 cursor-pointer rounded-full bg-primary p-2.5 text-primary-foreground" />
        ) : (
          <CgMenuRight className="size-10 cursor-pointer rounded-full bg-primary p-2.5 text-primary-foreground" />
        )}
      </motion.span>

      {/* Mobile Menu */}
      <AnimatePresence>
        {navToggle && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 flex h-[calc(100vh-85px)] w-full flex-col items-center justify-center gap-4 bg-card/95 backdrop-blur md:hidden"
          >
            {filteredNav.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-5"
              >
                <NavLink
                  to={v.path}
                  end={true}
                  onClick={() => setNavToggle(false)}
                  className={({ isActive }) =>
                    `flex h-12 w-full items-center justify-center gap-4 rounded-md text-sm transition-colors hover:bg-primary/20 hover:text-primary ${isActive ? "bg-primary/20 text-primary" : ""}`
                  }
                >
                  <span>{v.icon}</span>
                  <span>{v.label}</span>
                </NavLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: filteredNav.length * 0.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-5"
            >
              <NavLink
                to={USER_ROUTES.ME}
                onClick={() => setNavToggle(false)}
                className={({ isActive }) =>
                  `flex h-12 w-full items-center justify-center gap-4 rounded-md text-sm transition-colors hover:bg-primary/20 hover:text-primary ${isActive ? "bg-primary/20 text-primary" : ""}`
                }
              >
                <span>
                  <FaUserLarge />
                </span>
                <span>Profile</span>
              </NavLink>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.main>
  )
}

export default Navbar
