import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { useAuth } from './components/context/AuthContext';
import PublicRoute from './containers/PublicRoute';
import PrivateRoute from './containers/PrivateRoute';
import SignupLoginContainer from './containers/SignupLoginContainer';
import Home from './components/Home';
import Checklist from './components/Checklist';
import Dashboard from './components/Dashboard';

function App() {

  const { currentUser }  = useAuth()

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

  return (

    // <AuthProvider>
        <Router>
          <Switch>
            <PublicRoute exact path="/" component={Home} restricted={false} />
            <PublicRoute exact path="/login" component={SignupLoginContainer} restricted={true} />
            <PrivateRoute exact path="/checklist" component={Checklist} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
    // </AuthProvider>

  );
}

export default App;
