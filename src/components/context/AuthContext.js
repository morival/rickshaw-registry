import React, { useContext, useState } from 'react';
import { useLocalStorage } from '../UseLocalStorage';
import UsersServices from '../../services/UsersServices';


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useLocalStorage('loading', false);


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

    async function login(user) {
        setLoading(true)
        const res = await UsersServices.authenticateUser(user)
        try {
            if(!user || !res){
                return console.log("you are not logged in")
            } else {
                setCurrentUser(res.data)
                setLoggedIn(true)
                localStorage.setItem('user', JSON.stringify(user))
            }
        } catch(err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    function logout() {
        setLoading(true)
        setCurrentUser(null)
        localStorage.clear();
        setLoading(false)
    }

    // useEffect(() => {
    //     if (currentUser){
    //         console.log("current user: "+JSON.stringify(currentUser))
    //         console.log(localStorage.getItem('user'))
    //         console.log("is logged in: "+loggedIn)
    //     }
    // },[loading]);

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