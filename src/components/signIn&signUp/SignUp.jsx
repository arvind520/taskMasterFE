import React, { useState } from "react";
import "./SignIn.css";
import ShineText from "../common/textAnimation/ShineText";
import { Link, useNavigate } from "react-router-dom";
import BtnLoader from "../common/btnLoader/BtnLoader";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [btnLoader, setBtnLoader] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoader(true);
    try {
      const res = await axios.post(
        `https://task-master-be.vercel.app/api/v1/register`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.message === "User Register Successfully!") {
        toast.success(res.data.message);
        navigate("/signin");
      } else {
        toast.info(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    setBtnLoader(false);
  };

  return (
    <div className="signin d-flex justify-content-center align-items-center">
      <div className="form-container text-center p-5 card">
        <ShineText text="Register" />
        <p className="my-4">
          Already have an account?&nbsp;
          <Link to="/signin">Login</Link>
        </p>

        <form className="d-flex flex-column gap mt-3" onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              placeholder="Arvind"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <label htmlFor="usernameInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="emailInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="passwordInput">Password</label>
          </div>

          {/* <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div> */}
          <button
            className="btn btn-primary w-100 py-2 mt-3 d-flex justify-content-center align-items-center"
            type="submit"
            disabled={btnLoader}
          >
            <BtnLoader active={btnLoader} /> Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
