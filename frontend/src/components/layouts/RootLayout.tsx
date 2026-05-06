import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <div
      className={`h-screen min-h-screen w-full min-w-full bg-background text-foreground`}
    >
      {/* root layout */}
      <Outlet />
    </div>
  )
}

export default RootLayout
