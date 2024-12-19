import React, { useEffect, useState } from 'react'
import { AdminLeftSidebar } from './AdminLeftSidebar'
import { AdminNavbar } from './AdminNavbar'
import "./AdminStyle.css"
import { Footer } from '../Components/Footer'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export const ManageCompany = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const deletepost = async (id) => {
        let result = await axios.delete(`http://localhost:4000/api/manage-company/delete-company/${id}`)
        if (result) {
            toast.success("Company Deleted Successfully")
        } else {
            toast.success("Company can't be Deleted this time")
        }
    }

    const editpost = (id) => {
        navigate(`/admin-dashboard/manage-company/edit-company/${id}`)
    }

    useEffect(() => {
        axios.get("http://localhost:4000/api/authorization-check", {
            headers: { "Authorization": `Bearer ` + localStorage.getItem('tokenid') }
            // Bearer dsfjkldfjksdfklskjfjaskljklasjkljaskdljakldjklasdjkljds 
        }).then((res) => {
            if (res.data.success == false) {
                alert("Invalid user");
                navigate("/")
            }
        }).catch((err) => {
            console.log("Authorization Error", err)
        })
    }, [])
    useEffect(() => {
        axios.get("http://localhost:4000/api/manage-company").then((res) => {
            setCompanies(res.data.companydata);
        }).catch((err) => {
            console.log("Manage Company Error", err)
        })
    }, [companies])
    return (
        <div className="admin-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-xl-2 left-sidebar">
                        <AdminLeftSidebar />
                    </div>
                    <div className="col-md-9 col-xl-10 right-sidebar">
                        <ToastContainer />
                        <AdminNavbar />
                        <div className='manage-head'>
                            <Link className='btn btn-success' to="/admin-dashboard/post-company">Post Company</Link>
                        </div>
                        <div className="company-table">
                            <table className='table table-striped m-0'>
                                <thead>
                                    <tr>
                                        <th>Company Name</th>
                                        <th>Company Code</th>
                                        <th>Company Email</th>
                                        <th>Company Address</th>
                                        <th>About Company</th>
                                        <th>Company Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies.map((items, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{items.company_name}</td>
                                                <td>{items.company_code}</td>
                                                <td>{items.company_email}</td>
                                                <td>{items.company_address}</td>
                                                <td>{items.about_company}</td>
                                                <td><img className='company_image' src={process.env.REACT_APP_IMAGE_PATH + items.company_image} /></td>
                                                <td><i onClick={() => { deletepost(items._id) }} className="delete-icon fa-solid fa-trash"></i><i onClick={() => { editpost(items._id) }} className="edit-icon fa-solid fa-pen"></i></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>)
}
