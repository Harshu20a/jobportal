import React, { useEffect, useState } from 'react'
import { AdminNavbar } from './AdminNavbar'
import { AdminLeftSidebar } from './AdminLeftSidebar'
import axios from "axios"
import "./AdminStyle.css"
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Footer } from '../Components/Footer'
import { useNavigate } from 'react-router-dom'

export const AdminJobPost = () => {
    const date = new Date();
    const post_time = date.toLocaleTimeString();
    const post_date = date.toLocaleDateString();
    const navigate = useNavigate();
    const [company, setCompany] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [getSkills, setGetSkills] = useState([]);
    const [jobData, setJobData] = useState({
        job_title: "",
        company_name: "",
        job_category: "",
        experience: "",
        job_type: "",
        qualification: "",
        skills: [],
        job_location: "",
        opening: 0,
        salary: "",
        job_desc: "",
        image_file: ""
    });

    const fileHandler = (event) => {
        // console.log(event.target.files[0]);           //Object
        setJobData({ ...jobData, [event.target.name]: event.target.files[0] });
    }
    const skillHandler = (event) => {
        if (jobData.skills.includes(event.target.value) == false) {
            setJobData({ ...jobData, [event.target.name]: [...jobData.skills, event.target.value] });
        }
    }
    const removeSkill = (id) => {
        let arr = jobData.skills.filter((items, index) => {
            return id != index;
        })
        setJobData({ ...jobData, skills: arr })
    }

    const inputHandler = (event) => {
        setJobData({ ...jobData, [event.target.name]: event.target.value });
    }

    const postJob = async (event) => {
        event.preventDefault();
        const jobformdata = new FormData();
        jobformdata.append('job_title', jobData.job_title);
        jobformdata.append('company_name', jobData.company_name);
        jobformdata.append('job_category', jobData.job_category);
        jobformdata.append('experience', jobData.experience);
        jobformdata.append('job_type', jobData.job_type);
        jobformdata.append('qualification', jobData.qualification);
        jobformdata.append('skills', jobData.skills);
        jobformdata.append('job_location', jobData.job_location);
        jobformdata.append('opening', jobData.opening);
        jobformdata.append('salary', jobData.salary);
        jobformdata.append('job_desc', jobData.job_desc);
        jobformdata.append('post_date', post_date);
        jobformdata.append('post_time', post_time);
        jobformdata.append('post_image', jobData.image_file);
        // console.log(jobformdata);          //Empty Object
        let res = await axios.post("http://localhost:4000/api/job-post", jobformdata);
        if (res.data.success == true) {
            toast.success("Job Posted Successfully");
        }
        else {
            toast.error("Job Post Failed");
        }
        setJobData({
            job_title: "",
            company_name: "",
            job_category: "",
            experience: "",
            job_type: "",
            qualification: "",
            skills: [],
            job_location: "",
            opening: 0,
            salary: "",
            job_desc: "",
            image_file: ""
        });
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
            console.log("Authorization Axios Error", err)
        })
    }, [])
    useEffect(() => {
        axios.get('http://localhost:4000/api/get-category').then((res) => {
            setAllCategory(res.data.catdata);
        }).catch((err) => {
            console.log("Get Category Axios Error", err);
        })
        axios.get('http://localhost:4000/api/get-company').then((res) => {
            setCompany(res.data.companydata);
        }).catch((err) => {
            console.log("Get Company Axios Error", err);
        })
        axios.get('http://localhost:4000/api/get-skill').then((res) => {
            setGetSkills(res.data.allSkills)
        }).catch((err) => {
            console.log("Get Skill Axios Error", err)
        })
    }, [])

    return (
        <div className="admin-dashboard">
            <div className="row sidebar-section">
                <div className="col-md-3 col-xl-2 left-sidebar">
                    <AdminLeftSidebar />
                </div>
                <div className="col-md-9 col-xl-10 right-sidebar job-post">
                    <AdminNavbar />
                    <div className="col-sm-10 col-md-9 col-lg-7 col-xl-6 job-post-form">
                        <ToastContainer />
                        <form action="" onSubmit={postJob} className="form">
                            <h4 className="mb-3 post-head">Post Job</h4>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="job_title">Job Title :</label>
                                <input type="text" value={jobData.job_title} name='job_title' id="job_title" onChange={inputHandler} className="form-control" />
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="company_name">Company Name :</label>
                                {/* <input type="text" value={jobData.company_name} name='company_name' id="company_name" onChange={inputHandler} className="form-control" /> */}
                                <select name="company_name" value={jobData.company_name} multiple={false} className='custom-select' onChange={inputHandler} id="company_name">
                                    <option value="">Select Company</option>
                                    {company.map((items, index) => {
                                        return (
                                            <option key={index} value={items.company_name}>{items.company_name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="job_category">Job Category :</label>
                                <select name="job_category" value={jobData.job_category} multiple={false} className='custom-select' id="job_category" onChange={inputHandler} >
                                    <option value="">Select Category</option>
                                    {allCategory.map((items, index) => {
                                        return (
                                            <option key={index} value={items.category}>{items.category}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="experience">Experience :</label>
                                {/* <input type="number" value={jobData.experience} min={1} name='experience' id="experience" onChange={inputHandler} className="form-control" /> */}
                                <select className='custom-select' value={jobData.experience} multiple={false} name="experience" onChange={inputHandler} id="experience">
                                    <option value="">Select Experience</option>
                                    <option value="Fresher">Fresher</option>
                                    <option value="3 Months">3 Months</option>
                                    <option value="6 Months">6 Months</option>
                                    <option value="1 Year">1 Year</option>
                                    <option value="1+ Year">1+ Year</option>
                                    <option value="2+ Year">2+ Year</option>
                                </select>
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label">Job Type :</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="job_type" id="Part-Time" value="Part-Time" onChange={inputHandler} />
                                    <label className="form-check-label" htmlFor="Part-Time">Part-Time</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="job_type" id="Full-Time" value="Full-Time" onChange={inputHandler} />
                                    <label className="form-check-label" htmlFor="Full-Time">Full-Time</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="job_type" id="Remote" value="Remote" onChange={inputHandler} />
                                    <label className="form-check-label" htmlFor="Remote">Remote</label>
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="qualification">Qualification :</label>
                                <select className='custom-select' value={jobData.qualification} multiple={false} name="qualification" onChange={inputHandler} id="qualification">
                                    <option value="">Select Qualification</option>
                                    <option value="BCA">BCA</option>
                                    <option value="MCA">MCA</option>
                                    <option value="MBA">MBA</option>
                                    <option value="B.Tech">B.Tech</option>
                                    <option value="M.Tech">M.Tech</option>
                                    <option value="Bsc(CS)">BSC</option>
                                </select>
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="skills">Skills :</label>
                                <select name="skills" value={jobData.skills} className='custom-select' onChange={skillHandler} id="skills">
                                    <option value="">Select Skill</option>
                                    {getSkills.map((items, index) => {
                                        return (
                                            <option key={index} value={items.skill}>{items.skill}</option>
                                        )
                                    })}
                                </select>
                                {jobData.skills.map((items, index) => {
                                    return (
                                        <span className='skills' key={index}>{items}<i onClick={() => removeSkill(index)} className="fa-solid fa-xmark"></i></span>
                                    )
                                })}
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="job_location">Location :</label>
                                <input type="text" value={jobData.job_location} name='job_location' id="job_location" onChange={inputHandler} className="form-control" />
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="opening">Opening :</label>
                                <input type="number" value={jobData.opening} min={1} name='opening' id="opening" onChange={inputHandler} className="form-control" />
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="salary">Salary :</label>
                                <select className='custom-select' value={jobData.salary} multiple={false} name="salary" onChange={inputHandler} id="salary">
                                    <option value="">Select Salary</option>
                                    <option value="2000-5000">2000-5000</option>
                                    <option value="5000-8000">5000-8000</option>
                                    <option value="8000-12000">8000-12000</option>
                                    <option value="12000-18000">12000-18000</option>
                                    <option value="18000-25000">18000-25000</option>
                                </select>
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="job_desc">Job Description :</label>
                                <input type="text" value={jobData.job_desc} name='job_desc' id="job_desc" onChange={inputHandler} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="image_file">Image</label>
                                <input name='image_file' onChange={fileHandler} type="file" className="form-control-file" id="image_file" />
                            </div>
                            <button className="btn btn-block post-btn" type="submit">Post</button>
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
