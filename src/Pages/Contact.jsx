import React from "react";
import { Link } from "react-router-dom";
import './Style.css'
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
export const Contact = () => {
  return (
    <div className="footer-contact">
        <Navbar/>
      <h5 className="contact-head">Contact Us</h5>
      <ul className="contact-ul">
        <li className="contact-lists">
          <Link className="contact" to="/">
            <i className="fa-solid fa-phone footer-contact-icons"></i>
            &nbsp;0123456789
          </Link>
        </li>
        <li className="contact-lists">
          <Link className="contact-links" to="/jobs">
            <i className="fa-solid fa-location-dot footer-contact-icons"></i>
            &nbsp;&nbsp;Indore, Madhya Pradesh, India
          </Link>
        </li>
        <li className="contact-lists">
          <Link className="contact-links" to="/about">
            <i className="fa-regular fa-envelope contact-contact-icons"></i>
            &nbsp;jobcompass@gmail.com
          </Link>
        </li>
      </ul>
      <Footer/>
    </div>
  );
};
