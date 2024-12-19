import React, { useEffect, useState } from 'react'
import "../Pages/Style.css"
import "../Pages/media.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const JobsSection = (props) => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const viewJob = (id) => {
        // console.log(id);
        navigate(`/view-job/${id}`)
    }
    useEffect(() => {
        axios.get("http://localhost:4000/api/get-jobs").then((res) => {
            setJobs(res.data.jobsdata)
        }).catch((err) => {
            console.log("Get Job Error", err);
        })
    }, [])
    return (
        <section className='recent-jobs-section section-style'>
            <div className="container">
                <div className='text-center'>
                    <h2 className='section-head'>Latest Jobs</h2>
                </div>
                <div className="row">
                    {jobs.slice(0, props.job_no).map((items, index) => {
                        return (
                            <div key={index} className="col-md-6 my-3">
                                <div className="jobs-card">
                                    <div className="col-3 company-img">
                                        <img className='cmp-img' src={process.env.REACT_APP_IMAGE_PATH + items.image_file} alt='loading'/>
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
        </section>
    )
}
