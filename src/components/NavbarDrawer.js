import React, { useState } from 'react';
import { SwipeableDrawer as MuiDrawer, List, ListItem, ListItemText, IconButton, ListItemIcon } from '@mui/material';
import { Menu as MenuIcon, FactCheck as ChecklistIcon, Restore as HistoryIcon, AccountCircle as ProfileIcon, NotInterested as NotInterestedIcon, Login as LoginIcon, Logout as LogoutIcon } from '@mui/icons-material'
import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router';
import { useAuth } from './context/AuthContext';


const useStyles = makeStyles({
    drawer: {
        width: "220px"
    }
})


const Drawer = props => {
    

    // Style
    const classes = useStyles();

    // Drawer Window Statel
    const [open, setOpen] = useState(false);
    
    // Auth Context
    const { loggedIn, logout }  = useAuth()
    
    const { history } = props;

    function handleLogout() {
        history.push('/')
        logout();
    }


    const itemsList = [{
        text: "Safety Checklist",
        icon: <ChecklistIcon/>,
        onClick: () => history.push('/checklist')
    }, {
        text: "Previous Records",
        icon: <HistoryIcon/>,
        onClick: () => history.push('/')
    }, {
        text: "My Profile",
        icon: <ProfileIcon/>,
        onClick: () => history.push('/dashboard')
    }, {
        text: "Drafts",
        icon: <NotInterestedIcon/>,
        onClick: () => history.push('/')
    }, loggedIn 
    ?   {
            text: "Log Out",
            icon: <LogoutIcon/>,
            onClick: () => handleLogout()
        }
    :   {
            text: "Log in / Sign up",
            icon: <LoginIcon/>,
            onClick: () => history.push('/login')
        }
    ];



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
                    {itemsList.map((item, i) => {
                        const {text, icon, onClick} = item;
                        return(
                            <ListItem button key={i} onClick={onClick}>
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