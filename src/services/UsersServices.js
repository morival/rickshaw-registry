require('dotenv').config()
const axios = require('axios').default;

const URL = process.env.REACT_APP_DEFAULT_URL+"users/"
// const URL = "https://parseapi.back4app.com/classes/users";


let config = {
    headers : {
        "X-Parse-Application-Id": process.env.REACT_APP_APP_ID,
        "X-Parse-REST-API-Key": process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json"
    }, validateStatus: (status) => status
}

function catchErr(err) {
    if(err.response){
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
    } else {
        console.log(`Error: ${err.message}`)
    }
}


// AUTH User
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
    } catch (err) {
        catchErr(err)
    }
}


// CREATE User
async function createUser(user) {
    try {
        const res = await axios.post(URL, user, config);
        // console.log(res)
        return res;
    } catch (err) {
        catchErr(err)
    }
}


// READ User 
async function getUser(user) {
    try {
        const res = await axios.get(URL+user.id , config);
        // console.log(res)
        return res;
    } catch (err) {
        catchErr(err)  
    }        
}        


// READ ALL Users
async function getAllUsers() {
    try {
        const res = await axios.get(URL, config);
        // console.log(res.data);
        return res;
    } catch (err) {
        catchErr(err)  
    }    
}    


// UPDATE User
async function updateUser(user) {
    try {
        const res = await axios.put(URL+user._id, user, config);
        // console.log(res)
        return res;
    } catch (err) {
        catchErr(err)
    }
}
    

// DELETE User
async function deleteUser(user) {
    try {
        const res = await axios.delete(URL+user.id);
        return res;
    } catch (err) {
        catchErr(err)
    }
}

const UsersServices = {
    authenticateUser,
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
}

export default UsersServices;