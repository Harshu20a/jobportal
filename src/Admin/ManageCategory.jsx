import React, { useEffect, useState } from 'react'
import { AdminLeftSidebar } from './AdminLeftSidebar'
import { AdminNavbar } from './AdminNavbar'
import { Footer } from '../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ManageCategory = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const deleteCat = async (id) => {
        let res = await axios.delete(`http://localhost:4000/api/manage-category/delete-cat/${id}`);
        if (res.data.success == true) {
            toast.success("Category Deleted");
        }
        else {
            toast.error("Category can't be Deleted this time");
        }
    }
    const editCat = (id) => {
        navigate(`/admin-dashboard/manage-category/edit-cat/${id}`)
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
        axios.get("http://localhost:4000/api/manage-category").then((res) => {
            setCategory(res.data.catdata);
        }).catch((err) => {
            console.log("Manage Category Error", err)
        })
    }, [category])
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
                            <Link className='btn btn-success' to="/admin-dashboard/post-category">Post Category</Link>
                        </div>
                        <div className="category-table">
                            <ToastContainer />
                            <table className='table table-striped m-0'>
                                <thead>
                                    <tr>
                                        <th>Categories</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.map((items, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{items.category}</td>
                                                <td><i onClick={() => { deleteCat(items._id) }} className="delete-icon fa-solid fa-trash"></i><i onClick={() => { editCat(items._id) }} className="edit-icon fa-solid fa-pen"></i></td>
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
