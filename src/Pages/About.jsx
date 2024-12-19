
import React, { useState } from "react";
import "./Style.css";
import { Navbar } from "../Components/Navbar";
import img from "../Images/aboutus.jpg";
import { UserNavbar } from "../User/UserNavbar";
import { Footer } from "../Components/Footer";

export const About = () => {
    const [flag] = useState(false);
    return (
        <div className="home">
      {/* -----------------------Navbar----------------------- */}
      {flag === true ? <UserNavbar /> : <Navbar />}
      {/* -----------------------Banner----------------------- */}
      <section className="about-section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-head">About Us</h2>
          </div>
          <div className="row">
            <div className="left-about">
              <img src={img} alt="" />
            </div>
            <div className="right-about">
              <p>
                Welcome to Jobcompass, your ultimate destination for connecting
                talent with opportunity. At Jobcompass, we understand the
                pivotal role that career decisions play in shaping individuals'
                lives and the success of businesses. Our mission is to simplify
                the job search process, empowering both job seekers and
                employers to find their perfect match efficiently and
                effectively. Established with a vision to bridge the gap between
                talent and opportunity, Jobcompass is committed to
                revolutionizing the way people find jobs and companies find
                talent. Whether you're a seasoned professional looking for your
                next career move or a company seeking top-tier talent, we've got
                you covered.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
          </div>

    )
}
