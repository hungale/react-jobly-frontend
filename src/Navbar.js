import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn }) => {
  // if logged in, one function to return otherwise another funtion

  return (
      <nav className="Navbar-nav">
        <div className="Navbar-left">
          <NavLink exact to="/">
            jobly
          </NavLink>
        </div>
        <div className="Navbar-right">
          <NavLink exact to="/login">
            login
          </NavLink>
          <NavLink exact to="/companies">
            companies
          </NavLink>
          <NavLink exact to="/jobs">
            jobs
          </NavLink>
          <NavLink exact to="/signup">
            sign up
          </NavLink>
          <NavLink exact to="/profile">
            profile
          </NavLink>
        </div>
      </nav>
  );
};

export default Navbar;
