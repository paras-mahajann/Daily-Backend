import { RouterProvider } from "react-router";
import {router} from './app.routes'
import "./features/shared/styles/global.scss"
import { AuthProvider } from "./features/Auth/auth.context";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>    
  )
}

export default App
