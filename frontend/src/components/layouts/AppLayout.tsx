import { Outlet } from "react-router-dom"
import Navbar from "../Navbar"

const AppLayout = () => {
  //add all sidebars and navbars here

  return (
    <main className="absolute h-screen w-screen">
      <Navbar />
      <Outlet />
    </main>
  )
}

export default AppLayout
