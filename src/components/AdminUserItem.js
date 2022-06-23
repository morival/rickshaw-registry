import React from 'react';
import { ListItem as MuiListItem, useMediaQuery, useTheme } from '@mui/material';
import Controls from './controls/Controls';



export default function AdminUserItem({ user }) {


    //  Theme Media Query
    const theme = useTheme();
    const isSS = useMediaQuery(theme.breakpoints.down('sm'));
    

    return (
        <MuiListItem
        sx={{ p: isSS ? '8px 0' : '8px 8px' }}
        >
            <Controls.Button
                text={user.name}
                // color='warning'
                variant='text'
            />
        </MuiListItem>
    )
};
