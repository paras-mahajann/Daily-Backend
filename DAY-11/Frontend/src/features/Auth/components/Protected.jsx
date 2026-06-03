import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {

    const { user, loading } = useAuth();

    if(loading){
        return <h1>loading</h1>
    }

    if (!loading && !user) {
        return <Navigate to='/login' />
    }


    return children;
}

export default Protected
