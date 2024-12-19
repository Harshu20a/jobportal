import React, { useEffect, useState } from 'react'
import { Navbar } from '../Components/Navbar'
import { Footer } from '../Components/Footer'
import "./Style.css"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { UserNavbar } from '../User/UserNavbar'

export const Category = () => {
    const navigate = useNavigate();
    const para = useParams();
    const [flag, setFlag] = useState(false);
    const [cat, setCat] = useState([]);
    const viewJob = (id) => {
        navigate(`/view-job/${id}`)
    }
    useEffect(() => {
        axios.get("http://localhost:4000/api/authorization-check", {
            headers: { "Authorization": `Bearer ` + localStorage.getItem("userTokenId") }
        }).then((res) => {
            // console.log(res.data.success)
            if (res.data.success === true) {
                setFlag(true);
            } else {
                setFlag(false)
            }
        }).catch((err) => {
            console.log("Authorization Error", err);
        })
    })
    useEffect(() => {
        axios.get(`http://localhost:4000/api/category/${para.category}`).then((res) => {
            setCat(res.data.singlecategory);
        }).catch((err) => {
            console.log("Category Error", err);
        })
    }, [para.category])
    return (
        <div className='category'>
            {(flag === true) ? <UserNavbar /> : <Navbar />}
            <div className="container">
                <div className="category-head">
                    <h2>{para.category}</h2>
                </div>
                <div className="category-jobs">
                    <div className="row">
                        {cat.map((items, index) => {
                            return (
                                <div key={index} className="col-md-6 my-3">
                                    <div className="jobs-card">
                                        <div className="col-3 company-img">
                                            <img className='cmp-img' src={process.env.REACT_APP_IMAGE_PATH + items.image_file} alt='loading' />
                                        </div>
                                        <div className="col-9 job-data">
                                            <h4 className='text-truncate'>{items.job_title}</h4>
                                            <h5>{items.company_name}</h5>
                                            <p>Location : {items.job_location}</p>
                                            <p>Salary : {items.salary}</p>
                                            <p>Posted: {items.post_date}</p>
                                            <div className='text-right'>
                                                <button onClick={() => viewJob(items._id)} className='view-btn'>View Detail</button>
                                                {/* <button onClick={() => applyJob(items._id)} className='apply-btn'>Apply</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
