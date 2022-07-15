import React, { useState } from 'react';
import { SwipeableDrawer as MuiDrawer, List, ListItem, ListItemText, IconButton, ListItemIcon } from '@mui/material';
import { Menu as MenuIcon, FactCheck as ChecklistIcon, Restore as RecordsIcon, AccountCircle as ProfileIcon, AdminPanelSettings, Login as LoginIcon, Logout as LogoutIcon } from '@mui/icons-material'
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
    const { user, loggedIn, logout }  = useAuth()
    
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
        icon: <RecordsIcon/>,
        onClick: () => history.push('/records')
    }, {
        text: "My Profile",
        icon: <ProfileIcon/>,
        onClick: () => history.push('/dashboard')
    }, {
        text: "Admin Panel",
        icon: <AdminPanelSettings/>,
        onClick: () => history.push('/admin')
    }, {
        text: "Log Out",
        icon: <LogoutIcon/>,
        onClick: () => handleLogout()
    }, {
        text: "Log in / Sign up",
        icon: <LoginIcon/>,
        onClick: () => history.push('/login')
        }
    ];

    const selectedItems = () => {
        if (loggedIn && user.acc_type === "admin")
            return [0, 1, 2, 3, 4]
        else if (loggedIn)
            return [0, 1, 2, 4]
        else 
            return [5]
    }

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
                    {itemsList
                    .filter((item, i) => selectedItems().includes(i))
                    .map((item, i) => {
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