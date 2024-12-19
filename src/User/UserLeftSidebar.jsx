import React from 'react'
import { Link } from 'react-router-dom';
import "./UserStyle.css"

export const UserLeftSidebar = () => {
    const logout = () => {
        // localStorage.removeItem("tokenid");
        console.log('Logged Out Successfully');
    }
    return (
        <>
            <ul className='navbar-nav'>
                <li className='nav-item'><Link className='nav-link u-dash-link' to="/user-dashboard">Dashboard</Link></li>
            </ul>
            <div className="col-12 text-center">
                <h4 className='u-dash-head'>Welcome, User!</h4>
            </div>
            <ul className='navbar-nav u-left-nav'>
                <li className='nav-item'>
                    <Link className='nav-link' to="/user-dashboard"><i className="u-left-nav-icon fa-regular fa-user"></i>Profile</Link>
                </li>
                {/* <li className='nav-item'>
                    <Link className='nav-link' to="/user-dashboard"><i className="u-left-nav-icon fa-solid fa-landmark-flag"></i>Manage Companies</Link>
                </li> */}
                {/* <li className='nav-item'>
                    <Link className='nav-link' to="/"><i className="u-left-nav-icon fa-solid fa-layer-group"></i>Manage Skills</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/"><i className="u-left-nav-icon fa-solid fa-table-cells-large"></i>Manage Category</Link>
                </li> */}
                <li className='nav-item'>
                    <Link onClick={() => logout()} className='nav-link' to="/" ><i className="u-left-nav-icon fa-solid fa-arrow-right-to-bracket "></i>Log Out</Link>
                </li>
            </ul>
        </>
    )
}
