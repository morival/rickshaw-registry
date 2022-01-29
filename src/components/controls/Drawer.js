import React, { useState } from 'react';
import { SwipeableDrawer as MuiDrawer, List, ListItem, ListItemText, IconButton, ListItemIcon } from '@mui/material';
import { Menu as MenuIcon, FactCheck as ChecklistIcon, Restore as HistoryIcon, AccountCircle as ProfileIcon, NotInterested } from '@mui/icons-material'
import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router';


const useStyles = makeStyles({
    drawer: {
        width: "220px"
    }
})


const Drawer = props => {

    const { history } = props;
    

    const [open, setOpen] = useState(false);

    const itemsList = [{
        text: 'Safety Checklist',
        icon: <ChecklistIcon/>,
        onClick: () => history.push('/checklist')
    }, {
        text: 'Previous Records',
        icon: <HistoryIcon/>,
        onClick: () => history.push('/')
    }, {
        text: 'My Profile',
        icon: <ProfileIcon/>,
        onClick: () => history.push('/dashboard')
    }, {
        text: 'Drafts',
        icon: <NotInterested/>,
        onClick: () => history.push('/')
    }];


    const classes = useStyles();

    return(
        <>
            <IconButton
            edge="start"
            color="inherit"
            arial-label="open drawer"
            onClick={() => setOpen(true)}
            >
                <MenuIcon/>
            </IconButton>
            <MuiDrawer 
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => {}}
            anchor="left"
            >
                <List
                className={classes.drawer}
                >
                    {itemsList.map((item, key) => {
                        const {text, icon, onClick} = item;
                        return(
                            <ListItem button key={text} onClick={onClick}>
                                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    })}
                </List>
            </MuiDrawer>
        </>
    )
}

export default withRouter(Drawer);