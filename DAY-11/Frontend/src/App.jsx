import { RouterProvider } from "react-router-dom";
import { router } from './app.routes'
import "./features/shared/styles/global.scss"
import { AuthProvider } from "./features/Auth/auth.context";
import { SongContextProvider } from "./features/Home/song.context";

const App = () => {
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>

  )
}

export default App
