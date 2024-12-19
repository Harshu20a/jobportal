import React, { useEffect, useState } from 'react'
import { AdminNavbar } from './AdminNavbar';
import { AdminLeftSidebar } from './AdminLeftSidebar';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../Components/Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ManageUser = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    // const editUser = (id) => {
    //     console.log(id)
    //     navigate(`/admin-dashboard/manage-skill/edit-skill/${id}`)
    // }
    const deleteUser = async (id) => {
        console.log(id)
        let response = await axios.delete(`http://localhost:4000/api/manage-user/delete-user/${id}`)
        if (response.data.success == true) {
            toast.success("User Deleted");
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
        axios.get("http://localhost:4000/api/manage-user").then((res) => {
            setUsers(res.data.userdata);
        }).catch((err) => {
            console.log("Manage User Error", err)
        })
    }, [users])

    return (
        <div className="admin-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-xl-2 left-sidebar">
                        <AdminLeftSidebar />
                    </div>
                    <div className="col-md-9 col-xl-10 right-sidebar">
                        <AdminNavbar />
                        <div className="user-table">
                            <ToastContainer />
                            <table className='table table-striped m-0'>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((items, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{items.username}</td>
                                                <td>{items.email}</td>
                                                <td>{items.password}</td>
                                                <td><i onClick={() => { deleteUser(items._id) }} className="delete-icon fa-solid fa-trash"></i></td>
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

