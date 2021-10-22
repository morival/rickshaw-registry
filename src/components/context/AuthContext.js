import React, { useContext, useEffect, useState } from 'react';
import UsersServices from '../../services/UsersServices';


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [loggedIn, setLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(false)


    function signup(name, email, phoneNumber, password, registerDate) {
        UsersServices.createUser(
            {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
                registerDate: registerDate
            }
        );
    }

    async function login(login, password) {
        try {
            setLoading(true)
            const checkLogin = await UsersServices.authenticateUser({
                login: login,
                password: password
            });
            setCurrentUser(checkLogin.data)
            setLoggedIn(true)
        } catch {
            console.log("error")
        } finally {
            setLoading(false)
        }
    }


    function logout() {
        setCurrentUser(null)
    }

    useEffect(() => {
        console.log("current user: "+JSON.stringify(currentUser))
        // console.log("loading: "+loading)
        console.log("is logged in: "+loggedIn)
    },[loading]);

    const value = {
        loggedIn,
        currentUser,
        signup,
        login,
        logout
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