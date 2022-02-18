import React, {useEffect, useState} from 'react';


export function UseForm(initialValues, validateOnChange=false, validate) {

    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [errorArr, setErrorArr] = useState([]);

    const handleInputChange = e => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        });
        // console.log(e)
        console.log("name: "+name+", value: "+value)
        if(validateOnChange)
        validate({ [name]: value })
    };

    useEffect(() => {
        // console.log(formData)
    },[formData])
    
    return {
        formData,
        setFormData,
        errors,
        setErrors,
        errorArr,
        setErrorArr,
        handleInputChange
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

