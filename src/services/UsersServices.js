const axios = require('axios').default;

const URL = "http://localhost:3001/api/users/";

export default {
    async getAllUsers() {
        try {
            const res = (await axios.get(URL));
            console.log(res.data);
        } catch (err) {
            // console.error(err);
            if(err.response){
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error: ${err.message}`)
            }
        }
    },
    async authenticateUser(user) {
        const testedLogins = ["userLogin", "_id"]
        // Find value of first found key in user that matches testedLogins elements
        const login = Object.keys(user).find((val) => {
            return testedLogins.includes(val)
        })
        const res = (await axios.post(URL+'login', {
            login: user[login],
            password: user.password
        }))
        try {
            // Clear password from the retreived user details
            console.log("authenticateUser: "+res.status)
            delete res.data.password
            return res;
        } catch(err) {
            // console.error(err);
            if(err.response){
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error: ${err.message}`)
            }
        }
    },

    async createUser(user) {
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
    },

    
    async updateUser(user) {
        // console.log(user._id)
        try {
            const res = (await axios.put(URL+user._id, user, {
                validateStatus: (status) => {
                    return status
                }
            }))
            console.log(res)
            return res;
        } catch(err) {
            // console.error(err);
            if(err.response){
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error: ${err.message}`)
            }
        }
    },
    
                
    // TO BE TESTED

    // async deleteUser(user) {
    //     try {
    //         const res = (await axios.delete(URL+user.id))
    //         console.log(res)
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
}