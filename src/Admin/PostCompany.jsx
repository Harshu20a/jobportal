import React, { useEffect, useState } from 'react'
import { AdminNavbar } from './AdminNavbar'
import { AdminLeftSidebar } from './AdminLeftSidebar'
import axios from "axios"
import "./AdminStyle.css"
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Footer } from '../Components/Footer'
import { useNavigate } from 'react-router-dom'

export const PostCompany = () => {
    const navigate = useNavigate();
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
    const [companyData, setCompanyData] = useState({
        company_name: "",
        company_code: "",
        company_email: "",
        company_address: "",
        about_company: "",
        company_image: ""
    });

    const fileHandler = (event) => {
        console.log(event.target.files[0]);           //Object
        setCompanyData({ ...companyData, [event.target.name]: event.target.files[0] });
    }

    const inputHandler = (event) => {
        setCompanyData({ ...companyData, [event.target.name]: event.target.value });
    }

    const addCompany = async (event) => {
        event.preventDefault();
        const companyformdata = new FormData();
        companyformdata.append("company_name", companyData.company_name);
        companyformdata.append("company_code", companyData.company_code);
        companyformdata.append("company_email", companyData.company_email);
        companyformdata.append("company_address", companyData.company_address);
        companyformdata.append("about_company", companyData.about_company);
        companyformdata.append("post_company_image", companyData.company_image);
        // console.log(companyformdata);           //Returns Empty Object
        let result = await axios.post("http://localhost:4000/api/post-company", companyformdata);
        if (result.data.success == true) {
            toast.success("Company Posted Successfully");
        }
        else {
            toast.error("Company Post Failed");
        }
        setCompanyData({
            company_name: "",
            company_code: "",
            company_email: "",
            company_address: "",
            about_company: "",
            company_image: ""
        })
    }
    return (
        <div className="admin-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-xl-2 left-sidebar">
                        <AdminLeftSidebar />
                    </div>
                    <div className="col-md-9 col-xl-10 right-sidebar">
                        <AdminNavbar />
                        <div className="col-sm-10 col-md-9 col-lg-7 col-xl-6 post-company-form">
                            <ToastContainer />
                            <form action="" onSubmit={addCompany} className="form">
                                <h5 className="mb-3 post-head">Add Company</h5>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="company_name">Company Name :</label>
                                    <input type="text" value={companyData.company_name} name='company_name' id="company_name" onChange={inputHandler} className="form-control" />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="company_code">Company Code :</label>
                                    <input type="text" value={companyData.company_code} name='company_code' id="company_code" onChange={inputHandler} className="form-control" />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="company_email">Company Email :</label>
                                    <input type="email" value={companyData.company_email} name='company_email' id="company_email" onChange={inputHandler} className="form-control" />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="company_address">Company Address :</label>
                                    <input type="text" value={companyData.company_address} name='company_address' id="company_address" onChange={inputHandler} className="form-control" />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="about_company">About Company :</label>
                                    <input type="text" value={companyData.about_company} name='about_company' id="about_company" onChange={inputHandler} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="company_image">Company Logo :</label>
                                    <input name='company_image' onChange={fileHandler} type="file" className="form-control-file" id="company_image" />
                                </div>
                                <button className="btn btn-block post-btn" type="submit">Post</button>
                            </form>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
