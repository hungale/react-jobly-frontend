import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="Navbar">
      <nav className="Navbar-nav">
        <NavLink exact to="/">
          jobly
        </NavLink>
        <NavLink exact to="/login">
          login
        </NavLink>
        <NavLink exact to="/companies">
          companies
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;