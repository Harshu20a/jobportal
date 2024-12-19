import React, { useEffect, useState } from 'react'
import { Navbar } from '../Components/Navbar'
import "./Style.css"
import "./media.css"
import { Footer } from '../Components/Footer'
import { CategorySection } from '../Components/CategorySection'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import { UserNavbar } from '../User/UserNavbar'
import { JobsSection } from '../Components/JobsSection'

export const Home = () => {
    // const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:4000/api/authorization-check", {
            headers: { "Authorization": `Bearer ` + localStorage.getItem("userTokenId") }
        }).then((res) => {
            if (res.data.success === true) {
                setFlag(true);
            } else {
                setFlag(false)
            }
        }).catch((err) => {
            console.log("Authorization Error", err);
        })
    })
    return (
        <div className="home page-style">
            {/* -----------------------Navbar----------------------- */}
            {(flag === true) ? <UserNavbar /> : <Navbar />}
            {/* -----------------------Banner----------------------- */}
            <section className='banner-section'>
                <div className="container-fluid banner-img">
                    <div className="row banner-content">
                        <div className="col-sm-10">
                            <h1>Find Your Desired Job</h1>
                            <p>Jobs, Employment & Future Career Opportunities</p>
                        </div>
                    </div>
                </div>
            </section>
            <CategorySection />
            <hr className='container section-seprator' />
            <JobsSection job_no={10} />
            <Footer />
        </div>
    )
}
