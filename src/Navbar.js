import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, logout }) => {
  // if logged in, one function to return otherwise another funtion
  function isLogged() {
    return (
      <div className="Navbar-right">
        <NavLink exact to="/companies">
          companies
        </NavLink>
        <NavLink exact to="/jobs">
          jobs
        </NavLink>
        <NavLink exact to="/profile">
          profile
        </NavLink>
        <NavLink onClick={logout} exact to="/">
          logout
        </NavLink>
      </div>
    );
  }

  function notLogged() {
    return (
      <div className="Navbar-right">
        <NavLink exact to="/login">
          login
        </NavLink>
        <NavLink exact to="/signup">
          sign up
        </NavLink>
      </div>
    );
  }
  return (
    <nav className="Navbar-nav">
      <div className="Navbar-left">
        <NavLink exact to="/">
          jobly
        </NavLink>
      </div>
      {isLoggedIn ? isLogged() : notLogged()}
    </nav>
  );
};

export default Navbar;
