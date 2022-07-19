import React, { createContext, useContext, useEffect, useState } from 'react';
import UsersServices from 'services/UsersServices';
import RecordsServices from 'services/RecordsServices';
import ChecklistServices from 'services/ChecklistServices';
import { useCookies } from 'react-cookie';


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
    const { authenticateUser, createUser, getUser, testEmailAndPhoneNo, requestPasswordReset, getAllUsers, updateOneUser, deleteOneUser, deleteManyUsers } = UsersServices
    const { createRecord, getRecord, getAllRecords, getAllUserRecords, deleteRecord, deleteUserRecord } = RecordsServices
    const { createOneDescription, getAllDescriptions, updateOneDescription, deleteOneDescription, deleteManyDescription } = ChecklistServices

    // Authenticate
    async function authenticate(data) {
        setRememberMe(data.rememberMe)
        return await authenticateUser(data)
    }

    // Signup
    async function signup(data) {
        console.log(data)
        const res = await createUser(data)
        if (res && res.status === 201)
            login(res.data)
    }
    
    // Login
    async function login(data) {
        console.log(data)
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
        setLoggedIn(false)
        setUser(null)
        setRecordId(null)
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

    async function updateUser(data, updateAs) {
        try {
            const res = await updateOneUser(data, updateAs)
            if(res && res.status === 200) {
                if(updateAs === "user" || data._id === user._id) {
                    setUser(res.data)
                    if (rememberMe)
                        setCookie('user', res.data, { path:'/' })
                }
            }
            return res;
        } catch (err) {
            catchErr(err)
        }
    }

    async function deleteUser(data) {
        try {
            const res = await deleteOneUser(data);
            if (res && res.status < 300)
                findUsers();
            return res;
        } catch (err) {
            catchErr(err)
        }
    }
    
    async function deleteUsers(data) {
        try {
            const res = await deleteManyUsers(data);
            if (res && res.status < 300)
                findUsers();
            return res;
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
        testEmailAndPhoneNo,
        requestPasswordReset,
        findUsers,
        updateUser,
        deleteUser,
        deleteUsers,
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
        signup,
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