const profileTabs = [
    "Contact and basic info",
    "Address details",
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
        label: "Password",
        name: "password",
        type: "password"
    },
]

const profileContent = {
    profileTabs,
    profileDetails
}

export default profileContent;
