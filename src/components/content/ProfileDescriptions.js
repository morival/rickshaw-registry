const profileTabs = [
    "Contact and basic info",
    "Address details",
    "Licence",
    "Security"
]

const profileDetails = [
    {
        label: "Name",
        name: "name"
    },{
        label: "Email",
        name: "email",
        type: "email"
    },{
        label: "Phone Number",
        name: "phoneNumber",
        type: "tel"
    },{
        label: "Date of Birth",
        name: "dOB",
        type: "date"
    },{
        label: "Address Line 1",
        name: "line_1"
    },{
        label: "Address Line 2",
        name: "line_2"
    },{
        label: "Address Line 3",
        name: "line_3"
    },{
        label: "Town or City",
        name: "post_town"
    },{
        label: "Postcode",
        name: "postcode"
    },{
        label: "Licence Type",
        name: "lic_type"
    },{
        label: "Licence Number",
        name: "lic_no"
    },{
        label: "Name on the Licence",
        name: "lic_name"
    },{
        label: "Issued by",
        name: "lic_isb"
    },{
        label: "Issued on",
        name: "lic_iso",
        type: "date"
    },{
        label: "Expires on",
        name: "lic_exp",
        type: "date"
    },{
        label: "Password",
        name: "password",
        type: "password"
    },{
        label: "Confirm Password",
        name: "confirmPassword",
        type: "password"
    // },{
    //     label: "Account Type",
    //     name: "acc_type"
    }
]

const profileContent = {
    profileTabs,
    profileDetails
}

export default profileContent;
