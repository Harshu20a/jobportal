import React, { useEffect, useState } from 'react'
import { AdminNavbar } from './AdminNavbar'
import { AdminLeftSidebar } from './AdminLeftSidebar'
import "./AdminStyle.css"
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { Footer } from '../Components/Footer'

export const ManageJobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
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
        axios.get("http://localhost:4000/api/manage-jobs").then((res) => {
            setJobs(res.data.jobsdata);
        }).catch((err) => {
            console.log("Manage Job Axios Error", err);
        })
    }, [jobs]);

    const editpost = async (id) => {
        navigate(`/admin-dashboard/manage-jobs/edit-post/${id}`);
    }

    const deletepost = async (id) => {
        let result = await axios.delete(`http://localhost:4000/api/manage-jobs/delete-post/${id}`);
        if (result.data.success == true) {
            toast.success("Skill Deleted Successfully");
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
                    <div className="col-md-9 col-xl-10 right-sidebar job-list">
                        <AdminNavbar />
                        <ToastContainer />
                        <div className='manage-head'>
                            <Link className='btn btn-success' to="/admin-dashboard/job-post">Post Job</Link>
                        </div>
                        <div className="jobs-table">
                            <table className='table table-striped m-0'>
                                <thead>
                                    <tr>
                                        <th>Job Title</th>
                                        <th>Company Name</th>
                                        <th>Qualification</th>
                                        <th>Opening</th>
                                        <th>Skills</th>
                                        <th>Salary</th>
                                        <th>Location</th>
                                        <th>Job Category</th>
                                        <th>Image File</th>
                                        <th>Post Date & Time</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.map((items, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{items.job_title}</td>
                                                <td>{items.company_name}</td>
                                                <td>{items.qualification}</td>
                                                <td>{items.opening}</td>
                                                <td>{items.skills.join(", ")}</td>
                                                <td>{items.salary}</td>
                                                <td>{items.job_location}</td>
                                                <td>{items.job_category}</td>
                                                <td><img className='image-file' src={process.env.REACT_APP_IMAGE_PATH + items.image_file} /></td>
                                                <td>{items.post_date} {items.post_time}</td>
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
            </div >
        </div >)
}
