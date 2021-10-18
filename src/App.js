import React from 'react';
import { AuthProvider } from './components/context/AuthContext';
import SignupLoginContainer from './containers/SignupLoginContainer';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={SignupLoginContainer} />
            <Route path='/dashboard' component={Dashboard} />
          </Switch>
        </Router>
    </AuthProvider>
  );
}

export default App;
