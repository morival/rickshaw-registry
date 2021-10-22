import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../components/context/AuthContext';


const PrivateRoute = ({component: Component, ...rest}) => {
    
    const {loggedIn}  = useAuth()

    return (
        <Route {...rest} render={props => (
            loggedIn
            ?   <Component {...props} />
            :   <Redirect to="/login" />
        )} />
    );
}

export default PrivateRoute;