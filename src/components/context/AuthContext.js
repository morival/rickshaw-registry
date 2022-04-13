import React, { createContext, useContext } from 'react';
import UsersServices from '../../services/UsersServices';
import { useLocalStorage } from '../UseLocalStorage';



const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [user, setUser] = useLocalStorage('user', null);
    const [recordId, setRecordId] = useLocalStorage('recordId', null);
    const [records, setRecords] = useLocalStorage('records', null)
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', false);
    const [loading, setLoading] = useLocalStorage('loading', false);


    async function authenticate(data) {
        return await UsersServices.authenticateUser(data)
    }

    async function getUser(data) {
        return await UsersServices.getUser(data)
    }
    
    function login(data) {
        setUser(data)
        setLoggedIn(true)
    }

    function logout() {
        setLoading(true)
        localStorage.clear()
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
        getUser,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {
            // !loading && 
            children
            }
        </AuthContext.Provider>
    );
}