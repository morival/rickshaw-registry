import React, { useEffect, useState } from 'react';
import AdminUserItem from './AdminUserItem';
import { List } from '@mui/material';
import { useAuth } from 'context/AuthContext';
import Controls from 'components/controls/Controls';

export default function AdminUsers(params) {
    

    // Auth Context
    const { users, deleteUsers } = useAuth();


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
            const res = await deleteUsers(data)
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
        const checkboxArray = users.map(el => {
            return {name: el._id, value: false};
        })
        setCheckboxes(checkboxArray)
    },[users])


    return(
        <List sx={{ pb: 0 }}>
            {users.map((el, i) =>
            <AdminUserItem
                user={el}
                numberOfUsers={users.length}
                onCheckboxChange={handleCheckbox}
                key={i} />
            )}
            {/* Delete Selected Button */}
            <Controls.ListControlButtons
                handleDeleteMany={handleDeleteMany}
                showDeleteButton={someCheckbox()}
                showAddNewButton={null} />
        </List>
    )
};
