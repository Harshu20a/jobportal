import React, { useEffect, useState } from 'react'
import "./UserStyle.css"
import { UserNavbar } from './UserNavbar'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Footer } from '../Components/Footer'
import { toast, ToastContainer } from "react-toastify"

export const JobApply = () => {
    const date = new Date();
    const apply_date = date.toLocaleDateString();
    const para = useParams();
    const navigate = useNavigate();
    // const [userDetail, setUserDetail] = useState({});
    const [userDetail] = useState(() => {
        let localData = localStorage.getItem("userData");
        if (localData != null) {
            return JSON.parse(localData);
        }
        else {
            return {};
        }
    });
    const [jobDetail, setJobDetail] = useState({});
    const [skillData, setSkillData] = useState([])
    const [input, setInput] = useState({
        contact_no: 0,
        start_date: "",
        user_resume: ""
    })
    const jobApply = async (event) => {
        event.preventDefault();
        console.log(input)
        const applyFormData = new FormData();
        applyFormData.append('jobId', jobDetail._id);
        applyFormData.append('job_title', jobDetail.job_title);
        applyFormData.append('company_name', jobDetail.company_name);
        applyFormData.append('userId', userDetail._id);
        applyFormData.append('username', userDetail.username);
        applyFormData.append('email', userDetail.email);
        applyFormData.append('contact_no', input.contact_no);
        applyFormData.append('start_date', input.start_date);
        applyFormData.append('post_resume', input.user_resume);
        applyFormData.append('apply_date', apply_date);
        let response = await axios.post("http://localhost:4000/api/apply-job", applyFormData);
        console.log(response)
        if (response.data.success == true) {
            alert("Applied Successfully");
            navigate("/")
        } else {
            toast.error("Can't Apply this time");
        }
    }
    const fileHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.files[0] });
    }
    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    }
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
        axios.get(`http://localhost:4000/api/view-job/${para.jobId}`).then((res) => {
            setJobDetail(res.data.postdata);
            setSkillData(res.data.postdata.skills);
        }).catch((err) => {
            console.log("View Job Error", err);
        }, [])
    }, [])
    return (
        <div className="user-dashboard">
            <UserNavbar />
            <div className="container">
                <div className="row apply-job">
                    <ToastContainer />
                    <div className="col-md-4 col-lg-5">
                        <div className="row job-detail">
                            <div className="col-3 company-img">
                                <img className='company-image' alt='' src={process.env.REACT_APP_IMAGE_PATH + jobDetail.image_file} />
                            </div>
                            <div className="col-12 py-2">
                                <h4>{jobDetail.job_title}</h4>
                                <h5>{jobDetail.company_name}</h5>
                                <p><i className="fa-solid fa-location-dot"></i>{jobDetail.job_location}</p>
                                <p><i className="fa-solid fa-indian-rupee-sign"></i>{jobDetail.salary}</p>
                                <h5>Job ID : {jobDetail._id}</h5>
                            </div>
                            <div className='col-12 py-2'>
                                <h5><i className="fa-solid fa-book-open"></i>Qualification</h5>
                                <span className='job-info'>{jobDetail.qualification}</span>
                            </div>
                            <div className='col-12 py-2'>
                                <h5><i className="fa-solid fa-table-cells-large"></i>Category</h5>
                                <span className='job-info'>{jobDetail.job_category}</span>
                            </div>
                            <div className='col-md-12 py-2'>
                                <h5><i className="fa-solid fa-layer-group"></i>Skills</h5>
                                {skillData.map((items, index) => {
                                    return (
                                        <span className='job-info' key={index}>{items}</span>
                                    )
                                })}
                            </div>
                            <div className='col-12 py-2'>
                                <h5><i className="fa-solid fa-location-crosshairs"></i>Job Type</h5>
                                <span className='job-info'>{jobDetail.job_type}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-lg-7">
                        <form action="" onSubmit={jobApply} className="job-apply-form">
                            <h5 className="mb-3 text-center">Job Post Name</h5>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="userID">User ID :</label>
                                <input type="text" value={userDetail._id} name='userID' id="userID" className="form-control" disabled />
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="username">Name :</label>
                                <input type="text" value={userDetail.username} name='username' id="username" className="form-control" disabled />
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="email">Email :</label>
                                <input type="email" value={userDetail.email} name='email' id="email" className="form-control" disabled />
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="contact_no">Contact No. :</label>
                                <input type="tel" value={input.contact_no} minLength={10} maxLength={10} name='contact_no' id="contact_no" onChange={inputHandler} className="form-control" />
                            </div>
                            {/* <div className="form-group mb-4">
                                <label className="form-label" htmlFor="company">Company :</label>
                                <input type="text" value={input.company} name='company' id="company" onChange={inputHandler} className="form-control" />
                            </div> */}
                            {/* <div className="form-group mb-4">
                                <label className="form-label" htmlFor="position">Position :</label>
                                <input type="text" name='position' value={input.position} id="position" onChange={inputHandler} className="form-control" />
                            </div> */}
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="start_date">Available Start Date :</label>
                                <input type="date" name='start_date' value={input.start_date} id="start_date" onChange={inputHandler} className="form-control" />
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="user_resume">Upload Resume :</label>
                                <input type="file" name='user_resume' id="user_resume" onChange={fileHandler} className="form-control" />
                            </div>
                            <button className="btn btn-block" type="submit">Apply</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
