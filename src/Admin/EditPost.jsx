import React, { useEffect, useState } from 'react'
import { AdminNavbar } from './AdminNavbar'
import { AdminLeftSidebar } from './AdminLeftSidebar'
import "./AdminStyle.css"
import "./AdminMedia.css"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Footer } from '../Components/Footer'
import { ToastContainer, toast } from 'react-toastify'

export const EditPost = () => {
    const para = useParams();
    const [company, setCompany] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [getSkills, setGetSkills] = useState([]);
    const [showSkills, setShowSkills] = useState([]);
    const navigate = useNavigate();

    const [post, setPost] = useState({
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
        setPost({ ...post, [event.target.name]: event.target.files[0] });
    }

    const inputHandler = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    }
    const skillHandler = (event) => {
        setPost({ ...post, [event.target.name]: [...post.skills, event.target.value] });
    }
    const removeSkill = (id) => {
        let arr = post.skills.filter((items, index) => {
            return id != index;
        })
        setPost({ ...post, skills: arr })
    }

    const updateJob = async (event) => {
        event.preventDefault();
        const editformdata = new FormData();
        editformdata.append('job_title', post.job_title);
        editformdata.append('company_name', post.company_name);
        editformdata.append('job_category', post.job_category);
        editformdata.append('experience', post.experience);
        editformdata.append('job_type', post.job_type);
        editformdata.append('qualification', post.qualification);
        editformdata.append('job_location', post.job_location);
        editformdata.append('skills', post.skills);
        editformdata.append('opening', post.opening);
        editformdata.append('salary', post.salary);
        editformdata.append('job_desc', post.job_desc);
        editformdata.append('update_image', post.image_file);
        // console.log(formdata);    //Empty Object
        let res = await axios.put(`http://localhost:4000/api/manage-jobs/update-post/${para.postid}`, editformdata);
        if (res) {
            navigate("/admin-dashboard/manage-jobs");
        } else {
            alert("Can't Update this time");
            navigate("/admin-dashboard/manage-jobs");
        }
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
            console.log("Authorization Axios Error", err);
        })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:4000/api/manage-jobs/edit-post/${para.postid}`).then((res) => {
            setPost(res.data.postdata);
        }).catch((err) => {
            console.log("Edit Post Axios Error", err);
        })
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
            // setShowSkills(res.data.allSkills.skills)
        }).catch((err) => {
            console.log("Get Skill Axios Error", err)
        })
    }, [])
    return (
        <div className="admin-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-xl-2 left-sidebar">
                        <AdminLeftSidebar />
                    </div>
                    <div className="col-md-9 col-xl-10 right-sidebar edit-post">
                        <AdminNavbar />
                        <div className="col-sm-10 col-md-9 col-lg-7 col-xl-6 edit-post-form">
                            <ToastContainer />
                            <form action="" onSubmit={updateJob} className="form">
                                <h2 className="mb-3 edit-head">Edit Post</h2>
                                <div className="form-group mb-4">
                                    <input type="hidden" name='old_image' value={post.image_file} />
                                    <label className="form-label" htmlFor="job_title">Job Title :</label>
                                    <input type="text" name='job_title' id="job_title" onChange={inputHandler} value={post.job_title} className="form-control" />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="company_name">Company Name :</label>
                                    <select name="company_name" value={post.company_name} multiple={false} className='custom-select' onChange={inputHandler} id="company_name">
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
                                    <select className='custom-select' value={post.job_category} multiple={false} onChange={inputHandler} name="job_category" id="job_category">
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
                                    {/* <input type="number" name='experience' id="experience" onChange={inputHandler} value={post.experience} className="form-control" /> */}
                                    <select className='custom-select' value={post.experience} multiple={false} name="experience" onChange={inputHandler} id="experience">
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
                                        <input className="form-check-input" type="radio" name="job_type" id="Part-Time" value="Part-Time" checked={post.job_type == "Part-Time"} onChange={inputHandler} />
                                        <label className="form-check-label" htmlFor="Part-Time">Part-Time</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="job_type" id="Full-Time" value="Full-Time" checked={post.job_type == "Full-Time"} onChange={inputHandler} />
                                        <label className="form-check-label" htmlFor="Full-Time">Full-Time</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="job_type" id="Remote" value="Remote" onChange={inputHandler} checked={post.job_type == "Remote"} />
                                        <label className="form-check-label" htmlFor="Remote">Remote</label>
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="qualification">Qualification :</label>
                                    <select className='custom-select' value={post.qualification} multiple={false} name="qualification" onChange={inputHandler} id="qualification">
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
                                    <select name="skills" value={post.skills} className='custom-select' onChange={skillHandler} id="skills">
                                        <option value="">Select Skill</option>
                                        {getSkills.map((items, index) => {
                                            return (
                                                <option key={index} value={items.skill}>{items.skill}</option>
                                            )
                                        })}
                                    </select>
                                    {post.skills.map((items, index) => {
                                        return (
                                            <span className='skills' key={index}>{items}<i onClick={() => removeSkill(index)} className="fa-solid fa-xmark"></i></span>
                                        )
                                    })}
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="job_location">Location :</label>
                                    <input type="text" value={post.job_location} name='job_location' id="job_location" onChange={inputHandler} className="form-control" />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="opening">Opening :</label>
                                    <input type="number" name='opening' id="opening" onChange={inputHandler} value={post.opening} className="form-control" />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="salary">Salary :</label>
                                    <select className='custom-select' value={post.salary} multiple={false} name="salary" onChange={inputHandler} id="salary">
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
                                    <input type="text" name='job_desc' id="job_desc" onChange={inputHandler} value={post.job_desc} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="image_file">Image</label>
                                    <input name='image_file' onChange={fileHandler} type="file" className="form-control-file" id="image_file" />
                                </div>
                                <button className="btn btn-block update-btn" type="submit">Update</button>
                            </form>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>)
}
