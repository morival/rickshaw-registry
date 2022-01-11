import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import { useAuth } from './context/AuthContext';
import Controls from './controls/Controls';
import { useHistory } from 'react-router';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
        container: {
            display: "flex"
        }
})

function Navbar() {

    const { setCurrentUser, loggedIn, setLoggedIn, setLoading }  = useAuth()

    const history = useHistory();

    function logout() {
        setLoading(true)
        localStorage.clear()
        setCurrentUser(null)
        setLoggedIn(false)
        setLoading(false)
        history.push('/')
    }

    useEffect(() => {
        console.log("logged in: "+loggedIn)
      }, [loggedIn])

    
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
                    onClick={logout}
                    />
                : <Controls.Button
                    text="Log in / Sign up"
                    color="primary"
                    component={Link} to={"/login"}
                    />}
                {/* </Button> */}
            </Toolbar>
        </AppBar>
    </Box>
     );
}

export default Navbar;