import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { signIn } from "./redux/auth/authActions";
import { connect } from "react-redux";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/aboutUs/AboutUs";
import SignIn from "./components/signIn&signUp/SignIn";
import SignUp from "./components/signIn&signUp/SignUp";
import Todo from "./components/todo/Todo";
import ForgotPassword from "./components/signIn&signUp/ForgotPassword";
import ResetPassword from "./components/signIn&signUp/ResetPassword";

function App({loginUser}) {
  useEffect(()=>{
    if(sessionStorage.getItem("user") !== null){
      loginUser(sessionStorage.getItem("user"))
    }
  })
  return (
    <div className="app">
      <Router>
      <ToastContainer position="bottom-right"/>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (userId) => dispatch(signIn(userId)),
  }
}

export default connect(null,mapDispatchToProps)(App);
