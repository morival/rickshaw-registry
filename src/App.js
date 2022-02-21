import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { useAuth } from './components/context/AuthContext';
import PublicRoute from './containers/PublicRoute';
import PrivateRoute from './containers/PrivateRoute';
import SignupLoginContainer from './containers/SignupLoginContainer';
import DashboardContainer from './containers/DashboardContainer';
import Checklist from './containers/ChecklistContainer';
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
            <PublicRoute exact path="/login" component={SignupLoginContainer} restricted={true} />
            <PrivateRoute exact path="/checklist" component={Checklist} />
            <PrivateRoute exact path="/dashboard" component={DashboardContainer} />
          </Switch>
        </Router>
    // </AuthProvider>

  );
}

export default App;
