import React, { useState } from "react";
import "./SignIn.css";
import ShineText from "../common/textAnimation/ShineText";
import { useNavigate } from "react-router-dom";
import BtnLoader from "../common/btnLoader/BtnLoader";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [btnLoader, setBtnLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email.trim() == ""){
      return toast.error("Please enter your email address");
    }
    setBtnLoader(true);
    try {
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL+"api/v1/forgotpassword" : `https://task-master-be.vercel.app/api/v1/forgotpassword`,
        {email},
        { headers: { "Content-Type": "application/json" } }
      );
      if(res.data.found){
        navigate("/resetpassword", { state: { email: email } });
      }else{
        toast.error("This Email is not registered with us.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    setBtnLoader(false);
  };

  return (
    <div className="signin d-flex justify-content-center align-items-center">
      <div className="form-container text-center p-5 card">
        <ShineText text="Forgot Password" />

        <form className="d-flex flex-column gap mt-3" onSubmit={handleSubmit}>
          <div className="form-floating text-start py-2">
            <input
              type="email"
              className="form-control"
              id="userEmail"
              placeholder="Arvind"
              name="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="userEmail">Email</label>
            <small id="emailHelp" class="form-text text-muted">Enter your registered email.</small>
          </div>
          <button
            className="btn btn-primary w-100 py-2 mt-3 d-flex justify-content-center align-items-center"
            type="submit"
            disabled={btnLoader}
          >
            <BtnLoader active={btnLoader} /> Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
