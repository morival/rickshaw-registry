import React, { createContext, useContext, useEffect, useState } from 'react';
import UsersServices from '../../services/UsersServices';
import RecordsServices from '../../services/RecordsServices';
import { useCookies } from 'react-cookie';



const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const [user, setUser] = useState(cookies.user);
    const [rememberMe, setRememberMe] = useState(cookies.rememberMe==="true"?true:false);
    const [recordId, setRecordId] = useState();
    const [records, setRecords] = useState();
    const [loggedIn, setLoggedIn] = useState(cookies.loggedIn);
    const [loading, setLoading] = useState();


    // Services
    const { authenticateUser, createUser, getUser, testEmail, testPhoneNo, getAllUsers, updateUser, deleteUser } = UsersServices
    const { createRecord, getRecord, getAllRecords, getUserRecords, deleteRecord, deleteUserRecord } = RecordsServices

    async function authenticate(data) {
        setRememberMe(data.rememberMe)
        return await authenticateUser(data)
    }

    async function testEmailAndPhoneNo(data) {
        console.log("checking if email or phone number exists")
        const resEmail = await testEmail(data)
        const resPhoneNo = await testPhoneNo(data)
        if (resEmail.status === 200)
            return resEmail
        else if (resPhoneNo.status === 200)
            return resPhoneNo
        else
            return undefined
    }
    
    function login(data) {
        setUser(data)
        setLoggedIn(true)
    }

    function logout() {
        setLoading(true)
        removeCookie('user')
        removeCookie('loggedIn')
        removeCookie('rememberMe')
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
        testEmail,
        testPhoneNo,
        testEmailAndPhoneNo,
        getAllUsers,
        updateUser,
        deleteUser,
        createRecord,
        getRecord,
        getAllRecords,
        getUserRecords,
        deleteRecord,
        deleteUserRecord,
        login,
        logout,
        rememberMe,
        setCookie
    }

    useEffect(() => {
        if (rememberMe && user) {
            console.log(user)
            setCookie('user', user, { path:'/' })
            setCookie('loggedIn', true, { path:'/' })
            setCookie('rememberMe', rememberMe, { path:'/' })
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