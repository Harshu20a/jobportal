import React, { useEffect, useState } from 'react'
import { AdminLeftSidebar } from './AdminLeftSidebar'
import { AdminNavbar } from './AdminNavbar'
import { Footer } from '../Components/Footer'
import axios from 'axios'
import "./AdminStyle.css"
import { useNavigate, useParams } from 'react-router-dom'

export const EditCompany = () => {
    const navigate = useNavigate();
    const para = useParams();
    const [companyInfo, setCompanyInfo] = useState({
        company_name: "",
        company_code: "",
        company_email: "",
        company_address: "",
        about_company: "",
        company_image: ""
    });
    const inputHandler = (event) => {
        setCompanyInfo({ ...companyInfo, [event.target.name]: event.target.value });
    }
    const fileHandler = (event) => {
        // console.log(event.target.files[0])
        setCompanyInfo({ ...companyInfo, [event.target.name]: event.target.files[0] });
    }

    const updateCompany = async (event) => {
        event.preventDefault();
        const editcompanyform = new FormData();
        editcompanyform.append("company_name", companyInfo.company_name)
        editcompanyform.append("company_code", companyInfo.company_code)
        editcompanyform.append("company_email", companyInfo.company_email)
        editcompanyform.append("company_address", companyInfo.company_address)
        editcompanyform.append("about_company", companyInfo.about_company)
        editcompanyform.append("update_company_image", companyInfo.company_image)
        // console.log(editcompanyform);      //Empty object
        let res = await axios.put(`http://localhost:4000/api/manage-company/update-company/${para.companyid}`, editcompanyform);
        if (res) {
            navigate("/admin-dashboard/manage-company")
        } else {
            alert("Can't Update this time");
            navigate("/admin-dashboard/manage-company")
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
            console.log("Authorization Error", err)
        })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:4000/api/manage-company/edit-company/${para.companyid}`).then((res) => {
            setCompanyInfo(res.data.companydata);
        }).catch((err) => {
            console.log("Edit Company Error", err)
        })
    }, [])
    return (
        <div className="admin-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-xl-2 left-sidebar">
                        <AdminLeftSidebar />
                    </div>
                    <div className="col-md-9 col-xl-10 right-sidebar">
                        <AdminNavbar />
                        <div className="col-sm-10 col-md-9 col-lg-7 col-xl-6 edit-company-form">
                            <form action="" onSubmit={updateCompany} className="form">
                                <h5 className="mb-3 post-head">Edit Company</h5>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="company_name">Company Name :</label>
                                    <input type="text" value={companyInfo.company_name} name='company_name' id="company_name" onChange={inputHandler} className="form-control" />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="company_code">Company Code :</label>
                                    <input type="text" value={companyInfo.company_code} name='company_code' id="company_code" onChange={inputHandler} className="form-control" />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="company_email">Company Email :</label>
                                    <input type="email" value={companyInfo.company_email} name='company_email' id="company_email" onChange={inputHandler} className="form-control" />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="company_address">Company Address :</label>
                                    <input type="text" value={companyInfo.company_address} name='company_address' id="company_address" onChange={inputHandler} className="form-control" />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="about_company">About Company :</label>
                                    <input type="text" value={companyInfo.about_company} name='about_company' id="about_company" onChange={inputHandler} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="company_image">Company Logo :</label>
                                    <input name='company_image' onChange={fileHandler} type="file" className="form-control-file" id="company_image" />
                                </div>
                                <button className="btn btn-block post-btn" type="submit">Update</button>
                            </form>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
