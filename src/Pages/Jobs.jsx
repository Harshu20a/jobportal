import React, { useEffect, useState } from 'react'
import { Navbar } from '../Components/Navbar'
import "./Style.css"
import "./media.css"
import { Footer } from '../Components/Footer'
import { CategorySection } from '../Components/CategorySection'
import axios from 'axios'
import { UserNavbar } from '../User/UserNavbar'
import { JobsSection } from '../Components/JobsSection'

export const Jobs = () => {
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
        <div className="Jobs page-style">
            {(flag === true) ? <UserNavbar /> : <Navbar />}
            <CategorySection />
            <hr className='container section-seprator' />
            <JobsSection />
            <Footer />
        </div>
    )
}
