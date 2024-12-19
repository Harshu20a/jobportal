import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../Images/Job.png"
import "./AdminStyle.css"
import "./AdminMedia.css"

export const AdminNavbar = () => {
    const logout = () => {
        localStorage.removeItem("tokenid");
        console.log('Logged Out Successfully');
    }
    return (
        <div className="container-fluid dashboard-navbar">
            <nav className="navbar navbar-expand-md navbar-light px-0">
                <Link className="navbar-brand p-0" to="/"><img className='brand-img' src={Logo} alt="" /></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav nav-ul-1">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin-dashboard"><i className="fa-regular fa-bell nav-icon"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin-dashboard"><i className="fa-solid fa-envelope nav-icon"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin-dashboard"><i className="fa-solid fa-user nav-icon"></i></Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav nav-ul-2">
                        <li className='nav-item'>
                            <Link className='nav-link' to="/admin-dashboard/manage-jobs"><i className="left-nav-icon fa-solid fa-list-check"></i>Manage Jobs</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/admin-dashboard/manage-user"><i className="admin-nav-icon fa-solid fa-list-check"></i>Manage Users</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/admin-dashboard/manage-company"><i className="admin-nav-icon fa-solid fa-landmark-flag"></i>Manage Companies</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/admin-dashboard/manage-skill"><i className="admin-nav-icon fa-solid fa-layer-group"></i>Manage Skills</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/admin-dashboard/manage-category"><i className="admin-nav-icon fa-solid fa-table-cells-large"></i>Manage Category</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/admin-dashboard"><i className="fa-solid fa-user admin-nav-icon"></i>Notification</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/admin-dashboard"><i className="fa-solid fa-envelope admin-nav-icon"></i>Message</Link>
                        </li>
                        <li className='nav-item'>
                            <Link onClick={() => logout()} className='nav-link' to="/" ><i className="admin-nav-icon fa-solid fa-arrow-right-to-bracket "></i>Log Out</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
