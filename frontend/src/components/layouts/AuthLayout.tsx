import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <section className="h-full w-full">
      <Outlet />
    </section>
  )
}

export default AuthLayout
