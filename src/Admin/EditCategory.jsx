import React, { useEffect, useState } from 'react'
import { AdminLeftSidebar } from './AdminLeftSidebar';
import { AdminNavbar } from './AdminNavbar';
import { Footer } from '../Components/Footer';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

export const EditCategory = () => {
    const para = useParams();
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
    useEffect(() => {
        axios.get(`http://localhost:4000/api/manage-category/edit-cat/${para.categoryid}`).then((res) => {
            setCat(res.data.editData);
        }).catch((err) => {
            console.log("Edit Category Error", err)
        })
    }, [])

    const [cat, setCat] = useState({
        category: ""
    })
    const inputHandler = (event) => {
        setCat({ ...cat, [event.target.name]: event.target.value })
    }

    const updateCat = async (event) => {
        event.preventDefault();
        let response = await axios.put(`http://localhost:4000/api/manage-category/update-cat/${para.categoryid}`, cat);
        if (response) {
            navigate("/admin-dashboard/manage-category")
        } else {
            alert("Category can't be update this time")
            navigate("/admin-dashboard/manage-category")
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
                            <form action="" onSubmit={updateCat} className="form">
                                <h5 className="mb-3 post-head">Edit Category</h5>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="category">Category :</label>
                                    <input type="text" value={cat.category} name='category' id="category" onChange={inputHandler} className="form-control" />
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
