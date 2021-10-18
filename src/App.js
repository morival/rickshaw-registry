import React from 'react';
// import './App.css';
import SignupLoginContainer from './containers/SignupLoginContainer';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={SignupLoginContainer} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
