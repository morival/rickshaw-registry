import React, { useEffect, useRef } from 'react';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Controls from '../components/controls/Controls';
import { useAuth } from '../components/context/AuthContext';
import { Form, UseForm } from '../components/UseForm';
import ChecklistItem from '../components/ChecklistItem';
import Content from '../components/content/ChecklistDescriptions';
import { useHistory } from "react-router-dom";


const initialValues = []
Content.forEach((element, i) => {
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
    

    // Forms
    const { formData, setFormData, errorArr, setErrorArr } = UseForm(initialValues, true, validate);
    // Auth Context
    const { user, setRecordId, loggedIn, createRecord } = useAuth();

    const refs = useRef([]);

    let history = useHistory();


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
    
    // Ref to block useEffect from fireing at first render
    const isFirstRender = useRef(true)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        async function saveRecord() {
            const user_id = user._id
            const record_date = new Date()
            const record = {user_id: user_id, record_date: record_date, checklist: formData}
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
                component={Link} to={"/"}
            />
            <Controls.Button
                text="Records"
                color="error"
                component={Link} to={"/records"}
            />
            <Controls.Button
                text="Dashboard"
                color="success"
                component={Link} to={"/dashboard"}
            />
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <Paper sx={{ p: 1, maxWidth: '700px', width: '100%' }}>
                    <Form onSubmit={handleSubmit}>
                        {formData.map((element, i) => 
                            <ChecklistItem
                                initialItemValues={element}
                                updatedValues={updatedValues}
                                ref={(item)=>{refs.current[i]=item}}
                                key={i}
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
