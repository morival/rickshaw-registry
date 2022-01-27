import React, {useState} from 'react';


export function UseForm(initialValues, validateOnChange=false, validate) {

    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        });
        console.log("name: "+name+", value: "+value)
        if(validateOnChange)
        validate({ [name]: value })
    };
    
    return {
        formData,
        setFormData,
        errors,
        setErrors,
        handleInputChange,
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

