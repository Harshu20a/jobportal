import React, { useState } from "react";
import "./Style.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Navbar2 } from "../Components/Navbar2";

export const Login = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const userLogin = async (event) => {
    event.preventDefault();
    let res = await axios.post("http://localhost:4000/api/user-login", input);
    if (res.data.success === true) {
      localStorage.setItem("userTokenId", res.data.usertoken);
      localStorage.setItem("userData", JSON.stringify(res.data.userData));
      alert("Login Successful");
      navigate("/");
    } else {
      toast.error("Invalid Email or Password");
    }
  };
  const adminLogin = async (event) => {
    event.preventDefault();
    //Admin Password : harsh@gmail.com, 12345
    let res = await axios.post("http://localhost:4000/api/adminlogin", input);
    if (res.data.success === true) {
      localStorage.setItem("tokenid", res.data.token);
      alert("Login Successful");
      navigate("/admin-dashboard");
    } else {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className="login">
      <Navbar2 />
      <ToastContainer />
      <div className="container">
        <div className="row adminLogin">
          <div className="col-11 col-md-8 col-lg-5">
            {param.login === "admin" ? (
              <form action="" onSubmit={adminLogin} className="login-form">
                <h5 className="mb-3 text-center">Hello, Admin!</h5>
                <div className="form-group mb-4">
                  <label className="form-label" htmlFor="loginEmail">
                    Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="loginEmail"
                    onChange={inputHandler}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="form-label" htmlFor="loginPwd">
                    Password :
                  </label>
                  <input
                    type="password"
                    autoComplete="on"
                    name="password"
                    id="loginPwd"
                    onChange={inputHandler}
                    className="form-control"
                  />
                </div>
                <button className="btn btn-block text-white" type="submit">
                  Login
                </button>
                <hr />
              </form>
            ) : (
              <form action="" onSubmit={userLogin} className="login-form">
                <h5 className="mb-3 text-center">Login</h5>
                <div className="form-group mb-4">
                  <label className="form-label" htmlFor="loginEmail">
                    Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="loginEmail"
                    onChange={inputHandler}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="form-label" htmlFor="loginPwd">
                    Password :
                  </label>
                  <input
                    type="password"
                    autoComplete="on"
                    name="password"
                    id="loginPwd"
                    onChange={inputHandler}
                    className="form-control"
                  />
                </div>
                <button className="btn btn-block text-white" type="submit">
                  Login
                </button>
                <hr />
                <p>
                  Don't have an Account?{" "}
                  <Link className="" to="/signup">
                    Sign Up
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
