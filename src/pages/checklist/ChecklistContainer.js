import React, { useEffect, useRef } from 'react';
import { Paper, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Controls from 'components/controls/Controls';
import { useAuth } from 'context/AuthContext';
import { Form, UseForm } from 'components/UseForm';
import ChecklistItem from './ChecklistItem';
// import Content from 'components/content/ChecklistDescriptions';
import { useHistory } from "react-router-dom";

// const initialValues = []
// Content.forEach((element, i) => {
//         const newElement = {id: (i+1).toString(), description: element, status: null, comments: ""}
//     initialValues.push(newElement)
// })

export default function Checklist(params) {

    
    // Validation
    const validate = ( fieldValues = formData) => {
        let temp = [...errorArr]
        fieldValues.forEach((element, i) => {
            const error = element.status !== "" ? "" : "Field is required";
            temp.length === i ? temp.push(error) : temp[i] = error;
        })
        setErrorArr([
            ...temp
        ])
        if(fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }

    // Auth Context
    const { user, descriptions, setRecordId, loggedIn, createRecord } = useAuth();
    // Forms
    const { formData, setFormData, errorArr, setErrorArr } = UseForm(descriptions, true, validate);
    const refs = useRef([]);
    
    let history = useHistory();

    const newFormData = [];
    const updatedValues = (data) => {
        newFormData.push(data);
    }


    async function handleSubmit(e) {
        e.preventDefault();
        refs.current.forEach(el => el.requestValues());
        setFormData(newFormData);
    }

    function resetAllForms(e) {
        e.preventDefault();
        refs.current.forEach(el => el.reset())
    }

    
    // Ref to block useEffect from fireing at first render
    const isFirstRender = useRef(true)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        async function saveRecord() {
            const record = {user_id: user._id, record_date: new Date(), checklist: formData}
            try {
                if (validate() && loggedIn) {
                    console.log(record)
                    const res = await createRecord(record)
                    const newRecordId = res.data._id
                    if (res.status===201) {
                        setRecordId(newRecordId)
                        history.push('/records')
                    }
                }
            } catch (err){
                console.log(err)
            }
        }
        saveRecord();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData])

    return(
        <Box sx={{ p: 2 }}>
            <h1>Checklist</h1>
            <Controls.Button
                text="Home"
                component={Link} to={"/"} />
            <Controls.Button
                text="Records"
                color="error"
                component={Link} to={"/records"} />
            <Controls.Button
                text="Dashboard"
                color="success"
                component={Link} to={"/dashboard"} />
            <Controls.Button
                text="Admin Panel"
                color="secondary"
                component={Link} to={"/admin"} />
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <Paper sx={{ p: 1, maxWidth: '700px', width: '100%' }}>
                    <Form onSubmit={handleSubmit}>
                        {formData.map((element, i) => 
                        <ChecklistItem
                            initialValues={element}
                            updatedValues={updatedValues}
                            ref={(item)=>{refs.current[i]=item}}
                            key={i} />
                        )}
                        <Stack direction='row' sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Controls.Button
                                text="Save"
                                size="small"
                                type="submit" />
                            <Controls.Button
                                text="Reset Form"
                                size="small"
                                onClick={resetAllForms} />
                        </Stack>
                    </Form>
                </Paper>
            </Box>
        </Box>
    )
};
