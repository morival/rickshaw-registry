import React, {useState} from 'react';


export function UseForm(initialValues, validateOnChange=false, validate) {

    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]:value
        });
        console.log(value)
        if(validateOnChange)
        validate({[name]: value})
    };
    const handleClickShowPassword = () => {
        setFormData({
          ...formData,
          showPassword: !formData.showPassword,
        });
      };
    
    return {
        formData,
        errors,
        setErrors,
        handleInputChange,
        handleClickShowPassword
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

