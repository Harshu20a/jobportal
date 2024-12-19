import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../Images/Job.png"
import "./UserStyle.css"
import "./UserMedia.css"

export const UserNavbar = () => {
    const logout = () => {
        localStorage.removeItem("userTokenId");
        localStorage.removeItem("userData");
        console.log('Logged Out Successfully');
    }
    return (
        <div className="container-fluid user-navbar">
            <nav className="navbar navbar-expand-md navbar-light px-0">
                <Link className="navbar-brand p-0" to="/"><img className='u-brand-img' src={Logo} alt="" /></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul className="navbar-nav user-nav-1">
                        <li className="nav-item">
                            <Link className="nav-link user-nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link user-nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link user-nav-link" to="/jobs">Jobs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link user-nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav user-nav-2">
                        <li className="nav-item">
                            <Link className="nav-link" to="/"><i className="fa-regular fa-bell u-nav-icon"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/"><i className="fa-solid fa-envelope u-nav-icon"></i></Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" id="userProfileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa-solid fa-user u-nav-icon"></i></Link>
                            <div className="dropdown-menu ProfileDropdown" aria-labelledby="userProfileDropdown">
                                <Link className='dropdown-item nav-link user-dropdown-link' to="/">Acount</Link>
                                <Link className='dropdown-item nav-link user-dropdown-link' to="/user-applications">Your Applications</Link>
                                <Link className='dropdown-item nav-link user-dropdown-link' onClick={() => logout()} to="/">Log Out</Link>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav user-nav-3">
                        <li className="nav-item">
                            <Link className="nav-link user-nav-link" to="/">Notification</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link user-nav-link" to="/">Message</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle user-nav-link" id="userProfileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Profile</Link>
                            <div className="dropdown-menu ProfileDropdown" aria-labelledby="userProfileDropdown">
                                <Link className='dropdown-item nav-link user-nav-link' to="/">Your Profile</Link>
                                <Link className='dropdown-item nav-link user-nav-link' to="/">Your Jobs</Link>
                                <Link className='dropdown-item nav-link user-nav-link' to="/">Manage Account</Link>
                                <Link className='dropdown-item nav-link user-nav-link' onClick={() => logout()} to="/">Log Out</Link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="user-dash">
                    <h3 className='user-dash-link'>Dashboard</h3>
                </div>
            </nav >
        </div >
    )
}
