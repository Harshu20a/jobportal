import React, { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Style.css";
import { UserNavbar } from "../User/UserNavbar";

export const ViewJob = () => {
  const navigate = useNavigate();
  const para = useParams();
  const [jobDetail, setJobDetail] = useState({});
  const [flag, setFlag] = useState(false);
  const [skillData, setSkillData] = useState([]);
  const applyJob = (id) => {
    if (flag === true) {
      navigate(`/apply-job/${id}`);
    } else {
      navigate(`/login/user`);
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/authorization-check", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("userTokenId"),
        },
      })
      .then((res) => {
        // console.log(res.data.success)
        if (res.data.success === true) {
          setFlag(true);
        } else {
          setFlag(false);
        }
      })
      .catch((err) => {
        console.log("Authorization Error", err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/view-job/${para.jobid}`)
      .then((res) => {
        // console.log(res)
        setJobDetail(res.data.postdata);
        setSkillData(res.data.postdata.skills);
      })
      .catch((err) => {
        console.log("View Job Error", err);
      }, []);
  }, [para.jobid]);
  return (
    <div className="view page-style">
      {flag === true ? <UserNavbar /> : <Navbar />}
      <div className="view-job">
        <div className="container">
          <div className="view-job-head">
            <h2>Job Detail</h2>
          </div>
          <div className="row job-detail">
            <div className="col-9 py-2">
              <h4>{jobDetail.job_title}</h4>
              <h5>{jobDetail.company_name}</h5>
              <p>
                <i className="fa-solid fa-location-dot"></i>
                {jobDetail.job_location}
              </p>
              <p>
                <i className="fa-solid fa-indian-rupee-sign"></i>
                {jobDetail.salary}
              </p>
              <p>
                <i className="fa-regular fa-clock"></i>Posted on{" "}
                {jobDetail.post_date} at {jobDetail.post_time}
              </p>
            </div>
            <div className="col-3 company-img">
              <img
                className="company-image"
                alt=""
                src={process.env.REACT_APP_IMAGE_PATH + jobDetail.image_file}
              />
            </div>
            <div className="col-md-6 py-2">
              <h5>
                <i className="fa-solid fa-book-open"></i>Qualification
              </h5>
              <span className="job-info">{jobDetail.qualification}</span>
            </div>
            <div className="col-md-6 py-2">
              <h5>
                <i className="fa-solid fa-table-cells-large"></i>Category
              </h5>
              <span className="job-info">{jobDetail.job_category}</span>
            </div>
            <div className="col-md-6 py-2">
              <h5>
                <i className="fa-solid fa-layer-group"></i>Skills
              </h5>
              {skillData.map((items, index) => {
                return (
                  <span className="job-info" key={index}>
                    {items}
                  </span>
                );
              })}
            </div>
            <div className="col-md-6 py-2">
              <h5>
                <i className="fa-solid fa-location-crosshairs"></i>Job Type
              </h5>
              <span className="job-info">{jobDetail.job_type}</span>
            </div>
            <div className="col-12 py-2">
              <h5>
                <i className="fa-solid fa-arrow-up-right-from-square"></i> About
                Job
              </h5>
              {/* <h5><i className="fa-solid fa-arrows-turn-right"></i> About Job</h5> */}
              <p>{jobDetail.job_desc}</p>
            </div>
            <div className="col-12 text-center py-2">
              <button
                onClick={() => applyJob(jobDetail._id)}
                className="apply-btn"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
