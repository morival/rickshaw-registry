import React, { useState} from 'react';


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
        if(validateOnChange)
            validate({ [name]: value })
    };

    const resetForm = () => {
        setFormData(initialValues);
        setErrors({});
        setErrorArr([]);
    }

    
    return {
        formData,
        setFormData,
        errors,
        setErrors,
        errorArr,
        setErrorArr,
        handleInputChange,
        resetForm
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

