import React from 'react'
import { Link } from 'react-router-dom'
import "./AdminStyle.css"
import "./AdminMedia.css"

export const AdminLeftSidebar = () => {
    const logout = () => {
        localStorage.removeItem("tokenid");
        console.log('Logged Out Successfully');
    }
    return (
        <>
            <ul className='navbar-nav'>
                <li className='nav-item'><Link className='nav-link dash-link' to="/admin-dashboard">Dashboard</Link></li>
            </ul>
            <ul className='navbar-nav left-nav'>
                <li className='nav-item'>
                    <Link className='nav-link' to="/admin-dashboard/manage-jobs"><i className="admin-nav-icon fa-solid fa-list-check"></i>Manage Jobs</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/admin-dashboard/manage-user"><i className="admin-nav-icon fa-solid fa-list-check"></i>Manage Users</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/admin-dashboard/manage-application"><i className="admin-nav-icon fa-solid fa-list-check"></i>Manage Applications</Link>
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
                    <Link onClick={() => logout()} className='nav-link' to="/" ><i className="admin-nav-icon fa-solid fa-arrow-right-to-bracket "></i>Log Out</Link>
                </li>
            </ul>
        </>
    )
}
