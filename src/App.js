import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/aboutUs/AboutUs";
import SignIn from "./components/signIn&signUp/SignIn";
import SignUp from "./components/signIn&signUp/SignUp";
import Todo from "./components/todo/Todo";
import { ToastContainer } from "react-toastify";
import { signIn } from "./redux/auth/authActions";
import { connect } from "react-redux";

function App({loginUser}) {
  useEffect(()=>{
    if(sessionStorage.getItem("user") !== null){
      loginUser(sessionStorage.getItem("user"))
    }
  })
  return (
    <div className="app">
      <Router>
      <ToastContainer />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
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
