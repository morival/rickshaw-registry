import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import Home from './containers/HomeContainer';
import SignupLogin from './containers/SignupLoginContainer';
import Checklist from './containers/ChecklistContainer';
import Records from './containers/RecordsContainer';
import Dashboard from './containers/DashboardContainer';
import AdminPanel from './containers/AdminPanelContainer';


function App() {


  return (
        <Router>
          <Switch>
            <PublicRoute exact path="/" component={Home} restricted={false} />
            <PublicRoute exact path="/login" component={SignupLogin} restricted={true} />
            <PrivateRoute exact path="/checklist" component={Checklist} />
            <PrivateRoute exact path="/records" component={Records} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <AdminRoute exact path="/admin" component={AdminPanel}/>
          </Switch>
        </Router>
  );
}

export default App;
