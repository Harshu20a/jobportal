import React, { useEffect, useState } from 'react'
import { AdminLeftSidebar } from './AdminLeftSidebar';
import { AdminNavbar } from './AdminNavbar';
import { Footer } from '../Components/Footer';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

export const EditSkill = () => {
    const navigate = useNavigate();
    const para = useParams();
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
        axios.get(`http://localhost:4000/api/manage-skill/edit-skill/${para.skillid}`).then((res) => {
            setEditSkill(res.data.skilldata);
        }).catch((err) => {
            console.log("Edit Skill Error", err)
        })
    }, [])

    const [editSkill, setEditSkill] = useState({
        skill: ""
    })
    const inputHandler = (event) => {
        setEditSkill({ ...editSkill, [event.target.name]: event.target.value })
    }

    const updateSkill = async (event) => {
        event.preventDefault();
        let response = await axios.put(`http://localhost:4000/api/manage-skill/update-skill/${para.skillid}`, editSkill);
        if (response) {
            navigate("/admin-dashboard/manage-skill");
        } else {
            alert("Can't Update this time");
            navigate("/admin-dashboard/manage-skill");
        }
    }
    return (
        <div className="admin-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-xl-2 left-sidebar">
                        <AdminLeftSidebar />
                    </div>
                    <div className="col-md-9 col-xl-10 right-sidebar post-category">
                        <AdminNavbar />
                        <div className="col-sm-10 col-md-9 col-lg-7 col-xl-6 post-category-form">
                            <form action="" onSubmit={updateSkill} className="form">
                                <h5 className="mb-3 post-head">Edit Skill</h5>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="skill">Skill :</label>
                                    <input type="text" value={editSkill.skill} name='skill' id="skill" onChange={inputHandler} className="form-control" />
                                </div>
                                <button className="btn btn-block post-btn" type="submit">Update</button>
                            </form>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>)
}
