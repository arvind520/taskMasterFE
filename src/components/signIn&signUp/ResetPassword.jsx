import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./SignIn.css";
import ShineText from "../common/textAnimation/ShineText";
import BtnLoader from "../common/btnLoader/BtnLoader";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!password.trim() || !confirmPassword.trim()) return setErr("All fields are required!")
    if(password!==confirmPassword) return setErr("Confirm password did not match.")
    setBtnLoader(true);
    try {
      const res = await axios.put(
        process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL+"api/v1/resetpassword" : `https://task-master-be.vercel.app/api/v1/resetpassword`,
        {email, password},
        { headers: { "Content-Type": "application/json" } }
      );
      if(res.data.success){
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    setBtnLoader(false);
    navigate("/");
  };

  return (
    <div className="signin d-flex justify-content-center align-items-center">
      <div className="form-container text-center p-5 card">
        <ShineText text="Reset Password" />

        <form className="d-flex flex-column gap mt-3" onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="emailInputs"
              placeholder="Arvind"
              value={email}
              disabled
            />
            <label htmlFor="emailInputs">Password</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="passwordInputs"
              placeholder="Arvind"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor="passwordInputs">Password</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="confirmpasswordInputs"
              placeholder="Arvind"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="confirmpasswordInputs">Confirm Password</label>
          </div>
          <small id="errmsg" className="form-text text-danger">{err}</small>
          
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

export default ResetPassword;
