import React, { useEffect, useState } from 'react'
import { AdminNavbar } from './AdminNavbar';
import { AdminLeftSidebar } from './AdminLeftSidebar';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../Components/Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ManageSkills = () => {
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const editSkill = (id) => {
        navigate(`/admin-dashboard/manage-skill/edit-skill/${id}`)
    }
    const deleteSkill = async (id) => {
        let response = await axios.delete(`http://localhost:4000/api/manage-skill/delete-skill/${id}`)
        if (response.data.success == true) {
            toast.success("Skill Deleted");
        }
        else {
            toast.error("Not Deleted this time");
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
        axios.get("http://localhost:4000/api/manage-skill").then((res) => {
            setSkills(res.data.allSkills);
        }).catch((err) => {
            console.log("Manage Skill Error", err)
        })
    }, [skills])

    return (
        <div className="admin-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-xl-2 left-sidebar">
                        <AdminLeftSidebar />
                    </div>
                    <div className="col-md-9 col-xl-10 right-sidebar">
                        <AdminNavbar />
                        <div className='manage-head'>
                            <Link className='btn btn-success' to="/admin-dashboard/post-skill">Post Skill</Link>
                        </div>
                        <div className="skill-table">
                            <ToastContainer />
                            <table className='table table-striped m-0'>
                                <thead>
                                    <tr>
                                        <th>Skills</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {skills.map((items, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{items.skill}</td>
                                                <td><i onClick={() => { deleteSkill(items._id) }} className="delete-icon fa-solid fa-trash"></i><i onClick={() => { editSkill(items._id) }} className="edit-icon fa-solid fa-pen"></i></td>
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
        </div>
    )
}
