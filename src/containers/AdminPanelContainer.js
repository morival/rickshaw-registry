import React, { useState } from 'react';
import DescriptionItem from '../components/DescriptionItem';
import Controls from '../components/controls/Controls';
import { useAuth } from '../components/context/AuthContext'
import { Box, List, Paper, Tab, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Link } from 'react-router-dom';



export default function AdminPanelContainer(params) {


    // Theme Media Query
    const theme = useTheme();
    const isSS = useMediaQuery(theme.breakpoints.down('sm'));


    // Admin Panels
    const [panel, setPanel] = useState("0");
    const handleChangePanel = (event, newValue) => {
        setPanel(newValue);
    };
    // console.log(descriptions)

    // Auth Context
    const { descriptions } = useAuth();



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
                            </TabList>
                            <Box sx={{ width: '100%' }}>
                                <TabPanel sx={{ p: 0 }} value="0">
                                    <List sx={{ pb: 0 }}>
                                        {descriptions.map((element, i) =>
                                            <DescriptionItem
                                                description={element}
                                                checkbox={true}
                                                key={i}
                                            />
                                        )}
                                        <DescriptionItem
                                            description={{description: "", status: "", comments: ""}}
                                        />
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
