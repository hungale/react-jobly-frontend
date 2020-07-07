import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Companies from "./Companies";

const Routes = () => {
  
  // const createRoutes = () => {
  //   return (

  //   )
  // };

  return (
    <div className="Routes">
      <Switch>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/companies">
          <Companies/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    </div>
  )

};

export default Routes;