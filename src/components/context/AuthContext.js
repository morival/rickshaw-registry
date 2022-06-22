import React, { createContext, useContext, useEffect, useState } from 'react';
import UsersServices from '../../services/UsersServices';
import RecordsServices from '../../services/RecordsServices';
import { useCookies } from 'react-cookie';
import ChecklistServices from '../../services/ChecklistServices';



const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const [user, setUser] = useState(cookies.user);
    const [rememberMe, setRememberMe] = useState(cookies.rememberMe==="true"?true:false);
    const [descriptions, setDescriptions] = useState(cookies.descriptions)
    const [recordId, setRecordId] = useState();
    const [records, setRecords] = useState();
    const [loggedIn, setLoggedIn] = useState(cookies.loggedIn);
    const [loading, setLoading] = useState();


    // Services
    const { authenticateUser, createUser, getUser, testEmail, testPhoneNo, getAllUsers, updateUser, deleteUser } = UsersServices
    const { createRecord, getRecord, getAllRecords, getUserRecords, deleteRecord, deleteUserRecord } = RecordsServices
    const { createOneDescription, getAllDescriptions, updateOneDescription, deleteOneDescription, deleteManyDescription } = ChecklistServices

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
    
    async function login(data) {
        setUser(data)
        findDescriptions();
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

    async function findDescriptions() {
        const descriptionsList = await getAllDescriptions()
        setDescriptions(descriptionsList.data)
        setCookie('descriptions', descriptionsList.data, { path: '/' })
    }

    async function createDescription(data) {
        try {
            const res = await createOneDescription(data)
            if (res && res.status < 300) {
                findDescriptions();
                return res;
            }
        } catch (err) {
            if(err.response){
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error: ${err.message}`)
            }
        }
    }

    async function updateDescription(data) {
        try {
            const res = await updateOneDescription(data)
            if (res && res.status < 300) {
                findDescriptions();
                return res;
            }
        } catch (err) {
            if(err.response){
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error: ${err.message}`)
            }
        }
    }

    async function deleteDescription(data) {
        try {
            const res = await deleteOneDescription(data)
            if (res && res.status < 300) {
                findDescriptions();
                return res;
            }
        } catch (err) {
            if(err.response){
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error: ${err.message}`)
            }
        }
    }

    const value = {
        user,
        setUser,
        descriptions,
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
        createDescription,
        getAllDescriptions,
        updateDescription,
        deleteDescription,
        deleteManyDescription,
        login,
        logout,
        rememberMe,
        setCookie
    }


    useEffect(() => {
        if (rememberMe && user) {
            console.log(user)
            setCookie('user', user, { path: '/' })
            setCookie('loggedIn', true, { path: '/' })
            setCookie('rememberMe', rememberMe, { path: '/' })
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