import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Home = () => {

    const {loggedIn, logout}  = useAuth()

    const handleLogout = () => {
        logout()
    }
    
    return (
        <>
            <h1>Home</h1>
            {loggedIn
            ?   <button onClick={handleLogout}>Log out</button>
            :   <Link to="/login">Go to Log in / Sign up page</Link> }
        </>
    );
}

export default Home;