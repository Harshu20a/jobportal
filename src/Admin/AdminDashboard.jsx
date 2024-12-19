import React, { useEffect, useState } from "react";
import { AdminNavbar } from "./AdminNavbar";
import { AdminLeftSidebar } from "./AdminLeftSidebar";
import "./AdminStyle.css";
import "./AdminMedia.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [category, setCategory] = useState([]);
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/authorization-check", {
        headers: { Authorization: `Bearer ` + localStorage.getItem("tokenid") },
        // Bearer dsfjkldfjksdfklskjfjaskljklasjkljaskdljakldjklasdjkljds
      })
      .then((res) => {
        if (res.data.success === false) {
          alert("Invalid user");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Authorization Error", err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/manage-jobs")
      .then((res) => {
        setJobs(res.data.jobsdata);
      })
      .catch((err) => {
        console.log("Manage Job Axios Error", err);
      });
  }, [jobs]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/manage-user")
      .then((res) => {
        setUsers(res.data.userdata);
      })
      .catch((err) => {
        console.log("Manage User Error", err);
      });
  }, [users]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/manage-company")
      .then((res) => {
        setCompanies(res.data.companydata);
      })
      .catch((err) => {
        console.log("Manage Company Error", err);
      });
  }, [companies]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/manage-category")
      .then((res) => {
        setCategory(res.data.catdata);
      })
      .catch((err) => {
        console.log("Manage Category Error", err);
      });
  }, [category]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/manage-skill")
      .then((res) => {
        setSkills(res.data.allSkills);
      })
      .catch((err) => {
        console.log("Manage Skill Error", err);
      });
  }, [skills]);
  return (
    <div className="admin-dashboard">
      <div className="container-fluid">
        <div className="row">
          {/* ---------------------------left-sidebar--------------------------- */}
          <div className="col-md-3 col-xl-2 left-sidebar">
            <AdminLeftSidebar />
          </div>
          {/* --------------------------right-sidebar-------------------------- */}
          <div className="col-md-9 col-xl-10 right-sidebar">
            {/* ---------------------------AdminNavbar--------------------------- */}
            <AdminNavbar />
            <div className="">
              <h2 className="dash-head">Welcome, Admin!</h2>
            </div>
            <div className="dash-content">
              <div className="col-sm-5 dash-item">
                <p className="dash-item-count">{users.length}</p>
                <h4 className="">Registered Users</h4>
              </div>
              <div className="col-sm-5 dash-item">
                <p className="dash-item-count">{jobs.length}</p>
                <h4 className="">Jobs Posted</h4>
              </div>
              <div className="col-sm-5 dash-item">
                <p className="dash-item-count">{companies.length}</p>
                <h4 className="">Registered Companies</h4>
              </div>
              <div className="col-sm-5 dash-item">
                <p className="dash-item-count">{category.length}</p>
                <h4 className="">Total Categories</h4>
              </div>
              <div className="col-sm-5 dash-item">
                <p className="dash-item-count">{skills.length}</p>
                <h4 className="">Skills</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
