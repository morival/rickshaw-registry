import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
// import { useLocalStorage } from './components/UseLocalStorage';
import { useAuth } from './components/context/AuthContext';
import PublicRoute from './containers/PublicRoute';
import PrivateRoute from './containers/PrivateRoute';
import Home from './components/Home';
import SignupLoginContainer from './containers/SignupLoginContainer';
import Dashboard from './components/Dashboard';

function App() {

  const { currentUser }  = useAuth()

  // const [credentials, setCredentials] = useLocalStorage('user', '');

  useEffect(() => {
    console.log(currentUser)
    // console.log("Local Storage - User: "+credentials.userLogin)
    // console.log("Local Storage - Password: "+credentials.password)
  }, [currentUser])

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
