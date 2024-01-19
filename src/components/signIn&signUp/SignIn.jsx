import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import ShineText from "../common/textAnimation/ShineText";
import BtnLoader from "../common/btnLoader/BtnLoader";
import "./SignIn.css";

import { signIn } from "../../redux/auth/authActions";

const SignUp = ({loginUser}) => {
  const [formData, setFormData] = useState({
    email: "",
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
        process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL+"api/v1/signin" : `https://task-master-be.vercel.app/api/v1/signin`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.message === "Login successfull!") {
        toast.success(res.data.message);
        loginUser(res.data.user);
        sessionStorage.setItem("user",res.data.user)
        navigate("/todo")
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
        <ShineText text="Login" />
        <p className="my-4">
          Don't have an account?&nbsp;
          <Link to="/signup">Register</Link>
        </p>

        <form className="d-flex flex-column gap mt-3" onSubmit={handleSubmit}>
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
          <button
            className="btn btn-primary w-100 py-2 mt-3 d-flex justify-content-center align-items-center"
            type="submit"
            disabled={btnLoader}
          >
            <BtnLoader active={btnLoader} /> Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userId) => dispatch(signIn(userId)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
