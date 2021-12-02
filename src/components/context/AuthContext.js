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
        if(!user || !res) 
            return console.log("coudn't create an account")
        else if(res.status === 409)
            return res
        try {
            setCurrentUser(res.data)
            setLoggedIn(true)
        } catch(err) {
            return err
        } finally {
            setLoading(false)
            return res
        }
    }

    async function login(user) {
        setLoading(true)
        // const response = (user) => {
        //     Object.keys(user)
        // }
        // console.log(user)
        const res = await UsersServices.authenticateUser(user)
        try {
            if(!user || !res) {
                return console.log("you are not logged in")
            } else {
                await setCurrentUser(res.data)
                // console.log(res.data)
                await setLoggedIn(true)
            }
        } catch(err) {
            console.log(err)
        } finally {
            setLoading(false)
            return res
        }
    }

    async function updateProfile(user) {
        console.log(user)
        setLoading(true)
        const authRes = await UsersServices.authenticateUser(user)
        console.log(authRes)
        try{
            if(!authRes) {
                return console.log("password incorrect")
            } else {
                await UsersServices.updateUser(user)
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
        console.log("Logged In: "+loggedIn)
    }, [loggedIn]);

    const value = {
        currentUser,
        setCurrentUser,
        loggedIn,
        setLoggedIn,
        loading,
        signup,
        login,
        updateProfile,
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