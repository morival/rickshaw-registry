import React, { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Drawer from './NavbarDrawer';
import Controls from './controls/Controls';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
        container: {
            display: "flex"
        }
})

function Navbar() {

    const { loggedIn, logout }  = useAuth()

    const history = useHistory();

    function handleLogout() {
        history.push('/')
        logout();
    }

    useEffect(() => {
        console.log("logged in: "+loggedIn)
      }, [loggedIn])

    
    const classes = useStyles();
    
    return ( 
    <Box sx={{ flexGrow: 1 }} className={classes.container}>
        <AppBar position="static">
            <Toolbar>
                <Drawer/>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Rickshaw Registery
                </Typography>
                {loggedIn
                ? <Controls.Button
                    text="Log Out"
                    onClick={handleLogout}
                    />
                : <Controls.Button
                    text="Log in / Sign up"
                    color="primary"
                    component={Link} to={"/login"}
                    />}
            </Toolbar>
        </AppBar>
    </Box>
     );
}

export default Navbar;