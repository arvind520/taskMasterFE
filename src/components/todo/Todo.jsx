import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Todo.css";
import ShineText from "../common/textAnimation/ShineText";
import TodoCard from "./TodoCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

let user = "";

const Todo = () => {
  //fetch users todos, add usertodos, manage non user todo
  // user goes from non logged in to loggedIn
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [todos, setTodos] = useState([]);
  const [updatingIdx, setUpdatingIdx] = useState(null); // local
  const [updatingId, setUpdatingId] = useState(null); // db
  const [isLoading, setLoading] = useState(false);

  const getUserTodos = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`https://task-master-be.vercel.app/api/v2/todos/` + user);
      setTodos(res.data);
    } catch (error) {
      console.log("Something went wrong!");
    }
    setLoading(false)
  };

  //checking loggedIn and fetching
  useEffect(() => {
    user = sessionStorage.getItem("user")
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
            `https://task-master-be.vercel.app/api/v2/todo`,
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
      if (user) {
        // adding to db
        const res = await axios.post(
          `https://task-master-be.vercel.app/api/v2/todo`,
          {
            id: user,
            title: inputs.title,
            body: inputs.body,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        setTodos([...todos, res.data])
      }
      toast.success("Task added successfully!");
    }
    setInputs({ title: "", body: "" });
    !user && toast.warn("Tasks are not Saved! Please Login.");
    !user && setTodos([...todos, inputs]);
  };

  const handleUpdate = (idx, updatingId) => {
    setInputs(todos[idx]);
    setUpdatingIdx(idx); //local
    setUpdatingId(updatingId); //db
  };

  const handleDelete = async (idx, id) => {
    try {
      if (user) {
        await axios.delete(`https://task-master-be.vercel.app/api/v2/todo/` + id);
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
            {(updatingId || updatingIdx)? "Update" : "Add"}
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

        {isLoading ? <AiOutlineLoading3Quarters className="todoLoading"/> : (todos.length ? (
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
        ))}
      </div>
    </div>
  );
};


export default Todo;
