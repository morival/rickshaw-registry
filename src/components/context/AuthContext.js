import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../UseLocalStorage';



const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', false);
    const [loading, setLoading] = useLocalStorage('loading', false);


    function logout() {
        setLoading(true)
        localStorage.clear()
        setCurrentUser(null)
        setLoggedIn(false)
        setLoading(false)
    }

    const value = {
        currentUser,
        setCurrentUser,
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
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