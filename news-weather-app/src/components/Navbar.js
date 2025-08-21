import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <h2 className="navbar-title">News & Weather</h2>
    <div className="navbar-links">
      <NavLink
        to="/global"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Global News
      </NavLink>
      <NavLink
        to="/technology"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Technology
      </NavLink>
      <NavLink
        to="/finance"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Finance
      </NavLink>
      <NavLink
        to="/science"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Science & Innovation
      </NavLink>
      <NavLink
        to="/weather"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Weather
      </NavLink>
    </div>
  </nav>
);

export default Navbar;
