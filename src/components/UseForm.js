import React, {useEffect, useState} from 'react';


export function UseForm(initialValues, validateOnChange=false, validate) {

    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(e)
        // console.log("name: "+name+", value: "+value)
        if(validateOnChange)
        validate({ [name]: value })
    };
    
    const handleInputChangeInListOfObjects = e => {
        const {name, value} = e.target
        console.log(e)
        const newObject = formData.map(obj => obj.id === e.target.id ? {...obj, [name]: value} : obj);
        setFormData(newObject)
    };



    // const handleInputChangeInListOfObjects = e => {
    //     const {name, value} = e.target
    //     console.log(e)
    //     // const getObject = formData.find(({ id }) => id === e.target.id)
        
    //     setObject({ 
    //         ...object, 
    //         [name]: value
    //     });
    //     // console.log("name: "+name+", value: "+value)
    // };



    // useEffect(() => {
    //     console.log(object)
    // },[object])

    useEffect(() => {
        console.log(formData)
    },[formData])
    
    return {
        formData,
        setFormData,
        errors,
        setErrors,
        handleInputChange,
        handleInputChangeInListOfObjects
    }
}


export function Form(props) {

    const {children, ...other} = props;

    return(
        <form {...other}>
            {props.children}
        </form>
    )
}

