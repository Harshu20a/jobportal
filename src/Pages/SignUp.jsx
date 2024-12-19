import React, { useState } from "react";
import "./Style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Navbar2 } from "../Components/Navbar2";

export const SignUp = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const userSignup = async (event) => {
    event.preventDefault();
    let res = await axios.post("http://localhost:4000/api/user-signup", input);
    if (res.data.success === true) {
      alert("Account Created Successfully");
      navigate("/login/user");
    } else if (res.data.exist === true) {
      toast.warning("Email Already Exist");
    } else {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <>
      <Navbar2 />
      <section className="userLogin">
        <ToastContainer />
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <form action="" onSubmit={userSignup} className="signup-form">
                <h5 className="mb-3 text-center">Create Account</h5>
                <div className="form-group mb-4">
                  <label className="form-label" htmlFor="signupName">
                    Username :
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="signupName"
                    onChange={inputHandler}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="form-label" htmlFor="signupEmail">
                    Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="signupEmail"
                    onChange={inputHandler}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="form-label" htmlFor="signupPwd">
                    Password :
                  </label>
                  <input
                    type="password"
                    autoComplete="on"
                    name="password"
                    id="signupPwd"
                    onChange={inputHandler}
                    className="form-control"
                  />
                </div>
                <button className="btn btn-block text-white" type="submit">
                  Sign Up
                </button>
                <hr />
                <p>
                  Already have an Account?{" "}
                  <Link className="" to={{ pathname: `/login/user` }}>
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
