import { useEffect, useState } from "react";
import "./Todo.css";
import ShineText from "../common/textAnimation/ShineText";
import TodoCard from "./TodoCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import axios from "axios";

const Todo = ({ isLoggedIn, user }) => {
  //fetch users todos, add usertodos, manage non user todo
  // user goes from non logged in to loggedIn
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [todos, setTodos] = useState([]);
  const [updatingIdx, setUpdatingIdx] = useState(null); // local
  const [updatingId, setUpdatingId] = useState(null); // db

  const getUserTodos = async () => {
    try {
      const res = await axios.get(`https://task-master-be-five.vercel.app/api/v2/todos/` + user);
      setTodos(res.data);
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  //checking loggedIn and fetching
  useEffect(() => {
    if (user) {
      getUserTodos();
    }
  }, []);

  const change = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    if (updatingIdx !== null) {
      setTodos((prevTodos) => {
        const newTodos = [...prevTodos];
        newTodos[updatingIdx].title = inputs.title;
        newTodos[updatingIdx].body = inputs.body;
        return newTodos;
      });
      setUpdatingIdx(null);
      if(updatingId){
        try {
          await axios.put(
            `https://task-master-be-five.vercel.app/api/v2/todo`,
            {
              id: updatingId,
              title: inputs.title,
              body: inputs.body,
            },
            { headers: { "Content-Type": "application/json" } }
          );
          setUpdatingId(null)
        } catch (error) {
          console.log("something went wrong!")
        }
      }
      toast.info("Task updated successfully!");
    } else {
      setTodos([...todos, inputs]);
      if (user) {
        // adding to db
        await axios.post(
          `https://task-master-be-five.vercel.app/api/v2/todo`,
          {
            id: user,
            title: inputs.title,
            body: inputs.body,
          },
          { headers: { "Content-Type": "application/json" } }
        );
      }
      toast.success("Task added successfully!");
    }
    setInputs({ title: "", body: "" });
    !isLoggedIn && toast.warn("Tasks are not Saved! Please Login.");
  };

  const handleUpdate = (idx, updatingId) => {
    setInputs(todos[idx]);
    setUpdatingIdx(idx); //local
    setUpdatingId(updatingId); //db
  };

  const handleDelete = async (idx, id) => {
    try {
      if (user) {
        await axios.delete(`http://localhost:1000/api/v2/todo/` + id);
        toast.success("Task removed successfully!");
      }
      setTodos(todos.filter((_, i) => i !== idx));
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  function show() {
    document.getElementById("body").style.display = "block";
    document.querySelector(".addbtn-group").style.display = "block";
  }

  return (
    <div className="todo">
      <div className="todo-main d-flex flex-column gap shadow p-3 my-5 bg-white rounded mx-auto w-50">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="TITLE"
          onClick={show}
          onChange={change}
          value={inputs.title}
        />
        <textarea
          name="body"
          id="body"
          placeholder="BODY"
          onChange={change}
          value={inputs.body}
        ></textarea>
        <div className="addbtn-group">
          <button
            className="addbtn btn btn-secondary px-4"
            onClick={handleAdd}
            disabled={inputs.title.trim() === "" && inputs.body.trim() === ""}
          >
            Add
          </button>
          <button
            className="btn btn-dark px-4"
            onClick={() => {
              setInputs({ title: "", body: "" });
              setUpdatingIdx(null);
            }}
            style={{ float: "right" }}
          >
            Clear
          </button>
        </div>
      </div>
      <div
        className="todo-body container d-flex flex-wrap justify-content-center align-items-center mb-4"
        style={{ gap: "20px" }}
      >
        {todos.length ? (
          todos.map((todo, idx) => (
            <TodoCard
              todo={{ ...todo, idx }}
              key={idx}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <ShineText text={"Currently there is no todo!"} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Todo);
