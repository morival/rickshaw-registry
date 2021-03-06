require('dotenv').config()
const axios = require('axios').default;

const URL = process.env.REACT_APP_DEFAULT_URL+'users/'
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
async function authenticateUser(data) {
    const testedLogins = ["userLogin", "_id"]
    // Find value of first found key in user that matches testedLogins elements
    const userLogin = Object.keys(data).find((val) => testedLogins.includes(val))
    try {
        const res = (await axios.post(URL+'login', { 
            login: data[userLogin], password: data.password 
        } , config))
        console.log(res)
        return res;
    } catch (err) {
        catchErr(err)
    }
}


// CREATE User
async function createUser(data) {
    try {
        const res = await axios.post(URL, data, config);
        console.log(res)
        return res;
    } catch (err) {
        catchErr(err)
    }
}


// READ User 
async function getUser(data) {
    // console.log(data._id)
    try {
        const res = await axios.get(URL+data._id , config);
        console.log(res)
        return res;
    } catch (err) {
        catchErr(err)  
    }        
}

// TEST Email & Phone Number if already exists
async function testEmailAndPhoneNo(data) {
    try {
        const res = await axios.post(URL+'testForDuplicate', data, config);
        // console.log(res)
        return res;
    } catch (err) {
        catchErr(err)
    }
}


// REQUEST Password Reset
async function requestPasswordReset(data) {
    try {
        const res = await axios.post(URL+'resetPassword', data, config);
        console.log(res)
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
async function updateOneUser(data, updateAs) {
    try {
        const res = await axios.put(URL+updateAs+'/'+data._id, data, config);
        // console.log(res)
        return res;
    } catch (err) {
        catchErr(err)
    }
}
    

// DELETE User
async function deleteOneUser(data) {
    try {
        const res = await axios.delete(URL+data._id);
        return res;
    } catch (err) {
        catchErr(err)
    }
}


// DELETE Many Users
async function deleteManyUsers(data) {
    try {
        const res = await axios.delete(URL, {data: data}, config);
        console.log(res)
        return res;
    } catch (err) {
        catchErr(err)
    }
}

const UsersServices = {
    authenticateUser,
    createUser,
    getUser,
    testEmailAndPhoneNo,
    requestPasswordReset,
    getAllUsers,
    updateOneUser,
    deleteOneUser,
    deleteManyUsers
}

export default UsersServices;