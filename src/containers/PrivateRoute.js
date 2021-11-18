import { Box } from '@mui/system';
import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../components/context/AuthContext';
import Navbar from '../components/Navbar';


const PrivateRoute = ({component: Component, ...rest}) => {
    
    const {loggedIn}  = useAuth()

    return (
        <Route {...rest} render={props => (
            loggedIn
            ?   <Box>
                    <Navbar />
                    <Component {...props} />
                </Box>
            :   <Redirect to="/login" />
        )} />
    );
}

export default PrivateRoute;