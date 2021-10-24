import React, { useEffect } from 'react';
import { useAuth } from './components/context/AuthContext';
import SignupLoginContainer from './containers/SignupLoginContainer';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import PublicRoute from './containers/PublicRoute';
import PrivateRoute from './containers/PrivateRoute';
import Home from './components/Home';
import { useLocalStorage } from './components/UseLocalStorage';

function App() {

  const { login }  = useAuth()

  const [credentials, setCredentials] = useLocalStorage('user', '');

  useEffect(() => {
    if(credentials)
    login(credentials)
    console.log("loging credentials")
}, [])

  return (

    // <AuthProvider>
        <Router>
          <Switch>
            <PublicRoute exact path="/" component={Home} restricted={false} />
            <PublicRoute exact path="/login" component={SignupLoginContainer} restricted={true} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
    // </AuthProvider>

  );
}

export default App;
