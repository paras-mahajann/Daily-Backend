import {createContext,useEffect,useState} from 'react'
import {login,register,getMe} from './services/auth.api'

export const AuthContext = createContext()

export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(false);


    const handleLogin = async (username,password)=>{
        setLoading(true);

        try {
            const res = await login(username,password);
            setUser(res.user);
        } catch (error) {
            console.log(error);            
        }
        finally{
            setLoading(false);
        }
    
    }

    const handleRegister = async (username,email,password)=>{

        setLoading(true);

        try {
            const res = register(username,email,password);
            return setUser()
        } catch (error) {
            
        }
        finally{
            setLoading(false);
        }
    }


    return (
        <AuthContext.Provider value={{user,loading,handleLogin,handleRegister}}>
            {children}
        </AuthContext.Provider>
    )

}