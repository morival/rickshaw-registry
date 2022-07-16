import React, { createContext, useContext, useEffect, useState } from 'react';
import UsersServices from '../../services/UsersServices';
import RecordsServices from '../../services/RecordsServices';
import { useCookies } from 'react-cookie';
import ChecklistServices from '../../services/ChecklistServices';


// Catch Error
function catchErr(err) {
    if(err.response){
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
    } else {
        console.log(`Error: ${err.message}`)
    }
}


const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const [user, setUser] = useState(cookies.user);
    const [users, setUsers] = useState(cookies.users);
    const [rememberMe, setRememberMe] = useState(cookies.rememberMe==="true"?true:false);
    const [descriptions, setDescriptions] = useState(cookies.descriptions)
    const [recordId, setRecordId] = useState();
    const [records, setRecords] = useState();
    const [loggedIn, setLoggedIn] = useState(cookies.loggedIn);
    const [loading, setLoading] = useState();


    // Services
    const { authenticateUser, createUser, getUser, testEmail, testPhoneNo, requestPasswordReset, getAllUsers, updateUser, updateUserAsAdmin, deleteUser } = UsersServices
    const { createRecord, getRecord, getAllRecords, getAllUserRecords, deleteRecord, deleteUserRecord } = RecordsServices
    const { createOneDescription, getAllDescriptions, updateOneDescription, deleteOneDescription, deleteManyDescription } = ChecklistServices

    // Authenticate
    async function authenticate(data) {
        setRememberMe(data.rememberMe)
        return await authenticateUser(data)
    }

    // Email and Phone Number Test
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
    
    // Login
    async function login(data) {
        setUser(data);
        findUsers();
        findDescriptions();
        setLoggedIn(true);
    }

    // Logout
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
    
    
    // RECORDS
    async function getUserRecords(user) {
        try {
            const filteredRecords = await getAllUserRecords(user);
            setRecords(filteredRecords.data)
        } catch (err) {
            
        }
    }

    
    // DESCRIPTIONS
    async function findDescriptions() {
        const descriptionsList = await getAllDescriptions();
        setDescriptions(descriptionsList.data);
        setCookie('descriptions', descriptionsList.data, { path: '/' });
    }
    
    async function createDescription(data) {
        try {
            const res = await createOneDescription(data);
            if (res && res.status < 300)
                findDescriptions();
            return res;
        } catch (err) {
            catchErr(err)
        }
    }

    async function updateDescription(data) {
        try {
            const res = await updateOneDescription(data);
            if (res && res.status < 300)
                findDescriptions();
            return res;
        } catch (err) {
            catchErr(err)
        }
    }

    async function deleteDescription(data) {
        try {
            const res = await deleteOneDescription(data);
            if (res && res.status < 300)
                findDescriptions();
            return res;
        } catch (err) {
            catchErr(err)
        }
    }
    
    async function deleteDescriptions(data) {
        try {
            const res = await deleteManyDescription(data);
            if (res && res.status < 300)
                findDescriptions();
            return res;
        } catch (err) {
            catchErr(err)
        }
    }


    // USERS
    async function findUsers() {
        try {
            const usersList = await getAllUsers();
            setUsers(usersList.data)
            setCookie('users', usersList.data, { path: '/' });
        } catch (err) {
            catchErr(err)
        }
    }


    const value = {
        user,
        setUser,
        users,
        setUsers,
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
        requestPasswordReset,
        findUsers,
        updateUser,
        updateUserAsAdmin,
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
        deleteDescriptions,
        login,
        logout,
        rememberMe,
        setCookie
    }


    useEffect(() => {
        if (rememberMe && user) {
            // console.log(user)
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