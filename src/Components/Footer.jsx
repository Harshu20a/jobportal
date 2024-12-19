import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const Footer = () => {
    const [cat, setCat] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:4000/api/get-category").then((res) => {
            // console.log(res)
            setCat(res.data.catdata);
        }).catch((err) => {
            console.log("Get Category Error", err);
        })
    })
    return (
        <div className='footer section-style'>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-category">
                        <h5 className='footer-head'>Category</h5>
                        <ul className='footer-ul'>
                            {cat.map((items, index) => {
                                return (
                                    <li key={index} className='footer-lists'><i className="footer-icon fa-solid fa-caret-right"></i>&nbsp;&nbsp;<Link to={{ pathname: `/category/${items.category}` }} className='footer-links'>{items.category}</Link></li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="footer-quick-links">
                        <h5 className='footer-head'>Quick Links</h5>
                        <ul className='footer-ul'>
                            <li className='footer-lists'>
                                <i className="footer-icon fa-solid fa-caret-right"></i>&nbsp;&nbsp;<Link className='footer-links' to="/">
                                    Home
                                </Link>
                            </li>
                            <li className='footer-lists'>
                                <i className="footer-icon fa-solid fa-caret-right"></i>&nbsp;&nbsp;<Link className='footer-links' to="/jobs">
                                    Jobs
                                </Link>
                            </li>
                            <li className='footer-lists'>
                                <i className="footer-icon fa-solid fa-caret-right"></i>&nbsp;&nbsp;<Link className='footer-links' to="/about">
                                    About
                                </Link>
                            </li>
                            <li className='footer-lists'>
                                <i className="footer-icon fa-solid fa-caret-right"></i>&nbsp;&nbsp;<Link className='footer-links' to="/contact">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h5 className='footer-head'>Contact Us</h5>
                        <ul className='footer-ul'>
                            <li className='footer-lists'>
                                <Link className='footer-links' to="/">
                                    <i className="fa-solid fa-phone footer-contact-icons"></i>&nbsp;0123456789
                                </Link>
                            </li>
                            <li className='footer-lists'>
                                <Link className='footer-links' to="/jobs">
                                    <i className="fa-solid fa-location-dot footer-contact-icons"></i>&nbsp;&nbsp;Indore, Madhya Pradesh, India
                                </Link>
                            </li>
                            <li className='footer-lists'>
                                <Link className='footer-links' to="/about">
                                    <i className="fa-regular fa-envelope footer-contact-icons"></i>&nbsp;jobcompass@gmail.com
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-social">
                        <h5 className='footer-head'>Social Links</h5>
                        <ul className='footer-ul'>
                            <li className='footer-lists'>
                                <Link className='footer-links' to="/">
                                    <i className="fa-brands fa-instagram footer-social-icons"></i>&nbsp;&nbsp;Instagram
                                </Link>
                            </li>
                            <li className='footer-lists'>
                                <Link className='footer-links' to="/">
                                    <i className="fa-brands fa-x-twitter footer-social-icons"></i>&nbsp;Twitter-X
                                </Link>
                            </li>
                            <li className='footer-lists'>
                                <Link className='footer-links' to="/">
                                    <i className="fa-brands fa-facebook-f footer-social-icons"></i>&nbsp;&nbsp;&nbsp;Facebook
                                </Link>
                            </li>
                            <li className='footer-lists'>
                                <Link className='footer-links' to="/">
                                    <i className="fa-brands fa-youtube footer-social-icons"></i>&nbsp;Youtube
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className='section-seprator' />
                <div className="footer-para">
                    <p className=''>Copyright &copy; 2024 All Rights Reserved By <span>JobCompaas-GWT</span></p>
                    <p><Link className='footer-links'>Terms & Conditions - Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
