import React from "react"
import { Outlet } from "react-router-dom"

const UserLayout = () => {
  return (
    <section className="h-full w-full">
      <Outlet />
    </section>
  )
}

export default UserLayout
