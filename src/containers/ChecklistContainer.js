import React, { useEffect, useRef } from 'react';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Controls from '../components/controls/Controls';
import { Form, UseForm } from '../components/UseForm';
import ChecklistItem from '../components/ChecklistItem';
import Descriptions from '../components/content/ChecklistDescriptions';


const initialValues = []
Descriptions.forEach((element, i) => {
    const newElement = {id: (i+1).toString(), description: element, status: null, comments: ""}
    initialValues.push(newElement)
})


export default function Checklist(params) {


    
    // Validation
    const validate = ( fieldValues = formData) => {
        let temp = [...errorArr]
        fieldValues.forEach((element, i) => {
            const error = element.status != null ? "" : "Field is required";
            temp.length === i ? temp.push(error) : temp[i] = error;
        })
        setErrorArr([
            ...temp
        ])
        if(fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }
    
    const { formData, setFormData, errorArr, setErrorArr } = UseForm(initialValues, true, validate);
    

    const refs = useRef([])


    const newFormData = []
    const updatedValues = (data) => {
        newFormData.push(data)
    }


    async function handleSubmit(e) {
        e.preventDefault()
        refs.current.forEach(element => {
            element.requestValues()
        });
        setFormData(newFormData)
    }

    useEffect(() => {
        // console.log(validate())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData])

    return(
        <Box sx={{ p: 2 }}>
            <h1>Checklist</h1>
            <Controls.Button
            text="Home"
            // size="small"
            component={Link} to={"/"}
            />
            <Controls.Button
            text="Dashboard"
            // size="small"
            color="success"
            component={Link} to={"/dashboard"}
            />
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <Paper sx={{ p: 1, maxWidth: '550px', width: '100%' }}>
                    <Form onSubmit={handleSubmit}>
                        {formData.map((item, index) => 
                            <ChecklistItem
                            key={index}
                            initialItemValues={item}
                            updatedValues={updatedValues}
                            ref={(element)=>{refs.current[index]=element}}
                            />
                        )}
                        <Controls.Button
                        text="Save"
                        size="small"
                        type="submit"
                        />
                    </Form>
                </Paper>
            </Box>
        </Box>
    )
};
