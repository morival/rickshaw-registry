import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './components/context/AuthContext';
import SignupLoginContainer from './containers/SignupLoginContainer';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PublicRoute from './containers/PublicRoute';
import PrivateRoute from './containers/PrivateRoute';
import Home from './components/Home';

function App() {

  // const loggedIn  = useAuth()

// useEffect(() => {

// })

  return (
    
  //       <Router>
  //         <Switch>
  //           {!loggedIn
  //           ? <Route exact path='/' component={Dashboard} />
  //           : <Route exact path='/' component={SignupLoginContainer} />}
  //         </Switch>
  //       </Router>

    <AuthProvider>
        <Router>
          <Switch>
            <PublicRoute restricted={false} component={Home} path="/" exact />
            <PublicRoute restricted={true} component={SignupLoginContainer} path="/login" exact />
            <PrivateRoute component={Dashboard} path="/dashboard" exact />
          </Switch>
        </Router>
    </AuthProvider>

  );
}

export default App;
