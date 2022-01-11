import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../UseLocalStorage';
import UsersServices from '../../services/UsersServices';


const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', false);
    const [loading, setLoading] = useLocalStorage('loading', false);


    // async function signup(user) {
    //     setLoading(true)
    //     const res = await UsersServices.createUser(user)
    //     if(!user || !res) 
    //         return console.log("coudn't create an account")
    //     else if(res.status === 409)
    //         return res
    //     try {
    //         setCurrentUser(res.data)
    //         setLoggedIn(true)
    //     } catch(err) {
    //         return err
    //     } finally {
    //         setLoading(false)
    //         return res
    //     }
    // }

    // async function login(user) {
    //     setLoading(true)
    //     // const response = (user) => {
    //     //     Object.keys(user)
    //     // }
    //     // console.log(user)
    //     const res = await UsersServices.authenticateUser(user)
    //     // console.log(res)
    //     try {
    //         if(!user || !res) {
    //             return console.log("you are not logged in")
    //         } else {
    //             // delete res.data.password
    //             await setCurrentUser(res.data)
    //             // console.log(res.data)
    //             await setLoggedIn(true)
    //         }
    //     } catch(err) {
    //         console.log(err)
    //     } finally {
    //         setLoading(false)
    //         return res
    //     }
    // }

    async function update(user) {
        setLoading(true)
        // confirm credentials (login & password)
        const authRes = await UsersServices.authenticateUser(user)
        console.log(authRes)
        if(!authRes) {
            return console.log("password incorrect")
        } else {
            const res = await UsersServices.updateUser(user)
            // res.data returns message from backend: "user has been updated to"
            console.log(res)
            if(res.status === 409)
                return res
            try{
                setCurrentUser(res.data)
            } catch(err) {
                console.log(err)
            } finally {
                setLoading(false)
                return res
            }
        }
    }


    const value = {
        currentUser,
        setCurrentUser,
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
        // signup,
        // login,
        update
        // logout
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