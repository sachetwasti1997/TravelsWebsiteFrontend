import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlaces';

import './App.css';
// import MainNavigation from './shared/components/MainNavigation';
import NavBar from './shared/components/NavBar';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlaces';
import Authentication from './user/pages/Auth';
import { connect } from 'react-redux';
import Shield from './shared/Shield';

const setRoute = (loggedIn, signUp) => {
  let routes;
  // console.log(loggedIn);
  if(loggedIn || signUp){
    routes = (
    <React.Fragment>
      <Route path="/" exact component={Users} />
      <Route path="/user/:userId" component={UserPlaces}/>
      <Route path="/places/new" component={NewPlace} />
      <Route path="/places/:userId" component={UpdatePlace} />
      <Redirect to="/" />
    </React.Fragment>
    )
  }
  else{
    routes =(
      <React.Fragment>
        <Route path="/" exact component={Users} />
        <Route path="/user/:userId" component={UserPlaces}/>
        <Route path="/auth" component={Authentication}/>
        <Redirect to="/auth" />
      </React.Fragment>
    )
  }
  return routes;
}

function App ({loggedIn, signUp}) {
  // console.log(loggedIn);
  const routes = setRoute(loggedIn, signUp);
  return (
      <Router>
        <NavBar/>
          <Shield>
            <Switch>
              {routes}
            </Switch>
          </Shield>
      </Router>
  );
}

const mapStateToProps = (state) => {
  // console.log(state);
  return state;
}

export default connect(mapStateToProps)(App);
