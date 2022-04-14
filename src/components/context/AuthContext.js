import React, { createContext, useContext, useEffect, useState } from 'react';
import UsersServices from '../../services/UsersServices';
// import { useLocalStorage } from '../UseLocalStorage';
import { useCookies } from 'react-cookie';



const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const [user, setUser] = useState(cookies.user);
    const [rememberMe, setRememberMe] = useState();
    const [recordId, setRecordId] = useState();
    const [records, setRecords] = useState();
    const [loggedIn, setLoggedIn] = useState(cookies.loggedIn);
    const [loading, setLoading] = useState();


    const { authenticateUser, createUser, getUser } = UsersServices

    async function authenticate(data) {
        setRememberMe(data.rememberMe)
        return await authenticateUser(data)
    }
    
    function login(data) {
        setUser(data)
        setLoggedIn(true)
    }

    function logout() {
        setLoading(true)
        // localStorage.clear()
        removeCookie('user')
        removeCookie('loggedIn')
        setUser(null)
        setRecordId(null)
        setLoggedIn(false)
        setLoading(false)
    }

    const value = {
        user,
        setUser,
        recordId,
        setRecordId,
        records,
        setRecords,
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
        authenticate,
        createUser,
        getUser,
        login,
        logout,
    }

    useEffect(() => {
        if (rememberMe && user) {
            console.log(user)
            setCookie('user', user, { path:'/' })
            setCookie('loggedIn', true, { path:'/' })
        }
    }, [user, rememberMe, setCookie])

    return (
        <AuthContext.Provider value={value}>
            {
            // !loading && 
            children
            }
        </AuthContext.Provider>
    );
}