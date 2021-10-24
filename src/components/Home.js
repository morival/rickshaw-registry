import React from 'react';
import { useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Controls from './controls/Controls';

const Home = () => {

    const { currentUser, loggedIn, logout }  = useAuth()

    const history = useHistory();

    async function handleLogout() {
        await logout();
        history.go(0);
        // window.location.reload(false);
    }
    
    
    return (
        <>
            <h1>Home</h1>
            {loggedIn
            ?   <>
                    <h3>Hi {currentUser.name}!<br/>You are logged in</h3>
                    <Controls.Button
                    text="Dashboard"
                    size="small"
                    color="success"
                    href="/dashboard"
                    />
                    <Controls.Button
                    text="Log Out"
                    onClick={handleLogout}
                />
                </>
            :   <Controls.Button
                text="Go to Log in / Sign up page"
                color="primary"
                href="/login"
                />
                }
        </>
    );
}

export default Home;