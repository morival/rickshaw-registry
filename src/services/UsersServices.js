const axios = require('axios').default;

const URL = "http://localhost:3001/api/users/";


async function authenticateUser(user) {
    const testedLogins = ["userLogin", "_id"]
    // Find value of first found key in user that matches testedLogins elements
    const userLogin = Object.keys(user).find((val) => testedLogins.includes(val))
    // console.log(userLogin)
    // console.log(user.password)
    try {
        const res = (await axios.post(URL+'login', { 
            login: user[userLogin], password: user.password 
        } , {
            validateStatus: (status) => status
        }))
        console.log(res.data.message)
        return res;
    } catch(err) {
        if(err.response){
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else {
            console.log(`Error: ${err.message}`)
        }
    }
}


async function getUser(id) {
    try {
        const res = (await axios.get(URL+id , {
            validateStatus: (status) => status
        }))
        delete res.data.password
        console.log(res)
        return res
    } catch(err) {
        if(err.response){
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else {
            console.log(`Error: ${err.message}`)
        }
    }
}


async function getAllUsers() {
    try {
        const res = (await axios.get(URL));
        console.log(res.data);
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


async function createUser(user) {
    try {
        const res = (await axios.post(URL, {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password,
            registerDate: user.registerDate
        }, 
        {
            validateStatus: (status) => {
                return status
            }
        }))
        delete res.data.password
        console.log(res)
        return res;
    } catch(err) {
        if(err.response){
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else {
            console.log(`Error: ${err.message}`)
        }
    }
}


async function updateUser(user) {
    try {
        const res = (await axios.put(URL+user._id, user, {
            validateStatus: (status) => status
        }))
        delete res.data.password
        console.log(res)
        return res;
    } catch(err) {
        if(err.response){
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else {
            console.log(`Error: ${err.message}`)
        }
    }
}
    
                
// TO BE TESTED

// async deleteUser(user) {
//     try {
//         const res = (await axios.delete(URL+user.id))
//         console.log(res)
//     } catch (err) {
//         console.error(err);
//     }
// }

const UsersServices = {
    authenticateUser,
    getUser,
    getAllUsers,
    createUser,
    updateUser
}
export default UsersServices;