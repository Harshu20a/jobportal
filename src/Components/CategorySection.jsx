import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../Pages/Style.css"
import "../Pages/media.css"

export const CategorySection = () => {
    const [cat, setCat] = useState([]);
    // localStorage.removeItem("name");

    useEffect(() => {
        axios.get("http://localhost:4000/api/get-category").then((res) => {
            // console.log(res)
            setCat(res.data.catdata);
        }).catch((err) => {
            console.log("Get Category Error", err);
        })
    })
    return (
        <section className='cat-section section-style'>
            <div className="container">
                <div className='text-center'>
                    <h2 className='section-head'>Choose Your Desired Category</h2>
                </div>
                <div className="row justify-content-center">
                    {cat.map((items, index) => {
                        return (
                            <div key={index} className="col-sm-6 col-lg-4 my-3">
                                <div className="cat-card">
                                    <Link to={{ pathname: `/category/${items.category}` }} className='cat-links'>{items.category}</Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
