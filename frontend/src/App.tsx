import { RouterProvider } from "react-router-dom"
import appRouter from "./app/router"
import AppProvider from "./app/provider"

export function App() {
  return (
    <AppProvider>
      {/*  only add app skeelton or error boundary states here */}
      <RouterProvider router={appRouter} />
    </AppProvider>
  )
}

export default App
