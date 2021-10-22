import { CodeSharp } from '@mui/icons-material';
import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../components/context/AuthContext';


const PublicRoute = ({component: Component, restricted, ...rest}) => {
    
    const {loggedIn}  = useAuth()

    return (
        <Route {...rest} render={props => (
            loggedIn && restricted
            ?   <Redirect to="/dashboard" />
            :   <Component {...props} />
        )} />
    );
}

export default PublicRoute;