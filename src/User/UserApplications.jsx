import React, { useEffect, useState } from 'react'
import "./UserStyle.css"
import { UserNavbar } from './UserNavbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../Components/Footer'
import { toast, ToastContainer } from "react-toastify"

export const UserApplications = () => {
    const navigate = useNavigate();
    const viewJob = (id) => {
        // console.log(id);
        navigate(`/view-job/${id}`)
    }
    const [jobs, setJobs] = useState([]);
    const [userDetail] = useState(() => {
        let localData = localStorage.getItem("userData");
        if (localData != null) {
            return JSON.parse(localData);
        }
        else {
            return {};
        }
    });
    useEffect(() => {
        axios.get("http://localhost:4000/api/authorization-check", {
            headers: { "Authorization": `Bearer ` + localStorage.getItem("userTokenId") }
        }).then((res) => {
            if (res.data.success == false) {
                alert("Invalid user");
                navigate("/");
            }
        }).catch((err) => {
            console.log("Authorization Error", err);
        })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:4000/api/user-applications/${userDetail._id}`).then((res) => {
            console.log(res.data.ujobs)
            setJobs(res.data.ujobs)
        }).catch((err) => {
            console.log("View Job Error", err);
        }, [])
    }, [])
    return (
        <div className="user-dashboard">
            <UserNavbar />
            <div className="container">
                <div className='user-head'>
                    <h2>Your Applications</h2>
                </div>
                <div className="row">
                    <ToastContainer />
                    <div className="user-applications-table">
                        <table className='table table-striped m-0'>
                            <thead>
                                <tr>
                                    <th>Job ID</th>
                                    <th>Company Name</th>
                                    <th>Job Title</th>
                                    {/* <th>Contact No.</th> */}
                                    <th>Apply Date</th>
                                    <th>Resume</th>
                                    {/* <th>Job Title</th>
                                    <th>Company Name</th>
                                    <th>Qualification</th>
                                    <th>Opening</th>
                                    <th>Skills</th>
                                    <th>Experience</th>
                                    <th>Salary</th>
                                    <th>Job Type</th>
                                    <th>Location</th>
                                    <th>Job Category</th>
                                    <th>Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((items, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{items.jobId}</td>
                                            <td>{items.company_name}</td>
                                            <td>{items.job_title}&nbsp;&nbsp;&nbsp;&nbsp;<i onClick={() => viewJob(items.jobId)} className="fa-solid fa-arrow-up-right-from-square"></i></td>
                                            {/* <td>{items.contact_no}</td> */}
                                            {/* <td>{items.company_name}</td>
                                            <td>{items.qualification}</td>
                                            <td>{items.opening}</td>
                                            <td>{items.skills}</td>
                                            <td>{items.experience}</td>
                                            <td>{items.salary}</td>
                                            <td>{items.job_type}</td>
                                            <td>{items.job_location}</td> */}
                                            <td>{items.apply_date}</td>
                                            <td><img className='image-file' src={process.env.REACT_APP_IMAGE_PATH + items.user_resume} /></td>
                                            {/* <td><i onClick={() => { deletepost(items._id) }} className="delete-icon fa-solid fa-trash"></i><i onClick={() => { editpost(items._id) }} className="edit-icon fa-solid fa-pen"></i></td> */}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

