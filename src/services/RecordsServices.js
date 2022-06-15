require('dotenv').config()
const axios = require('axios').default;

const URL = process.env.REACT_APP_DEFAULT_URL+"records/"

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


// CREATE Record
async function createRecord(record) {
    try {
        const res = await axios.post(URL, record, config);
        console.log(res);
        return res;
    } catch (err) {
        catchErr(err)
    }
}


// READ Record
async function getRecord(record) {
    try {
        const res = await axios.get(URL+record.id, config);
        console.log(res)
        return res;
    } catch (err) {
        catchErr(err)  
    }   
}


// READ ALL Records
async function getAllRecords() {
    try {
        const res = await axios.get(URL, config)
        // console.log(res);
        return res;
    } catch (err) {
        catchErr(err)
    }
}

// READ User Records
async function getUserRecords(user) {
    try {
        const res = await axios.get(URL+"user/"+user._id, config)
        // console.log(res);
        return res;
    } catch (err) {
        catchErr(err)
    }
}


// DELETE Record
async function deleteRecord(record) {
    try {
        const res = await axios.delete(URL+record._id);
        // console.log(res)
        return res;
    } catch (err) {
        catchErr(err)
    }
}


// DELETE User Records
async function deleteUserRecord(record) {
    try {
        const res = await axios.delete(URL+record._id);
        // console.log(res)
        return res;
    } catch (err) {
        catchErr(err)
    }
}


const RecordsServices = {
    createRecord,
    getRecord,
    getAllRecords,
    getUserRecords,
    deleteRecord,
    deleteUserRecord
}

export default RecordsServices;