import React, { useEffect, useRef } from 'react';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Controls from './controls/Controls';
import { Form, UseForm } from './UseForm';
import ChecklistItem from './controls/ChecklistItem';


const descriptionList= [
    // "Identification plate fitted",
    // "Wheels not wobbling",
    // "Tires with tread pattern clearly visible",
    // "Tire pressure at 60psi ???",
    // "Spokes not loose/broken",
    // "Structure, frame, bolts are ok",
    // "Wheels guards and shields in place",
    // "At least one front light working",
    // "At least two rear lights working",
    // "Two rear retro reflectors",
    // "Bell working",
    // "At least one mirror fitted",
    // "Seat post adjusted",
    // "Front and rear chain tight",
    // "Gears switching properly and not skipping",
    // "Front brake effective",
    // "Rear brake effective",
    // "Seatbelt with EC or BSI mark",
    // "Handlebar, headset secure",
    // "High visibility markings on passenger's handles",
    // "Canopy in fixed position",
    // "Forks straight",
    // "Floor covering made of non-slip material",
    "Clean and presentable",
    "Repair kit ???"
]


const initialValues = []
descriptionList.forEach((element, i) => {
    const newElement = {id: (i+1).toString(), description: element, status: null, comments: ""}
    initialValues.push(newElement)
})


export default function Checklist(params) {


    
    // Validation
    const validate = ( fieldValues = formData) => {
        let temp = [...errorArr]
        // console.log(fieldValues)
        fieldValues.forEach((element, i) => {
            const error = element.status != null ? "" : "Field is required";
            temp.length === i ? temp.push(error) : temp[i] = error;
        })
        // console.log(temp)
        setErrorArr([
            ...temp
        ])
        // console.log(errorArr)
        if(fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }
    
    const { formData, setFormData, errorArr, setErrorArr } = UseForm(initialValues, true, validate);
    

    // const refSubmit = useRef(null);
    const refs = useRef([])


    const newFormData = []
    const updatedValues = (data) => {
        // console.log(data)
        newFormData.push(data)
        // console.log(newFormData)
    }


    async function handleSubmit(e) {
        e.preventDefault()
        refs.current.forEach(element => {
            element.requestValues()
        });
        setFormData(newFormData)
    }

    useEffect(() => {
        console.log(validate())
    }, [formData])

    return(
        <Box sx={{ p: 2 }}>
            <h1>Checklist</h1>
            <Controls.Button
            text="Home"
            size="small"
            component={Link} to={"/"}
            />
            <Controls.Button
            text="Dashboard"
            size="small"
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
                        type="submit"
                        />
                    </Form>
                </Paper>
            </Box>
        </Box>
    )
};
