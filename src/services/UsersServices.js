const axios = require('axios').default;

const URL = "http://localhost:3001/api/users/";
// const URL = "https://parseapi.back4app.com/classes/users";

let config = {
    headers : {
        "X-Parse-Application-Id": "4oFovioSMOe1CJiiw8UeO3FdHEkHbka7FZx2awzn",
        "X-Parse-REST-API-Key": "Rszcv5J1Q794frmM5Qrt4JHJizmP0WPdti70vvQN",
        "Content-Type": "application/json"
    }, validateStatus: (status) => status
}


async function authenticateUser(user) {
    const testedLogins = ["userLogin", "_id"]
    // Find value of first found key in user that matches testedLogins elements
    const userLogin = Object.keys(user).find((val) => testedLogins.includes(val))
    try {
        const res = (await axios.post(URL+'login', { 
            login: user[userLogin], password: user.password 
        } , config))
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


async function getUser(user) {
    try {
        const res = (await axios.get(URL+user.id , config))
        // delete res.data.password
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
        const res = (await axios.get(URL, config));
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
        }, config))
        // delete res.data.password
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
        const res = (await axios.put(URL+user._id, user, config))
        // delete res.data.password
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
    

async function deleteUser(user) {
    try {
        const res = (await axios.delete(URL+user.id))
        return res;
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

const UsersServices = {
    authenticateUser,
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}
export default UsersServices;