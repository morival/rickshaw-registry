import React, {useEffect, useState} from 'react';


export function UseForm(initialValues, validateOnChange=false, validate) {

    const [formData, setFormData] = useState(initialValues);
    const [object, setObject] = useState({});
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
        const getObject = formData.find(({ id }) => id === e.target.id)
        // console.log(e)
        setObject({ ...getObject, [name]: value })
        // console.log(object)
        // setObject({ ...getObject, id: parseInt(e.target.id), comments: value })
    };
    useEffect(() => {
        if(object.id) {
            const updatedObject = formData.map((item) => item.id === object.id ? object : item)
            setFormData(updatedObject)
            console.log(updatedObject)
        }
    },[object])
    
    return {
        formData,
        setFormData,
        object,
        setObject,
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

