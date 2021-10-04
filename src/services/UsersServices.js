const axios = require('axios').default;

const URL = "http://localhost:3001/api/users/";

export default {
    async getAllUsers() {
        try {
            const res = (await axios.get(URL)).data;
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    },

    // async createUser(user) {
    //     console.log(user)
    //     try {
    //         const res = (await axios.post(URL), {
    //             name: user.name,
    //             password: user.password
    //         })
    //         console.log(res);
    //     } catch (err) {
    //         console.error(err);
    //     }
    createUser(user) {
        axios.post(URL, {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password,
            registerDate: user.registerDate
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    },

    // async updateUser(user) {
    //     try {

    //     } catch (err) {
    //         console.error(err);
    //     }        
    // },

    // async deleteUser(user) {
    //     try {

    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
}