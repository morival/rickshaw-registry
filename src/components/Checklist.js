import React from 'react';
import { Paper, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Controls from './controls/Controls';
import { UseForm } from './UseForm';
import ChecklistItem from './controls/ChecklistItem';


const descriptionList= [
    "Identification plate fitted",
    "Wheels not wobbling",
    "Tires with tread pattern clearly visible",
    "Tire pressure at 60psi ???",
    "Spokes not loose/broken",
    "Structure, frame, bolts are ok",
    "Wheels guards and shields in place",
    "At least one front light working",
    "At least two rear lights working",
    "Two rear retro reflectors",
    "Bell working",
    "At least one mirror fitted",
    "Seat post adjusted",
    "Front and rear chain tight",
    "Gears switching properly and not skipping",
    "Front brake effective",
    "Rear brake effective",
    "Seatbelt with EC or BSI mark",
    "Handlebar, headset secure",
    "High visibility markings on passenger's handles",
    "Canopy in fixed position",
    "Forks straight",
    "Floor covering made of non-slip material",
    "Clean and presentable",
    "Repair kit ???"
]


const initialValues = []
descriptionList.forEach((item, i) => {
    const newItem = {id: (i+1).toString(), description: item, status: null, comments: ""}
    initialValues.push(newItem)
})


export default function Checklist(params) {


    
    // Validation
    const validate = ( fieldValues = formData) => {
        let temp = {...errors}
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
        return Object.values(temp).every(x => x === "")
    }
    
    const { formData, errors, setErrors } = UseForm(initialValues, true, validate);
    
    async function handleSubmit(e) {
        e.preventDefault()
        // console.log(e)
        // updateValues()
        // console.log(formData)
    }

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
                <Paper sx={{ p: 1, maxWidth: '1000px', width: '100%' }}>
                    <Stack sx={{ width: '100%' }}>
                        {formData.map((item, index) => 
                            <ChecklistItem
                            key={index}
                            initialItemValues={item}
                            // updateValues={updateValues}
                            // onChange={handleInputChangeInListOfObjects}
                            />
                        )}
                        <Controls.Button
                        text="Save"
                        onClick={handleSubmit}
                        />
                    </Stack>
                </Paper>
            </Box>
        </Box>
    )
};
