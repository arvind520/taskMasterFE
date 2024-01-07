import React from "react";
import "./Home.css";
import ShineText from "../common/textAnimation/ShineText";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="welcome-container d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <div className="text-center">
          <ShineText text="Welcome to TaskMaster!" />
          <ShineText text="Your Ultimate Todo List Companion" />
        </div>
        <p className="text-center">
          Get ready to organize, prioritize, and conquer your tasks
          effortlessly. <br />
          Start managing your tasks and achieving your goals.
        </p>
        <button className="btn btn-lg btn-light addTodo-btn" onClick={() => navigate("/todo")}>Make a Todo</button>
      </div>
    </div>
  );
}

export default Home;
