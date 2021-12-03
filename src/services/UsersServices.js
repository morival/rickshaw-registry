const axios = require('axios').default;

const URL = "http://localhost:3001/api/users/";

export default {
    async getAllUsers() {
        try {
            const res = (await axios.get(URL));
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async authenticateUser(user) {
        // console.log(user)
        const testedLogins = ["userLogin", "_id"]
        // Find value of first found key in user that matches testedLogins elements
        const login = Object.keys(user).find((val) => {
            return testedLogins.includes(val)
        })
        // console.log(user[login])
        const res = (await axios.post(URL+'login', {
            login: user[login],
            password: user.password
        }))
        // console.log(res);
        try {
            return res;
        } catch (err) {
            console.error(err);
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
            // console.log(res)
            return res;
        } catch (err) {
            console.error(err);
        }
    },

    
    async updateUser(user) {
        // console.log(user._id)
        try {
            const res = (await axios.put(URL+user._id, {
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                    dOB: user.dOB,
                    password: user.password
                }))
            // console.log(res)
        } catch (err) {
                console.error(err);
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