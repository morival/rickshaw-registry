import React, { useEffect } from 'react';
import { useAuth } from 'context/AuthContext';
import Drawer from './NavbarDrawer';
import Controls from './controls/Controls';
import { AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    container: {
        display: "flex"
    }
})

export default function Navbar() {
    
    
    // Style
    const classes = useStyles();

    // Theme Media Query
    const theme = useTheme();
    const isSS = useMediaQuery(theme.breakpoints.down('sm'));

    // Auth Context
    const { loggedIn, logout }  = useAuth()

    const history = useHistory();

    function handleLogout() {
        history.push('/')
        logout();
    }

    // Hide Log in / Log out button if Small Screen
    function logInOutButton(){
        return isSS
        ?   null
        :   loggedIn
            ?   <Controls.Button
                    text="Log Out"
                    onClick={handleLogout} />
            :   <Controls.Button
                    text="Log in / Sign up"
                    color="primary"
                    component={Link} to={"/login"} />
    }


    useEffect(() => {
        console.log("logged in: "+loggedIn)
      }, [loggedIn])

    
    
    return ( 
    <Box sx={{ flexGrow: 1 }} className={classes.container}>
        <AppBar position="static">
            <Toolbar>
                {/* Drawer */}
                <Drawer/>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Rickshaw Registery
                </Typography>
                {logInOutButton()}
            </Toolbar>
        </AppBar>
    </Box>
     );
}

//  Navbar;