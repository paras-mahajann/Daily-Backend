import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login,getMe,logout,register } from "../services/auth.api";

export const useAuth = () =>{
    const context = useContext(AuthContext);
    const {user,setUser,loading,setLoading} = context;

    async function handleRegister({username,email,password}) {
        setLoading(true);
        const data = await register({username,email,password});
        setUser(data.user);
        setLoading(false)
    }
    
    async function handleLogin({username,email,password}) {
        setLoading(true);
        const data = await login({username,email,password});
        setUser(data.user);
        setLoading(false)
    }
  
}