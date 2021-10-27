import React, { useContext, useEffect } from 'react';
import { useLocalStorage } from '../UseLocalStorage';
import UsersServices from '../../services/UsersServices';


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', false);
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
    const [loading, setLoading] = useLocalStorage('loading', false);


    async function signup(user) {
        setLoading(true)
        const res = await UsersServices.createUser(user)
        try {
            if(!user || !res) {
                return console.log("coudn't create an account")
            } else {
                console.log(res.data)
                setCurrentUser(res.data)
                setLoggedIn(true)
                const newUser = {userLogin: user.email, password: user.password}
                localStorage.setItem('user', JSON.stringify(newUser))
            }
        } catch(err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    async function login(user) {
        setLoading(true)
        console.log(user)
        const res = await UsersServices.authenticateUser(user)
        try {
            if(!user || !res) {
                return console.log("you are not logged in")
            } else {
                await setCurrentUser(res.data)
                console.log(res.data)
                await setLoggedIn(true)
            }
        } catch(err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    function logout() {
        setLoading(true)
        localStorage.clear();
        setCurrentUser(null)
        setLoading(false)
    }

    useEffect(() => {
        console.log(loggedIn)
    }, [loggedIn]);

    const value = {
        currentUser,
        setCurrentUser,
        loggedIn,
        setLoggedIn,
        loading,
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