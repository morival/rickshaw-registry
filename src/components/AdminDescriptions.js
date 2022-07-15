import { List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DescriptionItem from './AdminDescriptionItem';
import { useAuth } from './context/AuthContext';


export default function AdminDescriptions(params) {
    

    // Auth Context
    const { descriptions, deleteDescriptions } = useAuth();


    // Array of Checkboxes
    const [checkboxes, setCheckboxes] = useState([]);
    function handleCheckbox(e) {
        const data = checkboxes.map(el => {
            if (el.name === e.target.name) {el.value = e.target.value}
            return el
        })
        setCheckboxes(data)
    }

    // Check if any Checkbox is selected
    const someCheckbox = () => {
        return checkboxes.some(el => el.value===true)
    }

    async function handleDeleteMany() {
        try {
            const data = checkboxes.filter(el => el.value).map(el => el.name)
            const res = await deleteDescriptions(data)
            console.log(res)
            // setCheckboxes(checkboxArray)
        } catch (err) {
            if(err.response){
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error: ${err.message}`)
            }
        }
    }


    useEffect(() => {
        const checkboxArray = descriptions.map(el => {
            return {name: el._id, value: false};
        })
        setCheckboxes(checkboxArray)
    },[descriptions])


    return (
        <List sx={{ pb: 0 }}>
            {descriptions.map((el, i) =>
                <DescriptionItem
                    descriptionsLength={descriptions.length}
                    description={el}
                    onCheckboxChange={handleCheckbox}
                    key={i}
                />
            )}
            {/* Delete Selected and Add New Buttons */}
            <DescriptionItem
                description={{description: "", status: "", comments: ""}}
                handleDeleteMany={handleDeleteMany}
                showDeleteButton={someCheckbox()}
            />
        </List>
    )
};
