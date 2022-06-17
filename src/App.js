import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { useAuth } from './components/context/AuthContext';
import PublicRoute from './containers/PublicRoute';
import PrivateRoute from './containers/PrivateRoute';
import Home from './containers/HomeContainer';
import SignupLogin from './containers/SignupLoginContainer';
import Checklist from './containers/ChecklistContainer';
import Records from './containers/RecordsContainer';
import Dashboard from './containers/DashboardContainer';
import AdminPanel from './containers/AdminPanelContainer';


function App() {


  const { user }  = useAuth()

  useEffect(() => {
    // console.log(user)
  }, [user])

  return (
        <Router>
          <Switch>
            <PublicRoute exact path="/" component={Home} restricted={false} />
            <PublicRoute exact path="/login" component={SignupLogin} restricted={true} />
            <PrivateRoute exact path="/checklist" component={Checklist} />
            <PrivateRoute exact path="/records" component={Records} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/admin" component={AdminPanel}/>
          </Switch>
        </Router>
  );
}

export default App;
