import React from 'react';
import Controls from 'components/controls/Controls';
import { ListItem as MuiListItem, useMediaQuery, useTheme } from '@mui/material'


export default function ListControlButtons(props) {
    

    //  Theme Media Query
    const theme = useTheme();
    const isSS = useMediaQuery(theme.breakpoints.down('sm'));

    const { handleDeleteMany, showDeleteButton, showAddNewButton } = props

    
    return (
        <MuiListItem sx={{ p: isSS ? '8px 0' : '8px 8px' }}>
            {/* Delete Button */}
            {showDeleteButton
            ?   <Controls.Button
                    text="Delete Selected"
                    color="error"
                    onClick={handleDeleteMany} />
            :   null}
            {showAddNewButton
            ?   <Controls.Button
                    sx={{  minWidth: 70}}
                    text="Add New" />
            :   null}
        </MuiListItem>
    )
};
