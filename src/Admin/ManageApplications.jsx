import React, { useEffect, useState } from 'react'
import { AdminNavbar } from './AdminNavbar'
import { AdminLeftSidebar } from './AdminLeftSidebar'
import "./AdminStyle.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { Footer } from '../Components/Footer'

export const ManageApplications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:4000/api/authorization-check", {
            headers: { "Authorization": `Bearer ` + localStorage.getItem('tokenid') }
            // Bearer dsfjkldfjksdfklskjfjaskljklasjkljaskdljakldjklasdjkljds 
        }).then((res) => {
            if (res.data.success === false) {
                alert("Invalid user");
                navigate("/")
            }
        }).catch((err) => {
            console.log("Authorization Error", err)
        })
    }, [navigate])
    useEffect(() => {
        axios.get("http://localhost:4000/api/manage-application").then((res) => {
            setApplications(res.data.userapp);
        }).catch((err) => {
            console.log("Manage Applications Axios Error", err);
        })
    }, [applications]);

    const deleteapplication = async (id) => {
        let response = await axios.delete(`http://localhost:4000/api/manage-application/delete-application/${id}`)
        if (response.data.success === true) {
            toast.success("Application Deleted");
        }
        else {
            toast.error("Not Deleted this time");
        }
    }

    return (
        <div className="admin-dashboard">
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-md-3 col-xl-2 left-sidebar">
                        <AdminLeftSidebar />
                    </div>
                    <div className="col-md-9 col-xl-10 right-sidebar application-list">
                        <AdminNavbar />
                        <ToastContainer />
                        <div className="application-table">
                            <table className='table table-striped m-0'>
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>User Name</th>
                                        <th>User Email</th>
                                        <th>Contact No</th>
                                        <th>Job ID</th>
                                        <th>Job Title</th>
                                        <th>Company Name</th>
                                        <th>Start Date</th>
                                        <th>Applied On</th>
                                        <th>Resume</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map((items, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{items.userId}</td>
                                                <td>{items.username}</td>
                                                <td>{items.email}</td>
                                                <td>{items.contact_no}</td>
                                                <td>{items.jobId}</td>
                                                <td>{items.job_title}</td>
                                                <td>{items.company_name}</td>
                                                <td>{items.start_date}</td>
                                                <td>{items.apply_date}</td>
                                                <td><img className='image-file' src={process.env.REACT_APP_IMAGE_PATH + items.user_resume} alt='loading' /></td>
                                                <td><i onClick={() => { deleteapplication(items._id) }} className="delete-icon fa-solid fa-trash"></i></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div >
        </div >)
}
