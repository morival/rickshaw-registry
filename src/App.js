import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { useAuth } from './components/context/AuthContext';
import PublicRoute from './containers/PublicRoute';
import PrivateRoute from './containers/PrivateRoute';
import SignupLogin from './containers/SignupLoginContainer';
import Checklist from './containers/ChecklistContainer';
import Records from './containers/RecordsContainer';
import Dashboard from './containers/DashboardContainer';
import Home from './containers/HomeContainer';


function App() {


  const { currentUser }  = useAuth()

  useEffect(() => {
    // console.log(currentUser)
  }, [currentUser])

  return (

    // <AuthProvider>
        <Router>
          <Switch>
            <PublicRoute exact path="/" component={Home} restricted={false} />
            <PublicRoute exact path="/login" component={SignupLogin} restricted={true} />
            <PrivateRoute exact path="/checklist" component={Checklist} />
            <PrivateRoute exact path="/records" component={Records} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
    // </AuthProvider>

  );
}

export default App;
