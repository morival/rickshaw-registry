import { Box } from '@mui/system';
import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from 'context/AuthContext';
import Navbar from 'components/Navbar';


function AdminRoute({ component: Component, ...rest }) {


    // Auth Context
    const { loggedIn, user }  = useAuth()


    return ( 
        <Route {...rest} render={props => (
            loggedIn && user.acc_type === "admin"
            ?   <Box>
                <Navbar />
                <Component {...props} />
            </Box>
            :   <Redirect to="/" />
        )} />
     );
}

export default AdminRoute;