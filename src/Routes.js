import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from "./Jobs";
import Signup from "./Signup";
import Profile from "./Profile";



const Routes = () => {
  
  // const createRoutes = () => {
  //   return (

  //   )
  // };

  return (
    <div className="Routes">
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/companies/:company">
          <Company />
        </Route>
        <Route exact path="/companies">
          <Companies />
        </Route>
        <Route exact path="/jobs">
          <Jobs />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );

};

export default Routes;