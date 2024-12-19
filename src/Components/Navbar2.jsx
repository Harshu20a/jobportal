// import React, { useState } from 'react'
import "../Pages/Style.css";
import "../Pages/media.css";
import { Link } from "react-router-dom";
import Logo from "../Images/Job.png";

export const Navbar2 = () => {
  // const [login, setLogin] = useState(["admin", "user"])
  return (
    <div className="container-fluid home-navbar">
      <nav className="navbar navbar-expand-lg navbar-light px-0">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand p-0" to="/">
          <img className="logo1" src={Logo} alt="" />
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav w-100">
            <li className="nav-item">
              <Link className="nav-link home-nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/jobs" className="nav-link home-nav-link">
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link home-nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link home-nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link home-nav-link" to="/services">
                Services
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
