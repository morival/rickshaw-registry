import React, { useEffect, useState } from 'react';
import DescriptionItem from '../components/DescriptionItem';
import Controls from '../components/controls/Controls';
import { useAuth } from '../components/context/AuthContext'
import { Box, List, Paper, Tab, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Link } from 'react-router-dom';
import AdminUserItem from '../components/AdminUserItem';



export default function AdminPanelContainer(params) {


    // Theme Media Query
    const theme = useTheme();
    const isSS = useMediaQuery(theme.breakpoints.down('sm'));


    // Admin Panels
    const [panel, setPanel] = useState("0");
    const handleChangePanel = (event, newValue) => {
        setPanel(newValue);
    };
    
    // Auth Context
    const { descriptions, deleteDescriptions, users } = useAuth();


    // DESCRIPTIONS
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


    // USERS
    
    useEffect(() => {
        const checkboxArray = descriptions.map(el => {
            return {name: el._id, value: false};
        })
        setCheckboxes(checkboxArray)
    },[descriptions])

    return (
        <Box sx={{ p: isSS ? 1 : 2 }}>
            <h1>Admin Panel</h1>
            <Controls.Button
                text="Home"
                component={Link} to={"/"}
            />
            <Controls.Button
                text="Checklist"
                color="warning"
                component={Link} to={"/checklist"}
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
            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                <Paper sx={{ p: 1, maxWidth: '700px', width: '100%' }}>
                    <Box sx={{ display: isSS ? null : 'flex'}}>
                        <TabContext value={panel}>
                            <TabList
                                value={panel}
                                onChange={handleChangePanel}
                                orientation={isSS ? 'horizontal' : 'vertical'}
                                sx={{ borderRight: 1, borderColor: 'divider', minWidth: '115px', minHeight: isSS ? '36px' : null }}
                            >
                                <Tab
                                    sx={isSS
                                    ?   { fontSize: '0.625rem', p: 0.75, minHeight: '36px', minWidth: '' }
                                    :   { p: 0 }}
                                    label="descriptions"
                                    value="0"
                                />
                                <Tab
                                    sx={isSS
                                    ?   { fontSize: '0.625rem', p: 0.75, minHeight: '36px', minWidth: '' }
                                    :   { p: 0 }}
                                    label="users"
                                    value="1"
                                />
                            </TabList>
                            <Box sx={{ width: '100%' }}>
                                <TabPanel sx={{ p: 0 }} value='0'>
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
                                </TabPanel>
                                <TabPanel sx={{ p: 0 }} value='1'>
                                    <List sx={{ pb: 0 }}>
                                        {users.map((el, i) =>
                                            <AdminUserItem
                                            user={el}
                                            key={i}
                                            />
                                        )}
                                    </List>
                                </TabPanel>
                            </Box>
                        </TabContext>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
};
