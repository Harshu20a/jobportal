import React, { useState } from 'react'
import "../Pages/Style.css"
import "../Pages/media.css"
import { Link } from 'react-router-dom'
import Logo from "../Images/Job.png"

export const Navbar = () => {
    const [login] = useState(["admin", "user"])
    return (
        <div className="container-fluid home-navbar">
            <nav className="navbar navbar-expand-lg navbar-light px-0">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand p-0" to="/"><img className='logo1' src={Logo} alt="" /></Link>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav w-100">
                        <li className="nav-item">
                            <Link className="nav-link home-nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/jobs" className="nav-link home-nav-link">Jobs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link home-nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link home-nav-link" to="/contact">Contact</Link>
                        </li>
                        
                        <div className="nav-btn ml-lg-auto d-lg-flex">
                            <li className="nav-item dropdown">
                                <Link className="nav-link login-btn dropdown-toggle" id="loginDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa-solid fa-arrow-right-to-bracket"></i> Login</Link>
                                <div className="dropdown-menu loginDropdown" aria-labelledby="loginDropdown">
                                    <Link className="dropdown-item" to={{ pathname: `/login/${login[0]}` }}>Admin</Link>
                                    <Link className="dropdown-item" to={{ pathname: `/login/${login[1]}` }}>User</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link sign-up-btn" to="/signup"><i className="fa-regular fa-user"></i>Sign Up</Link>
                            </li>
                        </div>
                        {/* <form className="my-2 my-lg-0 d-lg-inline d-none">
                        <input className="form-control mr-sm-2 search" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn my-2 my-sm-0" type="submit">Search</button>
                        </form> */}
                    </ul>
                </div>
            </nav>
        </div>
    )
}
