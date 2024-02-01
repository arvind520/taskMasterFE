import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Todo.css";
import ShineText from "../common/textAnimation/ShineText";
import TodoCard from "./TodoCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { getItemWithTTLCheck } from "../../utils/genericFunctions";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/authActions";
import { connect } from "react-redux";

let user = "";

const Todo = (props) => {
  //TODO user goes from non logged in to loggedIn
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ title: "", body: "", status: "" });
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isUpdatingAndID, setIsUpdatingAndID] = useState(null);

  const resetInputs = () => {
    setInputs({ title: "", body: "", status: "" });
    setIsUpdatingAndID(null);
  };

  const getUserTodos = async (token) => {
    setLoading(true);
    try {
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL
          ? process.env.REACT_APP_BASE_URL + "api/v2/todos/" + user
          : `https://task-master-be.vercel.app/api/v2/todos/` + user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(res.data);
    } catch (error) {
      console.log("Uable to get the Todos from DB!");
    }
    setLoading(false);
  };

  //checking loggedIn and fetching
  useEffect(() => {
    user = localStorage.getItem("user");
    if (user) {
      const token = getItemWithTTLCheck("token");
      if (!token) {
        props.logout();
        toast.warn("Session Expired! Please Login Again");
        navigate("/signin");
      } else {
        getUserTodos(token);
      }
    }
  }, []);

  const change = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const addTodo = async () => {
    if (user) {
      const token = getItemWithTTLCheck("token");
      if (!token) {
        props.logout();
        toast.warn("Session Expired! Please Login Again");
        navigate("/signin");
      } else {
        //Added it to DB
        try {
          const res = await axios.post(
            process.env.REACT_APP_BASE_URL
              ? process.env.REACT_APP_BASE_URL + "api/v2/todo"
              : `https://task-master-be.vercel.app/api/v2/todo`,
            {
              id: user,
              title: inputs.title,
              body: inputs.body,
              status: inputs.status == "" ? "todo" : inputs.status,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          getUserTodos(token);
        } catch (error) {
          console.log("Unable to Added it to DB!");
        }
      }
    } else {
      //Added as local + adding _id
      setTodos([
        ...todos,
        {
          ...inputs,
          status: inputs.status == "" ? "todo" : inputs.status,
          _id: todos.length + 1,
        },
      ]);
    }
    toast.success("Task added successfully!");
    !user && toast.warn("Tasks are not Saved! Please Login.");
  };

  const handleUpdate = (id) => {
    show();
    //find todo and change the inputs
    if (user) {
      //DB
      let foundTodo = todos.find((ele) => ele._id === id);
      setInputs(foundTodo);
      setIsUpdatingAndID(id);
    } else {
      //LOCAL
      setInputs(todos[id - 1]);
      setIsUpdatingAndID(id);
    }
  };

  const updateTodo = async () => {
    if (user) {
      //update todo in DB
      const token = getItemWithTTLCheck("token");
      if (!token) {
        props.logout();
        toast.warn("Session Expired! Please Login Again");
        navigate("/signin");
      } else {
        try {
          await axios.put(
            process.env.REACT_APP_BASE_URL
              ? process.env.REACT_APP_BASE_URL + "api/v2/todo"
              : `https://task-master-be.vercel.app/api/v2/todo`,
            {
              id: isUpdatingAndID,
              title: inputs.title,
              body: inputs.body,
              status: inputs.status == "" ? "todo" : inputs.status,
            },
            { headers: { "Content-Type": "application/json" } }
          );
          //getting updated todo list
          getUserTodos(token);
        } catch (error) {
          console.log("Unable to update todo in DB!");
        }
      }
    } else {
      // update local
      let newTodos = todos.map((todo) => {
        if (todo._id === isUpdatingAndID) {
          return inputs;
        } else {
          return todo;
        }
      });
      setTodos(newTodos);
    }
    setIsUpdatingAndID(null);
    toast.info("Task updated successfully!");
    !user && toast.warn("Tasks are not Saved! Please Login.");
  };

  const handleStatusChange = async (id, status) => {
    if (user) {
      //DB
      const token = getItemWithTTLCheck("token");
      if (!token) {
        props.logout();
        toast.warn("Session Expired! Please Login Again");
        navigate("/signin");
      } else {
        try {
          const foundTodo = todos.filter((ele) => ele._id == id);
          const updatedTodo = {
            id: id,
            ...foundTodo[0],
            status: status,
          };
          await axios.put(
            process.env.REACT_APP_BASE_URL
              ? process.env.REACT_APP_BASE_URL + "api/v2/todo"
              : `https://task-master-be.vercel.app/api/v2/todo`,
            updatedTodo,
            { headers: { "Content-Type": "application/json" } }
          );
          //getting updated todo list
          getUserTodos(token);
        } catch (error) {
          console.log("Unable to update todo in DB!");
        }
      }
    } else {
      //Local
      let updatetask = todos.findIndex((x) => x._id == id);
      todos[updatetask].status = status;
      setTodos([...todos]);
    }
  };

  const handleDelete = async (id) => {
    if (user) {
      const token = getItemWithTTLCheck("token");
      if (!token) {
        props.logout();
        toast.warn("Session Expired! Please Login Again");
        navigate("/signin");
      } else {
        //DB
        try {
          await axios.delete(
            process.env.REACT_APP_BASE_URL
              ? process.env.REACT_APP_BASE_URL + "api/v2/todo/" + id
              : `https://task-master-be.vercel.app/api/v2/todo/` + id
          );
          //get updated users
          getUserTodos(token);
        } catch (error) {
          console.log("Unable to delete from DB!");
        }
      }
    } else {
      // LOCAL
      setTodos(todos.filter((todo) => todo._id !== id));
    }
    toast.error(`Task deleted successfully!`);
    !user && toast.warn("Tasks are not Saved! Please Login.");
  };

  function show() {
    document.getElementById("body").style.display = "block";
    document.querySelector(".addbtn-group").style.display = "block";
  }

  const handleSubmit = () => {
    if (isUpdatingAndID) {
      updateTodo();
    } else {
      addTodo();
    }
    resetInputs();
  };

  return (
    <div className="todo">
      <div className="todo-main d-flex flex-column gap shadow p-3 my-5 bg-white rounded mx-auto w-50">
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="TITLE"
            onClick={show}
            onChange={change}
            value={inputs.title}
          />
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {inputs?.status == "" || inputs?.status == undefined
                ? "Select"
                : inputs.status.slice(0, 1).toUpperCase() +
                  inputs.status.slice(1).toLocaleLowerCase()}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button
                className="dropdown-item"
                onClick={() => setInputs({ ...inputs, status: "todo" })}
              >
                Todo
              </button>
              <button
                className="dropdown-item"
                onClick={() => setInputs({ ...inputs, status: "inprogress" })}
              >
                Inprogress
              </button>
              <button
                className="dropdown-item"
                onClick={() => setInputs({ ...inputs, status: "completed" })}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
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
            onClick={handleSubmit}
            disabled={inputs.title.trim() === "" && inputs.body.trim() === ""}
          >
            {isUpdatingAndID ? "Update" : "Add"}
          </button>
          <button
            className="btn btn-dark px-4"
            onClick={resetInputs}
            style={{ float: "right" }}
          >
            Clear
          </button>
        </div>
      </div>
      <div
        className="todo-body d-flex flex-wrap justify-content-center align-items-start mb-4"
        style={{ gap: "20px" }}
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="todoLoading" />
        ) : todos.length ? (
          <>
            <TodoCard
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              todos={todos.filter((ele) => ele.status == "todo")}
              heading="Todo"
              type="warning"
              handleStatusChange={handleStatusChange}
            />
            <TodoCard
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              show={show}
              todos={todos.filter((ele) => ele.status == "inprogress")}
              heading="Inprogress"
              type="info"
              handleStatusChange={handleStatusChange}
            />
            <TodoCard
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              show={show}
              todos={todos.filter((ele) => ele.status == "completed")}
              heading="Completed"
              type="success"
              handleStatusChange={handleStatusChange}
            />
          </>
        ) : (
          <ShineText text={"Currently there is no todo!"} />
        )}
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapActionsToProps)(Todo);
