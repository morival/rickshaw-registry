const signupContent = [
    {
        name: "name"
    },{
        name: "email",
        type: "email"
    },{
        label: "Phone Number",
        name: "phoneNumber",
        type: "tel"
    },{
        name: "password",
        type: "password"
    },{
        label: "Confirm Password",
        name: "confirmPassword",
        type: "password"
    }
]

const loginContent = [
    {
        label: "Email or Phone",
        name: "userLogin"
    },{
        name: "password",
        type: "password"
    }
]

const signupLoginContent = {
    signupContent,
    loginContent
}

export default signupLoginContent;