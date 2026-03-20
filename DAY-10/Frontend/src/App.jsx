import { RouterProvider } from "react-router"
import { router } from "./App.routes"
import "./features/shared/globel.scss"
import { AuthProvider } from "./features/auth/auth.context"

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
