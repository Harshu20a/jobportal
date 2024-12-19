import React, { useEffect, useState } from 'react'
import { AdminNavbar } from './AdminNavbar'
import { AdminLeftSidebar } from './AdminLeftSidebar'
import "./AdminStyle.css"
import "./AdminMedia.css"
import { Footer } from '../Components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const PostSkill = () => {
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
    const [postSkill, setPostSkill] = useState({
        skill: ""
    })
    const inputHandler = (event) => {
        setPostSkill({ ...postSkill, [event.target.name]: event.target.value })
    }
    const addSkill = async (event) => {
        event.preventDefault();
        console.log(postSkill)
        let response = await axios.post("http://localhost:4000/api/post-skill", postSkill);
        if (response.data.success == true) {
            toast.success("Skill Posted Successfully")
        } else {
            toast.success("Skill can't Posted this time")
        }
        setPostSkill({
            skill: ""
        })
    }
    return (
        <div className="admin-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-xl-2 left-sidebar">
                        <AdminLeftSidebar />
                    </div>
                    <div className="col-md-9 col-xl-10 right-sidebar post-skill">
                        <AdminNavbar />
                        <div className="col-sm-10 col-md-9 col-lg-7 col-xl-6 post-skill-form">
                            <ToastContainer />
                            <form action="" onSubmit={addSkill} className="form">
                                <h5 className="mb-3 post-head">Add Skill</h5>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="skill">Skill :</label>
                                    <input type="text" value={postSkill.skill} name='skill' id="skill" onChange={inputHandler} className="form-control" />
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

