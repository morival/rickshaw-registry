import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import { useAuth } from './context/AuthContext';
import Controls from './controls/Controls';
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

    async function handleLogout() {
        await logout();
        history.go(0);
        // window.location.reload(false);
    }


    
    const classes = useStyles();
    
    return ( 
    <Box sx={{ flexGrow: 1 }} className={classes.container}>
        <AppBar position="static">
            <Toolbar>
                <Controls.Drawer/>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Rickshaw Registery
                </Typography>
                {/* <Button color="inherit"> */}
                {loggedIn
                ? <Controls.Button
                    text="Log Out"
                    onClick={handleLogout}
                    />
                : <Controls.Button
                    text="Log in / Sign up"
                    color="primary"
                    href="/login"
                    />}
                {/* </Button> */}
            </Toolbar>
        </AppBar>
    </Box>
     );
}

export default Navbar;