require('dotenv').config()
const axios = require('axios').default;

const URL = process.env.REACT_APP_DEFAULT_URL+"checklist/"

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


// CREATE Checklist Description
async function createOneDescription(data) {
    try {
        const res = await axios.post(URL, data, config);
        console.log(res);
        return res;
    } catch (err) {
        catchErr(err)
    }
}


// READ ALL Descriptions
async function getAllDescriptions() {
    try {
        const res = await axios.get(URL, config);
        // console.log(res);
        return res;
    } catch (err) {
        catchErr(err)
    }
}


// UPDATE Description
async function updateOneDescription(data) {
    try {
        const res = await axios.patch(URL+data._id, data, config);
        // console.log(res)
        return res;
    } catch (err) {
        catchErr(err)
    }
}


// DELETE Description
async function deleteOneDescription(data) {
    try {
        const res = await axios.delete(URL+data._id);
        // console.log(res)
        return res;
    } catch (err) {
        catchErr(err)
    }
}


// DELETE Many Descriptions
async function deleteManyDescription(data) {
    try {
        const res = await axios.delete(URL, data, config);
        console.log(res)
        return res;
    } catch (err) {
        catchErr(err)
    }
}


const ChecklistServices = {
    createOneDescription,
    getAllDescriptions,
    updateOneDescription,
    deleteOneDescription,
    deleteManyDescription
}

export default ChecklistServices;