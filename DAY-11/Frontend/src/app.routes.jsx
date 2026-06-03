import {createBrowserRouter} from 'react-router-dom'
import Register from './features/Auth/pages/Register'
import Login from './features/Auth/pages/Login'
import Home from './features/Home/Pages/Home'
import Protected from './features/Auth/components/Protected'

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Protected><Home/></Protected>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/login',
        element:<Login/>
    }
])


