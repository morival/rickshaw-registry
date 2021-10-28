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
        try {
            const res = (await axios.post(URL+'login', {
                login: user.userLogin,
                password: user.password
            }))
            // console.log(res);
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

    // TO BE TESTED

    // async updateUser(user) {
    //     try {
    //         const res = (await axios.put(URL+user.id, {
    //             name: user.name,
    //             email: user.email,
    //             phoneNumber: user.phoneNumber,
    //             password: user.password,
    //             registerDate: user.registerDate
    //         }))
    //         console.log(res)
    //     } catch (err) {
    //         console.error(err);
    //     }        
    // },

    // async deleteUser(user) {
    //     try {
    //         const res = (await axios.delete(URL+user.id))
    //         console.log(res)
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
}