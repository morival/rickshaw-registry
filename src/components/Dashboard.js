import { Paper } from '@mui/material';
import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from './context/AuthContext';
import Controls from './controls/Controls';

function Dashboard({ children, ...rest }) {

    const { currentUser, loggedIn } = useAuth()

    const handleLogout = () => {}

    return (
        <div>
            Dashboard
        </div>
        // <Route 
        //     {...rest}
        //     render={({ location }) =>
        //     loggedIn ? (
        //         <Paper>
        //             <div>
        //                 <Controls.Button
        //                 text="Log Out"
        //                 onClick={handleLogout}
        //                 />
        //                 <pre>{JSON.stringify(currentUser, null, 2)}</pre>
        //             </div>
        //         </Paper>
        //         ) : (
        //             <Redirect 
        //                 to={{
        //                     pathname: "/",
        //                     state: { from: location }
        //                 }}
        //             />
        //         )
        //     }
        // />
    )
}

export default Dashboard;