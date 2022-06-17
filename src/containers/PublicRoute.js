import React from 'react';
import { Box } from '@mui/system';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../components/context/AuthContext';
import Navbar from '../components/Navbar';


const PublicRoute = ({component: Component, restricted, ...rest}) => {
    

    // Auth Context
    const { loggedIn}  = useAuth()

    
    return (
        <Route {...rest} render={props => (
            loggedIn && restricted
            ?   <Redirect to="/" />
            :   <Box>
                    {restricted
                    ?   null
                    :   <Navbar />}
                    <Component {...props} />
                </Box>
        )} />
    );
}

export default PublicRoute;